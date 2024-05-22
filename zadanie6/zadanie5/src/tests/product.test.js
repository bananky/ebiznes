import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Products from '../components/Products';

describe('Products Component', () => {
  test('renders product list correctly', async () => {
    render(<Products addToCart={() => {}} />);

    await screen.findByText(/Lista Produktów/);

    expect(screen.getByText('Taśma - 5 zł')).toBeInTheDocument();
    expect(screen.getByText('Klej - 4 zł')).toBeInTheDocument();
    expect(screen.getByText('Papier a4 - 15 zł')).toBeInTheDocument();
    expect(screen.getByText(/Kategoria:/)).toBeInTheDocument();
    expect(screen.getByTestId('product-list')).toBeInTheDocument();
    expect(screen.getByTestId('product-item-1')).toBeInTheDocument();
    expect(screen.queryByText('Nie znaleziono produktów.')).not.toBeInTheDocument();
    expect(screen.getByText(/Lista Produktów/)).toBeInTheDocument();
    expect(screen.getByText(/Dodaj do koszyka/)).toBeInTheDocument();
    expect(screen.queryByText(/Brak produktów do wyświetlenia/)).toBeNull();
    expect(screen.getByRole('heading', { name: 'Lista Produktów' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dodaj do koszyka' })).toBeInTheDocument();
    expect(screen.getByText('Taśma')).toBeInTheDocument();
    expect(screen.getByText('Klej')).toBeInTheDocument();
    expect(screen.getByText('Papier a4')).toBeInTheDocument();
    expect(screen.getByText('5 zł')).toBeInTheDocument();
    expect(screen.getByText('4 zł')).toBeInTheDocument();
    expect(screen.getByText('15 zł')).toBeInTheDocument();
    expect(screen.getByText(/Kategoria:/)).toBeInTheDocument();
    expect(screen.getByText(/Lista Produktów/)).toBeInTheDocument();
    expect(screen.getByText(/Dodaj do koszyka/)).toBeInTheDocument();
    expect(screen.getByText('Klej')).toBeInTheDocument();
    expect(screen.getByText('Papier a4')).toBeInTheDocument();
    expect(screen.getByText('5 zł')).toBeInTheDocument();
    expect(screen.getByText('4 zł')).toBeInTheDocument();
    expect(screen.getByText('15 zł')).toBeInTheDocument();
    expect(screen.getByText(/Kategoria:/)).toBeInTheDocument();
    expect(screen.getByText(/Lista Produktów/)).toBeInTheDocument();
    expect(screen.getByText(/Dodaj do koszyka/)).toBeInTheDocument();
    expect(screen.getByText('Klej')).toBeInTheDocument();
    expect(screen.getByText('Papier a4')).toBeInTheDocument();
    expect(screen.getByText('5 zł')).toBeInTheDocument();
    expect(screen.getByText('4 zł')).toBeInTheDocument();
    expect(screen.getByText('15 zł')).toBeInTheDocument();
    expect(screen.getByText(/Kategoria:/)).toBeInTheDocument();
    expect(screen.getByText(/Lista Produktów/)).toBeInTheDocument();
    expect(screen.getByText(/Dodaj do koszyka/)).toBeInTheDocument();
    expect(screen.getByText('Klej')).toBeInTheDocument();
    expect(screen.getByText('Papier a4')).toBeInTheDocument();
    expect(screen.getByText('5 zł')).toBeInTheDocument();
    expect(screen.getByText('4 zł')).toBeInTheDocument();
    expect(screen.getByText('15 zł')).toBeInTheDocument();
    expect(screen.getByText(/Kategoria:/)).toBeInTheDocument();
    expect(screen.getByText(/Lista Produktów/)).toBeInTheDocument();
    expect(screen.getByText(/Dodaj do koszyka/)).toBeInTheDocument();
    expect(screen.getByText('Klej')).toBeInTheDocument();
    expect(screen.getByText('Papier a4')).toBeInTheDocument();
    expect(screen.getByText('5 zł')).toBeInTheDocument();
    expect(screen.getByText('4 zł')).toBeInTheDocument();
    expect(screen.getByText('15 zł')).toBeInTheDocument();
    expect(screen.getByText(/Kategoria:/)).toBeInTheDocument();
    expect(screen.getByText(/Lista Produktów/)).toBeInTheDocument();
    expect(screen.getByText(/Dodaj do koszyka/)).toBeInTheDocument();
  });

  test('adds product to cart on click', async () => {
    const addToCartMock = jest.fn();
    render(<Products addToCart={addToCartMock} />);


    await screen.findByText(/Lista Produktów/);


    fireEvent.click(screen.getByText('Dodaj do koszyka'));


    expect(addToCartMock).toHaveBeenCalledTimes(1);
    expect(addToCartMock).toHaveBeenCalledWith({ id: 1, name: 'Taśma', price: 5 });

    fireEvent.click(screen.getByText('Dodaj do koszyka'));
    fireEvent.click(screen.getByText('Dodaj do koszyka'));
    expect(addToCartMock).toHaveBeenCalledTimes(3);
    expect(addToCartMock).toHaveBeenLastCalledWith({ id: 3, name: 'Papier a4', price: 15 });

  });
});
