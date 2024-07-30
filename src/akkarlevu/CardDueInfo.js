import React from 'react';
import '../styles/CardDueInfo.css';

const CardDueInfo = () => {
  // Mock data - in a real app, this would come from an API
  const dueInfo = {
    currentBalance: 1500.00,
    minimumPayment: 50.00,
    dueDate: '2024-04-15',
    lastPaymentAmount: 100.00,
    lastPaymentDate: '2024-03-15'
  };

  return (
    <div className="custDash-cardDueInfo">
      <h2>Payment Due Information</h2>
      <div className="custDash-dueInfoDetails">
        <div className="custDash-currentBalance">
          <h3>Current Balance</h3>
          <p>${dueInfo.currentBalance.toFixed(2)}</p>
        </div>
        <div className="custDash-minimumPayment">
          <h3>Minimum Payment Due</h3>
          <p>${dueInfo.minimumPayment.toFixed(2)}</p>
        </div>
        <div className="custDash-dueDate">
          <h3>Payment Due Date</h3>
          <p>{new Date(dueInfo.dueDate).toLocaleDateString()}</p>
        </div>
        <div className="custDash-lastPayment">
          <h3>Last Payment</h3>
          <p>${dueInfo.lastPaymentAmount.toFixed(2)} on {new Date(dueInfo.lastPaymentDate).toLocaleDateString()}</p>
        </div>
      </div>
      <button className="custDash-payNowButton">Pay Now</button>
    </div>
  );
};

export default CardDueInfo;