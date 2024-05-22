import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Payments from '../components/Payments';

describe('Payments Component', () => {
  test('handles form submission correctly', async () => {
    render(<Payments />);


    fireEvent.change(screen.getByLabelText(/Imię i nazwisko/), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText(/Numer karty/), {
      target: { value: '1234567890123456' },
    });
    fireEvent.change(screen.getByLabelText(/Data ważności/), {
      target: { value: '12/24' },
    });
    fireEvent.change(screen.getByLabelText(/CVV/), {
      target: { value: '123' },
    });

    fireEvent.click(screen.getByText('Zapłać'));


    await waitFor(() => screen.getByText(/Payment processed successfully/));
    expect(screen.getByText(/Payment processed successfully/)).toBeInTheDocument();
  });
});
