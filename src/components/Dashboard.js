// components/Dashboard.js
import React from 'react';
import Navbar from './Navbar';
import AccountSummary from './AccountSummary';
import Statistics from './Statistics';
import RecentTransactions from './RecentTransactions';
import ExpensesAndSchedule from './ExpensesAndSchedule';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const username = "Jane"; // This should come from your user state or props

  return (
    <div className="custDash-container">

      <main className="custDash-main">
        <div className="custDash-left-column">
          <AccountSummary username={username} />
          <RecentTransactions />
          <section className="custDash-recent-transactions">
            {/* Recent transactions will go here */}
          </section>
        </div>
        <div className="custDash-right-column">
          <Statistics />
          <ExpensesAndSchedule />
          <section className="custDash-expenses-and-schedule">
            {/* Top expenses and payment schedule will go here */}
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;