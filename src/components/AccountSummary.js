// components/AccountSummary.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AccountSummary.css';
import VirtualCard from './virtualCard';

const AccountSummary = () => {
  const [showCard, setShowCard] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [customerInfo, setCustomerInfo] = useState(null);

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/getcustomerdetails/?email=${email}`);
        if (response.data.success === "yes") {
          setCustomerInfo(response.data.customerInfo);
          setCardDetails({
            number: response.data.customerInfo.bnplCard.cardNumber,
            name: response.data.customerInfo.name,
            expiry: response.data.customerInfo.bnplCard.expiryDate,
            cvv: response.data.customerInfo.bnplCard.CVV
          });
          console.log(cardDetails);
        } else {
          console.error("Failed to fetch customer details");
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    fetchCustomerDetails();
  }, []);

  const handleViewCard = () => {
    setShowCard(true);
  };

  const handleCloseCard = () => {
    setShowCard(false);
  };

  if (!customerInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="custDash-account-summary">
      <h2 className="custDash-welcome">Welcome back, {customerInfo.name}!</h2>
      <div className="custDash-card">
        <div className="custDash-card-type">VISA</div>
        <div className="custDash-card-number">
          **** **** **** {cardDetails.number.slice(-4)}
        </div>
        <div className="custDash-balance">
          <span className="custDash-balance-label">Available Limit to spend:</span>
          <span className="custDash-balance-amount">$ {customerInfo.bnplLimit}</span>
        </div>
        {/* <div className="custDash-available">
          <span>Available Limit to spend:</span>
          <span>${customerInfo.bnplLimit}</span>
        </div> */}
        <div className="custDash-actions">
          <button className="custDash-view-card" onClick={handleViewCard}>View Card</button>
          <button className="custDash-report-stolen">Report Stolen</button>
        </div>
        {showCard && <VirtualCard cardDetails={cardDetails} onClose={handleCloseCard} />}
      </div>
    </div>
  );
};

export default AccountSummary;