// components/ExpensesAndSchedule.js
import React from 'react';
import '../styles/ExpensesAndSchedule.css';

const ExpensesAndSchedule = () => {
  return (
    <div className="custDash-expenses-and-schedule">
      <div className="custDash-top-expenses">
        <h3>Top expenses</h3>
        <div className="custDash-expense-chart">
          <div className="custDash-expense-bar" style={{height: '80%'}}>
            <span className="custDash-expense-label">Food & Drinks</span>
            <span className="custDash-expense-amount">$722.03</span>
          </div>
          <div className="custDash-expense-bar" style={{height: '60%'}}>
            <span className="custDash-expense-label">Shopping</span>
          </div>
          <div className="custDash-expense-bar" style={{height: '40%'}}>
            <span className="custDash-expense-label">Health</span>
          </div>
        </div>
      </div>
      <div className="custDash-payment-schedule">
        <h3>Payment schedule</h3>
        <ul className="custDash-schedule-list">
          <li className="custDash-schedule-item">
            <div className="custDash-schedule-date">16</div>
            <div className="custDash-schedule-details">
              <span className="custDash-schedule-name">Netflix</span>
              <span className="custDash-schedule-amount">$28.17</span>
            </div>
          </li>
          <li className="custDash-schedule-item">
            <div className="custDash-schedule-date">18</div>
            <div className="custDash-schedule-details">
              <span className="custDash-schedule-name">Spotify</span>
              <span className="custDash-schedule-amount">$10.56</span>
            </div>
          </li>
          <li className="custDash-schedule-item">
            <div className="custDash-schedule-date">21</div>
            <div className="custDash-schedule-details">
              <span className="custDash-schedule-name">Adobe</span>
              <span className="custDash-schedule-amount">$59.23</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ExpensesAndSchedule;