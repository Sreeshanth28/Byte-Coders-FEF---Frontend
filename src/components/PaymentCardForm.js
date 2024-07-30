import React from 'react';
import '../styles/MakePayment.css'; // Import the CSS file

const PaymentCardForm = () => {
  return (
    <form className="paymentCard-form">
      <input className="paymentCard-input" type="text" placeholder="Name" />
      <input className="paymentCard-input" type="text" placeholder="E-Mail I.D." />
      <textarea className="paymentCard-textarea" placeholder="Enter message"></textarea>
      <center>
        <button className="paymentCard-button">Submit</button>
      </center>
    </form>
  );
};

export default PaymentCardForm;
