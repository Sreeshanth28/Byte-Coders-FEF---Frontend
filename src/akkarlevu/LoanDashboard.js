import React, { useState } from 'react';
import '../styles/loanDashboard.css';

const TabSwitch = ({ tabs, children }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="loancard-tabSwitch">
      <div className="loancard-tabSwitch-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`loancard-tabSwitch-tab ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="loancard-tabSwitch-content">
        {React.Children.map(children, (child) => {
          if (child.props.label === activeTab) return child;
          return null;
        })}
      </div>
    </div>
  );
};

const LoanCard = ({ title, totalAmount, autoPayPercentage, customerPay, totalMonths, date }) => {
  return (
    <div className="loancard-book">
      <p>Loan Title: {title}</p>
      <p>Total Amount: ${totalAmount.toFixed(2)}</p>
      <p>Auto Pay from Salary: {autoPayPercentage}%</p>
      <p>Customer Pay: ${customerPay.toFixed(2)}</p>
      <p>Total Months: {totalMonths}</p>
      <p>Date: {date}</p>

      <div className="loancard-cover">
        <div>
          <h2>{title}</h2>
        </div>
      </div>
    </div>
  );
};


  const currentLoans = [
    {
      title: 'Fridge Purchase',
      totalAmount: 1500,
      autoPayPercentage: 5,
      customerPay: 1425,
      totalMonths: 12,
      date: '2024-07-27',
    },
    {
      title: 'Laptop Purchase',
      totalAmount: 2000,
      autoPayPercentage: 10,
      customerPay: 1800,
      totalMonths: 24,
      date: '2024-07-27',
    },
  ];
  
  const previousLoans = [
    {
      title: 'Vacation Loan',
      totalAmount: 3000,
      autoPayPercentage: 15,
      customerPay: 2550,
      totalMonths: 18,
      date: '2024-07-27',
    },
    {
      title: 'Car Repair',
      totalAmount: 500,
      autoPayPercentage: 5,
      customerPay: 475,
      totalMonths: 6,
      date: '2024-07-27',
    },
    {
      title: 'Medical Expenses',
      totalAmount: 2500,
      autoPayPercentage: 20,
      customerPay: 2000,
      totalMonths: 36,
      date: '2024-07-27',
    },
  ];
  
  const LoanDashboard = () => {
    return (
      <TabSwitch tabs={['Current Ongoing Loans', 'Previous Loans']}>
        <div label="Current Ongoing Loans">
          <div className="loanDashboard">
            {currentLoans.map((loan, index) => (
              <LoanCard key={index} {...loan} />
            ))}
          </div>
        </div>
        <div label="Previous Loans">
          <div className="loanDashboard">
            {previousLoans.map((loan, index) => (
              <LoanCard key={index} {...loan} />
            ))}
          </div>
        </div>
      </TabSwitch>
    );
  };
  
export default LoanDashboard;

