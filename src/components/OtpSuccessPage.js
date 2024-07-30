import React from 'react';
import '../styles/OtpSuccessPage.css'; // Make sure to create this CSS file and paste the styles below
import { BrowserRouter, Route, Routes,Link } from 'react-router-dom';

const OtpSuccessPage = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10vh' }}>
      <div className="psp-card">
        <button className="psp-dismiss" type="button">×</button>
        <div className="psp-header">
          <div className="psp-image">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M20 7L9.00004 18L3.99994 13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
            </svg>
          </div>
          <div className="psp-content">
            <span className="psp-title">Order Placed !!!</span>
            <p className="psp-message">Thank you for your purchase. Your package will be delivered within 2 days of your purchase</p>
          </div>
          <div className="psp-actions">
            <button className="psp-history" type="button"><Link to="/home">Shop more !!!</Link></button>
            <button className="psp-track" type="button">Track my package</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtpSuccessPage;
