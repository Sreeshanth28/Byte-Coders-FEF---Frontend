import React, { useState, useRef } from 'react';
import axios from 'axios';
import OtpSuccessPage from './OtpSuccessPage';
import '../styles/OtpPage.css';

const OtpForm = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move focus to next input field
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    setVerified(true);
    e.preventDefault();
    const otpCode = otp.join('');
    try {
      const response = await axios.post('YOUR_API_ENDPOINT', { otp: otpCode });
      if (response.data === 'itsdone') {
        setVerified(true);
      } else {
        // Handle verification failure
        alert('Verification failed. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  if (verified) {
    return <OtpSuccessPage />;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10vh' }}>
      <form className="otpp-form" onSubmit={handleSubmit}>
        <span className="otpp-main-heading">Enter OTP</span>
        <p className="otpp-subheading">We have sent a verification code to your mobile number</p>
        <div className="otpp-input-container">
          {otp.map((val, index) => (
            <input
              key={index}
              ref={el => inputRefs.current[index] = el}
              required
              maxLength="1"
              type="text"
              className="otpp-input"
              value={val}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          ))}
        </div>
        <button className="otpp-verify-button" type="submit">Verify</button>
        <button className="otpp-exit-btn" type="button">×</button>
        <p className="otpp-resend-note">Didn't receive the code? <button className="otpp-resend-btn" type="button">Resend Code</button></p>
      </form>
    </div>
  );
};

export default OtpForm;
