import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  return (
    <nav className="custDash-sidebar">
      <h1>BNPL Dashboard</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/transactions">Transactions</Link></li>
        <li><Link to="/card-details">Card Details</Link></li>
        <li><Link to="/loan-details">Loan Info</Link></li>
      </ul>
      <button className="custDash-logoutButton">Logout</button>
    </nav>
  );
};

export default Sidebar;