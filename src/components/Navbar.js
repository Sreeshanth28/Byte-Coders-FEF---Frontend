// components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {

  const handleLogout = () => {
    sessionStorage.clear();
    
  };
  return (
    <nav className="custDash-navbar">
      <div className="custDash-logo">
      <Link to="/dashboard"><span>Customer Portal</span></Link>
      </div>
      <ul className="custDash-nav-items">
        <li className="custDash-nav-item"><Link to="/dashboard">Dashboard</Link></li>
        <li className="custDash-nav-item"><Link to="/transactions">Transactions</Link></li>
        <li className="custDash-nav-item"><Link to="/analytics">Analytics</Link></li>
        <li className="custDash-nav-item"><Link to="/history">History</Link></li>
        <li className="custDash-nav-item"><Link to="/make-payment">Make Payment</Link></li>
      </ul>
      <div className="custDash-nav-right">
        {/* <button className="custDash-theme-toggle">🌙</button>
        <button className="custDash-notifications">🔔</button> */}
        <div className="custDash-user-notifications">
          <Link className="custDash-notifications" onClick={handleLogout} to="/auth">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;