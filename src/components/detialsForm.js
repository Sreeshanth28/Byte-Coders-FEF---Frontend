import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/detailsForm.css';

const DetailsForm = () => {
  const [formData, setFormData] = useState({
    bnplId: '',
    email: '',
    loginPassword: '',
    empID: '',
    orgId: '',
    name: '',
    accountNumber: '',
    salary: '',
    isInNoticePeriod: '',
    address: '',
    bnplLimit: '',
    PAN: '',
    paymentPin: '',
    bnplCard: {},
    autoPay: '',
    autoPayAccount: {},
  });
  const [responseData, setResponseData] = useState(null); // New state for storing response data
  const navigate = useNavigate();

  const excludeFields = [
    'bnplId',
    'loginPassword',
    'isInNoticePeriod',
    'bnplLimit',
    'bnplCard',
    'autoPay',
    'autoPayAccount'
  ];

  useEffect(() => {
    const fetchData = async () => {
      const emailData = sessionStorage.getItem('email');
      if (emailData) {
        try {
          const response = await fetch(`http://127.0.0.1:8000/getcustomerdetails/?email=${emailData}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            }
          });

          if (response.ok) {
            const data = await response.json(); // Parse the response as JSON
            setFormData(data.customerInfo); // Set the response data in state
            setResponseData(data); // Set the response data in state
            console.log('API call successful', data);
          } else {
            console.error('Failed to fetch user details');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/addnewcustomer/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to submit user details');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: '100vh', marginTop: "250px" }}>
      <h1 style={{ marginRight: '4vw' }}>Fill your Details here </h1>
      <form className="userdetails-form" onSubmit={handleSubmit}>
        <ul className="userdetails-wrapper">
          {Object.keys(formData).filter(key => !excludeFields.includes(key)).map((key, index) => (
            <li key={key} style={{ '--i': Object.keys(formData).length - index }}>
              <input
                className="userdetails-input"
                type={key === 'email' ? 'email' : 'text'}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                required
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
              />
            </li>
          ))}
          <button className='userdetails-button' style={{ '--i': 1 }} type="submit" styles={{ 'marginTop': '100px' }}>Submit</button>
        </ul>
      </form>
    </div>
  );
};

export default DetailsForm;
