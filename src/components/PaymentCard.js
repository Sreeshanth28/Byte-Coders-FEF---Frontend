import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Make sure you have axios installed
import '../styles/PaymentCard.css';
import OtpForm from './OtpPage';

const PaymentCardForm = () => {
  const [productCost, setProductCost] = useState(1000);
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [duration, setDuration] = useState('');
  const [salaryDeduction, setSalaryDeduction] = useState('');
  const [paymentPin, setPaymentPin] = useState('');
  const [errors, setErrors] = useState({});
  const [backendError, setBackendError] = useState('');
  const [otpFormVisible, setOtpFormVisible] = useState(false); // State to manage OTP form visibility
  const [isFormValid, setIsFormValid] = useState(false); // State to manage button enable/disable

  useEffect(() => {
    // Check form validity whenever input values change
    setIsFormValid(
      validateCardNumber(cardNumber) &&
      validateExpiryDate(expiryDate) &&
      validateCvv(cvv) &&
      duration &&
      salaryDeduction &&
      paymentPin
    );
  }, [cardNumber, expiryDate, cvv, duration, salaryDeduction, paymentPin]);

  const handleSubmit = async () => {
    setOtpFormVisible(true); // Show OTP form upon successful payment

    const newErrors = {};
    if (!validateCardNumber(cardNumber)) {
      newErrors.cardNumber = 'Invalid card number. Format should be 1234 5678 1234 2345.';
    }
    if (!validateExpiryDate(expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date. Format should be MM/YY.';
    }
    if (!validateCvv(cvv)) {
      newErrors.cvv = 'Invalid CVV. It should be 3 digits.';
    }
    if (!duration) {
      newErrors.duration = 'Duration is required.';
    }
    if (!salaryDeduction) {
      newErrors.salaryDeduction = 'Salary deduction percentage is required.';
    }
    if (!paymentPin) {
      newErrors.paymentPin = 'Payment pin is required.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;  // Prevent form submission if there are validation errors
    }

    setErrors({});
    setBackendError('');

    const formData = {
      productCost,
      cardNumber,
      expiryDate,
      cvv,
      duration,
      salaryDeduction,
      paymentPin
    };
    console.log('Data being sent:', formData);

    try {
      const response = await axios.post('YOUR_BACKEND_API_URL', formData);
      // Handle successful response if needed
      if (response.data === 'itsverified') {
        setOtpFormVisible(true); // Show OTP form upon successful payment
      } else {
        alert('Payment Failed');
      }
      alert('Payment Successful');
    } catch (error) {
      if (error.response) {
        // Error response from backend
        setBackendError(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        // Error not related to response (e.g., network error)
        setBackendError('An error occurred. Please try again.');
      }
    }
  };

  const validateCardNumber = (number) => {
    // Updated regex to match the format 1234 5678 1234 2345
    const regex = /^\d{4} \d{4} \d{4} \d{4}$/;
    return regex.test(number);
  };

  const validateExpiryDate = (date) => {
    // Regex to match the expiry date format MM/YY
    const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    return regex.test(date);
  };

  const validateCvv = (cvv) => {
    // Updated regex to match CVV with exactly 3 digits
    const regex = /^\d{3}$/;
    return regex.test(cvv);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10vh' }}>
      {otpFormVisible ? (
        <OtpForm /> // Render OTPForm when otpFormVisible is true
      ) : (  
      <section className="ecompc-paymentcard-add-card ecompc-paymentcard-page">
        <form className="ecompc-paymentcard-form" onSubmit={(e) => e.preventDefault()}>
          {backendError && <div className="ecompc-paymentcard-error">{backendError}</div>}
          <label htmlFor="name" className="ecompc-paymentcard-label">
            <span className="ecompc-paymentcard-title">Amount to be paid</span>
            <input
              style={{cursor:"not-allowed"}}
              className="ecompc-paymentcard-input-field"
              type="text"
              name="input-name"
              title="Input title"
              value={productCost}
              placeholder="Enter your full name"
              readOnly
            />
          </label>
          <label htmlFor="serialCardNumber" className="ecompc-paymentcard-label">
            <span className="ecompc-paymentcard-title">Card Number</span>
            <input
              id="serialCardNumber"
              className="ecompc-paymentcard-input-field"
              type="text"
              name="input-name"
              title="Input title"
              value={cardNumber}
              placeholder="1234 5678 1234 2345"
              onChange={(e) => setCardNumber(e.target.value)}
            />
            {errors.cardNumber && <span className="ecompc-paymentcard-error">{errors.cardNumber}</span>}
          </label>
          <div className="ecompc-paymentcard-split">
            <label htmlFor="ExDate" className="ecompc-paymentcard-label">
              <span className="ecompc-paymentcard-title">Expiry Date</span>
              <input
                id="ExDate"
                className="ecompc-paymentcard-input-field"
                type="text"
                name="input-name"
                title="Expiry Date"
                value={expiryDate}
                placeholder="01/23"
                onChange={(e) => setExpiryDate(e.target.value)}
              />
              {errors.expiryDate && <span className="ecompc-paymentcard-error">{errors.expiryDate}</span>}
            </label>
            <label htmlFor="cvv" className="ecompc-paymentcard-label">
              <span className="ecompc-paymentcard-title">CVV</span>
              <input
                id="cvv"
                className="ecompc-paymentcard-input-field"
                type="text"
                name="cvv"
                title="CVV"
                value={cvv}
                placeholder="CVV"
                onChange={(e) => setCvv(e.target.value)}
              />
              {errors.cvv && <span className="ecompc-paymentcard-error">{errors.cvv}</span>}
            </label>
          </div>
          <label htmlFor="duration" className="ecompc-paymentcard-label">
            <span className="ecompc-paymentcard-title">Duration (In Months)</span>
            <select
              id="duration"
              className="ecompc-paymentcard-input-field"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="">Select Duration</option>
              <option value="4">4 months</option>
              <option value="8">8 months</option>
              <option value="12">12 months</option>
            </select>
            {errors.duration && <span className="ecompc-paymentcard-error">{errors.duration}</span>}
          </label>
          <label htmlFor="salaryDeduction" className="ecompc-paymentcard-label">
            <span className="ecompc-paymentcard-title">Salary Deduction Percentage</span>
            <select
              id="salaryDeduction"
              className="ecompc-paymentcard-input-field"
              value={salaryDeduction}
              onChange={(e) => setSalaryDeduction(e.target.value)}
            >
              <option value="">Select Percentage</option>
              <option value="10">10%</option>
              <option value="20">20%</option>
              <option value="30">30%</option>
              <option value="40">40%</option>
            </select>
            {errors.salaryDeduction && <span className="ecompc-paymentcard-error">{errors.salaryDeduction}</span>}
          </label>
          <label htmlFor="paymentPin" className="ecompc-paymentcard-label">
            <span className="ecompc-paymentcard-title">Payment Pin</span>
            <input
              id="paymentPin"
              className="ecompc-paymentcard-input-field"
              type="password"
              name="paymentPin"
              title="Payment Pin"
              value={paymentPin}
              placeholder="Enter your payment pin"
              onChange={(e) => setPaymentPin(e.target.value)}
            />
            {errors.paymentPin && <span className="ecompc-paymentcard-error">{errors.paymentPin}</span>}
          </label>
          <input
            className={`ecompc-paymentcard-checkout-btn ${isFormValid ? 'enabled' : ''}`}
            type="button"
            value="Proceed to pay"
            onClick={handleSubmit}
            disabled={!isFormValid} // Disable the button if the form is not valid
          />
        </form>
      </section>)}
    </div>
  );
};

export default PaymentCardForm;
