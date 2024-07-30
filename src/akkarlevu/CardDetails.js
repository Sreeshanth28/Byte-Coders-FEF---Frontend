import React, { useState }  from 'react';
import VirtualCard from './virtualCard';
import '../styles/CardDetails.css';

const CardDetails = () => {
  const [showCard, setShowCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(null);

  // Mock data - in a real app, this would come from an API
  const cardInfo = {
    cardNumber: '**** **** **** 6420',
    cardHolder: 'JOE ALISON',
    expirationDate: '10/25',
    creditLimit: 5000,
    availableCredit: 3500,
  };

  const handleCheckBalance = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setBalance(cardInfo.availableCredit);
    }, 1500);
  };

  const handleReportCard = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Card reported as lost or stolen. Our team will contact you shortly.');
    }, 1500);
  };


  const handleAction = (action) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`${action} action completed`);
    }, 1500);
  };

  
  return (
    <div className="custDash-cardDetails">
      <h2>Card Details</h2>
      {loading && <div className="custDash-loader">Loading...</div>}
      <div className="custDash-cardInfo">
        <div className="custDash-creditLimit">
          <h3>Credit Limit</h3>
          <p>${cardInfo.creditLimit.toFixed(2)}</p>
        </div>
        {balance !== null && (
          <div className="custDash-balance">
            <h3>Current Balance</h3>
            <p>${balance.toFixed(3)}</p>
          </div>
        )}
      </div>
      <div className="custDash-cardActions">
        <button onClick={() => setShowCard(true)} className="custDash-actionButton">Show Card</button>
        <button onClick={handleCheckBalance} className="custDash-actionButton">
          Check Balance
          {balance !== null && <span className="custDash-balanceIcon">💰</span>}
        </button>
        <button onClick={handleReportCard} className="custDash-actionButton custDash-reportButton">Report Lost or Stolen</button>
      </div>
      {showCard && (
        <div className="custDash-modalOverlay" onClick={() => setShowCard(false)}>
          <div className="custDash-modalContent" onClick={(e) => e.stopPropagation()}>
            <VirtualCard />
            <button onClick={() => setShowCard(false)} className="custDash-closeButton">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardDetails;