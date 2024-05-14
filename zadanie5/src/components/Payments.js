import React, { useState } from 'react';

const Payments = () => {
  const [paymentData, setPaymentData] = useState({
    amount: 0,
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      });
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div>
      <h2>Payments</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          value={paymentData.amount}
          onChange={handleInputChange}
          placeholder="Amount"
        />
        <input
          type="text"
          name="cardNumber"
          value={paymentData.cardNumber}
          onChange={handleInputChange}
          placeholder="Card Number"
        />
        <input
          type="text"
          name="expiryDate"
          value={paymentData.expiryDate}
          onChange={handleInputChange}
          placeholder="Expiry Date"
        />
        <input
          type="text"
          name="cvv"
          value={paymentData.cvv}
          onChange={handleInputChange}
          placeholder="CVV"
        />
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default Payments;
