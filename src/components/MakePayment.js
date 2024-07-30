import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MakePayment.css';

const PayButton = ({ onClick }) => {
  return (
    <button type="submit" className="payment-btn" onClick={onClick}>
      Pay
      <svg className="payment-svgIcon" viewBox="0 0 576 512">
        <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
      </svg>
      <div className="payment-btn-bg"></div>
    </button>
  );
};

const PaymentCardForm = ({ onClose, latestDues, onPaymentSubmit }) => {
  const [accountNumber, setAccountNumber] = useState('');
  const amountToPay = sessionStorage.getItem('amountToPay');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPaymentSubmit(accountNumber);
  };

  return (
    <div className="paymentCard-modal-overlay">
      <div className="paymentCard-modal-content">
        <form className="paymentCard-form" onSubmit={handleSubmit}>
          <input 
            className="paymentCard-input" 
            type="text" 
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            required
          />
          <button className="paymentCard-button" type="submit">Pay {amountToPay}</button>
        </form>
        <button className="paymentCard-modal-close" onClick={onClose}>x</button>
      </div>
    </div>
  );
};

const HoverCard = () => {
  const [message1, setMessage1] = useState('Enable/Disable Transaction');
  const [message2, setMessage2] = useState('Due Transaction');
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [latestDues, setLatestDues] = useState(null);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isAutopayEnabled, setIsAutopayEnabled] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const email = sessionStorage.getItem('email');
      try {
        const response = await axios.get(`http://127.0.0.1:8000/getcustomerdetails/?email=${email}`);
        const { autoPay, autoPayAccount } = response.data.customerInfo;
        setIsAutopayEnabled(autoPay === "1");
        setAccountNumber(autoPayAccount?.accountNumber || '');
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerDetails();
    fetchLatestDues();
  }, []);

  const fetchLatestDues = async () => {
    const bnplId = sessionStorage.getItem('bnplId');
    try {
      const response = await axios.get(`http://127.0.0.1:8000/getlatestdues/?bnplId=${bnplId}`);
      setLatestDues(response.data.latestDues);
      
      // Calculate total amount to pay
      const totalAmount = response.data.latestDues.reduce((sum, due) => sum + parseFloat(due.amountToPay), 0);
      sessionStorage.setItem('amountToPay', totalAmount.toFixed(2));
    } catch (error) {
      console.error('Error fetching latest dues:', error);
    }
  };

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };

  const handleAutopayToggle = async () => {
    const newAutopayStatus = !isAutopayEnabled;
    setIsAutopayEnabled(newAutopayStatus);
    
    const bnplId = sessionStorage.getItem('bnplId');
    try {
      await axios.put('http://127.0.0.1:8000/addautopayaccount/', {
        bnplId: bnplId,
        accountDetails: {
          accountNumber: accountNumber
        },
        autoPay: newAutopayStatus ? "1" : "0"
      });
      console.log('Autopay status updated successfully');
    } catch (error) {
      console.error('Error updating autopay status:', error);
      setIsAutopayEnabled(!newAutopayStatus); // Revert the state if the update fails
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bnplId = sessionStorage.getItem('bnplId');
    
    try {
      const response = await axios.put('http://127.0.0.1:8000/addautopayaccount/', {
        bnplId: bnplId,
        accountDetails: {
          accountNumber: accountNumber
        },
        autoPay: isAutopayEnabled ? "1" : "0"
      });
      console.log('Autopay account updated successfully:', response.data);
      // Handle successful update (e.g., show success message)
    } catch (error) {
      console.error('Error updating autopay account:', error);
      // Handle error (e.g., show error message)
    }
  };


  const handleAccountNumberChange = (e) => {
    setAccountNumber(e.target.value);
  };



  const handleMouseEnter2 = () => {
    if (latestDues && latestDues.length > 0) {
      const earliestDueDate = latestDues[0].dueDate;
      const bulletPoints = latestDues.map(due =>
        `• $${parseFloat(due.amountToPay).toFixed(2)} for ${due.description}`
      ).join('\n');
      setMessage2(`Due Date: ${earliestDueDate}\n\n${bulletPoints}`);
    } else {
      setMessage2('You do not have any Due\n payment information...');
    }
    setIsHovered(true);
  };

  const handleMouseLeave2 = () => {
    setMessage2('Due Transaction');
    setIsHovered(false);
  };

  const handlePayButtonClick = () => {
    setShowModal(true);
  };

  const handlePaymentSubmit = async (accountNumber) => {
    const bnplId = sessionStorage.getItem('bnplId');
    const installmentIds = latestDues.map(due => due.installmentId);

    console.log(installmentIds);
    console.log(bnplId)
    try {
      const response = await axios.post('http://127.0.0.1:8000/customerselfpayment/', {
        bnplId,
        installmentIds,
        accountNumber
      });
      console.log('Payment submitted successfully:', response.data);
      setShowModal(false);
      window.location.reload()
      
    } catch (error) {
      console.error('Error submitting payment:', error);
      // Handle payment error (e.g., show error message to user)
    }
  };

  return (
    <div className="payment-card">
      <p 
        onMouseEnter={handleMouseEnter1} 
        onMouseLeave={handleMouseLeave1}
        className="autopay-message"
      >
        {isHovered1 ? (
          <div className="autopay-container">
            <div className="autopay-toggle">
              <label>
                Autopay:
                <input
                  type="checkbox"
                  checked={isAutopayEnabled}
                  onChange={handleAutopayToggle}
                />
              </label>
            </div>
            <form onSubmit={handleSubmit} className="autopay-form">
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Enter Account Number"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        ) : (
          <span>{message1}</span>
        )}
      </p>
      <p onMouseEnter={handleMouseEnter2} onMouseLeave={handleMouseLeave2}>
        {message2 && <span style={{ whiteSpace: 'pre-line' }}>{message2}</span>}
        {isHovered && (
          <div className="payment-btn-container">
            <PayButton onClick={handlePayButtonClick} />
          </div>
        )}
      </p>
      {showModal && (
        <PaymentCardForm 
          onClose={() => setShowModal(false)} 
          latestDues={latestDues}
          onPaymentSubmit={handlePaymentSubmit}
        />
      )}
    </div>
  );
};

export default HoverCard;