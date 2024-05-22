import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../components/Cart';

describe('Cart Component', () => {
  test('renders cart with items correctly', () => {
    const cartItems = [{ id: 1, name: 'Taśma', price: 5 }];
    render(<Cart cart={cartItems} setCart={() => {}} />);

    expect(screen.getByText('Taśma - 5 zł')).toBeInTheDocument();
    expect(screen.queryByText('Brak produktów w koszyku.')).toBeNull();
    expect(screen.getByRole('heading', { name: 'Twój koszyk' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Usuń' })).toBeInTheDocument();
    expect(screen.getByText('Cena łączna:')).toBeInTheDocument();
    expect(screen.getByText('5 zł')).toBeInTheDocument();
    expect(screen.getByText('Kontynuuj zakupy')).toBeInTheDocument();
    expect(screen.queryByText('Podsumowanie koszyka')).toBeNull();
    expect(screen.getByText('Taśma')).toBeInTheDocument();
    expect(screen.getByText('5 zł')).toBeInTheDocument();
    expect(screen.getByText('Kontynuuj zakupy')).toBeInTheDocument();
    expect(screen.getByText('Taśma')).toBeInTheDocument();
    expect(screen.getByText('5 zł')).toBeInTheDocument();
    expect(screen.getByText('Kontynuuj zakupy')).toBeInTheDocument();
    expect(screen.getByText('Taśma')).toBeInTheDocument();
    expect(screen.getByText('5 zł')).toBeInTheDocument();
    expect(screen.getByText('Kontynuuj zakupy')).toBeInTheDocument();
    expect(screen.getByText('Taśma')).toBeInTheDocument();
    expect(screen.getByText('5 zł')).toBeInTheDocument();
    expect(screen.getByText('Kontynuuj zakupy')).toBeInTheDocument();
  });

  test('removes item from cart on button click', () => {
    const cartItems = [{ id: 1, name: 'Taśma', price: 5 }];
    const setCartMock = jest.fn();
    render(<Cart cart={cartItems} setCart={setCartMock} />);

   
    fireEvent.click(screen.getByText('Usuń'));

 
    expect(setCartMock).toHaveBeenCalledWith([]);

    
    fireEvent.click(screen.getByText('Usuń'));
    expect(setCartMock).toHaveBeenCalledWith([]);
    expect(screen.queryByText('Taśma - 5 zł')).not.toBeInTheDocument();

  });
});
