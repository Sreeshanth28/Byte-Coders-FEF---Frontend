// components/BNPLDashboard.js
import React, { useState } from 'react';
import '../styles/BNPLDashboard.css';

const BNPLDashboard = () => {
  const [activeTab, setActiveTab] = useState('cardUsage');

  const cardUsage = [
    { id: 1, merchant: 'Amazon', date: '2024-07-15', amount: 299.99 },
    { id: 2, merchant: 'Best Buy', date: '2024-07-10', amount: 599.99 },
    { id: 3, merchant: 'Walmart', date: '2024-07-05', amount: 149.99 },
  ];

  const bnplTransactions = [
    { id: 1, type: 'Due Payment', dueDate: '2024-08-01', amount: 75.00 },
    { id: 2, type: 'Current Loan', startDate: '2024-07-01', amount: 500.00, remainingPayments: 4 },
    { id: 3, type: 'Completed Loan', endDate: '2024-06-30', amount: 300.00 },
  ];

  return (
    <div className="custDash-bnpl-dashboard">
      <h2>BNPL Dashboard</h2>
      <div className="custDash-bnpl-tabs">
        <button 
          className={`custDash-tab ${activeTab === 'cardUsage' ? 'active' : ''}`}
          onClick={() => setActiveTab('cardUsage')}
        >
          Card Usage
        </button>
        <button 
          className={`custDash-tab ${activeTab === 'bnplTransactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('bnplTransactions')}
        >
          BNPL Transactions
        </button>
      </div>
      
      {activeTab === 'cardUsage' && (
        <div className="custDash-card-usage">
          <h3>Recent Card Usage</h3>
          <ul>
            {cardUsage.map(transaction => (
              <li key={transaction.id} className="custDash-transaction-item">
                <span>{transaction.merchant}</span>
                <span>{transaction.date}</span>
                <span>${transaction.amount.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'bnplTransactions' && (
        <div className="custDash-bnpl-transactions">
          <h3>BNPL Transactions</h3>
          <div className="custDash-bnpl-cards">
            {bnplTransactions.map(transaction => (
              <div key={transaction.id} className="custDash-bnpl-card">
                <h4>{transaction.type}</h4>
                {transaction.dueDate && <p>Due Date: {transaction.dueDate}</p>}
                {transaction.startDate && <p>Start Date: {transaction.startDate}</p>}
                {transaction.endDate && <p>End Date: {transaction.endDate}</p>}
                <p>Amount: ${transaction.amount.toFixed(2)}</p>
                {transaction.remainingPayments && <p>Remaining Payments: {transaction.remainingPayments}</p>}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BNPLDashboard;