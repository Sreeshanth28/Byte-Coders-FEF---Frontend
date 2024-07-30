// components/RecentTransactions.js
import React from 'react';
import '../styles/RecentTransactions.css';

const RecentTransactions = () => {
  const transactions = [
    { id: 1, name: 'Spotify', date: '07 Feb, 11:59 AM', category: 'Subscription', amount: '-$10.24' },
    { id: 2, name: 'Blitz', date: '07 Feb, 10:45 AM', category: 'Food & Drinks', amount: '-$256.58' },
    { id: 3, name: 'Transfer', date: '07 Feb, 09:30 AM', category: 'Transfer', amount: '250.00' },
    { id: 4, name: 'Cinema City', date: '06 Feb, 07:15 PM', category: 'Entertainment', amount: '-$22.05' },
    { id: 5, name: 'Starbucks', date: '06 Feb, 11:30 AM', category: 'Food & Drinks', amount: '-$10.89' },
    { id: 6, name: 'Blitz', date: '07 Feb, 10:45 AM', category: 'Food & Drinks', amount: '-$256.58' },
  ];

  return (
    <div className="custDash-recent-transactions">
      <div className="custDash-recent-transactions-header">
        <h3>Recent transactions</h3>
        <a href="/transactions" className="custDash-view-all">View all</a>
      </div>
      <ul className="custDash-transaction-list">
        {transactions.map((transaction) => (
          <li key={transaction.id} className="custDash-transaction-item">
            <div className="custDash-transaction-icon">
              {/* You can replace this with actual icons */}
              <span>{transaction.name[0]}</span>
            </div>
            <div className="custDash-transaction-details">
              <span className="custDash-transaction-name">{transaction.name}</span>
              <span className="custDash-transaction-date">{transaction.date}</span>
            </div>
            <span className="custDash-transaction-amount">{transaction.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransactions;