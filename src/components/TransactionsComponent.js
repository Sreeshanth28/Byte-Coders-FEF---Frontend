import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '../styles/Customer.css';

const TransactionsComponent = ({ customerId,toggleView }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showPopup, setShowPopup] = useState(false);
  const [selectedTransactionDetails, setSelectedTransactionDetails] = useState(null);
  const [data3,setdata3]=useState([]
    // { accountNumber: '1234567890', amount: '$100' },
    // { accountNumber: '2345678901', amount: '$200' },
    // { accountNumber: '3456789012', amount: '$150' },
    // { accountNumber: '4567890123', amount: '$300' },
    // { accountNumber: '5678901234', amount: '$250' },
  );
  const customerId1 = customerId;
  console.log(customerId1);

//   const [accountDetails, setAccountDetails] = useState([
//     { accountNumber: '1234567890', amount: '$100' },
//     { accountNumber: '2345678901', amount: '$200' },
//     { accountNumber: '3456789012', amount: '$150' },
//     { accountNumber: '4567890123', amount: '$300' },
//     { accountNumber: '5678901234', amount: '$250' },
//   ]);
  const [previousTransactions, setPreviousTransactions] = useState([]
    // { transactionId: '1', date: '2024-07-25', status: 'Success', amount: '$500' },
    // { transactionId: '2', date: '2024-07-24', status: 'Failed', amount: '$1200' },
    // { transactionId: '3', date: '2024-07-23', status: 'Success', amount: '$750' },
    // { transactionId: '4', date: '2024-07-22', status: 'Success', amount: '$300' },
    // { transactionId: '5', date: '2024-07-21', status: 'Failed', amount: '$1500' },
  );
  const [upcomingTransactions, setUpcomingTransactions] = useState([]
    // { date: '2024-07-28', description: 'Utility Bill Payment', amount: '$200' },
    // { date: '2024-07-29', description: 'Salary Deposit', amount: '$3000' },
    // { date: '2024-07-30', description: 'Subscription Renewal', amount: '$15' },
    // { date: '2024-07-31', description: 'Loan Repayment', amount: '$500' },
    // { date: '2024-08-01', description: 'Insurance Premium', amount: '$100' },
  );
  

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const recordsPerPage = 25;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/getallorgdetails/'); // Replace with your actual API endpoint
        // console.log(response);
        const data = response.data;
        // console.log(data);
        const customerData = data[customerId1];

        // console.log(customerData);
        if (customerData) {
          // console.log(customerData.previous);
          // console.log(customerData.upcoming);
          setPreviousTransactions(customerData.previous);

          // console.log(previousTransactions);
          setUpcomingTransactions(customerData.upcoming);

          // console.log(upcomingTransactions);
  
          // Determine which transactions to use based on activeTab
          const relevantData = activeTab === 'upcoming'
            ? customerData.upcoming
            : customerData.previous;
  
          // Extract beneficiary data
          const beneficiaryData = relevantData.flatMap(transaction => transaction.beneficiary);
          // console.log(beneficiaryData);
          setdata3(beneficiaryData);
          console.log(data3);
        } else {
          console.error('Customer data not found');
        }
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
  
    fetchData();
  }, [customerId1, activeTab]); // Add activeTab to dependency array to re-run on tab change
  

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    setSearchTerm('');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const filteredData = activeTab === 'previous'
    ? previousTransactions.filter(item =>
        Object.values(item).some(val => 
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : upcomingTransactions.filter(item =>
        Object.values(item).some(val => 
          val.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
  console.log(6666666);
  console.log(filteredData);
  console.log(data3);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const sscTableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(to bottom, #ffffff, #f7f7f7)',
  };
  
  const sscThStyles = {
    background: 'linear-gradient(to bottom, #5a287d, #4a1d6d)',
    color: 'white',
    textAlign: 'left',
    padding: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    cursor: 'pointer',
  };
  
  const sscTdStyles = {
    padding: '12px',
    borderBottom: '1px solid #e0e0e0',
  };
  
  const sscTrStyles = {
    transition: 'background-color 0.3s',
  };
  
  const sscTrHoverStyles = {
    backgroundColor: '#f5f5f5',
  };
  
  const sscSearchBarStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '15px',
    marginLeft: '65vw',
  };

  const sscSearchInputStyle = {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '200px',
  };
  
  const sscContainerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  };
  
  const sscHeaderStyle = {
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
  };

  const handleViewDetails = (transaction) => {
    setSelectedTransactionDetails(transaction);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedTransactionDetails(null);
  };

  const handlesubmitforsalary = async () => {
    console.log("working");
    const requestBody = {
      sweetShopId: customerId1,
      beneficiary: data3.map(item => ({
        empId:item.empID,
        accountNumber: item.accountNumber,
        salary: item.salary
      }))
    };
console.log(111111111111111111111111111)
    console.log(requestBody);
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/sendingsalaries/', requestBody);
      console.log('Success:', response.data);

    } catch (error) {
      console.error('Error:', error);
    }
    handleTabChange('previous');
    closePopup();

  };

  const renderPopup = () => {
    if (!showPopup) return null;

    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>Transaction Details</h2>
          <table className="popup-table">
            <thead>
              <tr>
                <th>Account Number</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {data3.map((account, index) => (
                <tr key={index}>
                  <td>{account.accountNumber}</td>
                  <td>{account.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px' }}>
            <button onClick={closePopup} className="close-popup">Close</button>
            {activeTab === 'upcoming' && (<button className='submit-popup' onClick={handlesubmitforsalary}>Submit</button>)}
          </div>
        </div>
      </div>
    );
  };

  const renderTabContent = () => {
    return (
      <div className="customerWrapper">
        <div style={sscSearchBarStyle}>
          <input
            style={sscSearchInputStyle}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="customerTableWrapper">
          <table style={sscTableStyles} className="customerKeywords" cellSpacing="0" cellPadding="0">
            <thead className="customerThead">
              <tr className="customerTr">
                {activeTab === 'previous' ? (
                  <>
                    <th style={sscThStyles}><span>TransactionID</span></th>
                    <th style={sscThStyles}><span>Date</span></th>
                    <th style={sscThStyles}><span>Status</span></th>
                    <th style={sscThStyles}><span>Amount</span></th>
                    <th style={sscThStyles}><span>Actions</span></th>
                  </>
                ) : (
                  <>
                    <th style={sscThStyles}><span>Date</span></th>
                    <th style={sscThStyles}><span>Description</span></th>
                    <th style={sscThStyles}><span>Amount</span></th>
                    <th style={sscThStyles}><span>Actions</span></th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="customerTbody">
              {currentRecords.map((item, index) => (
                <tr 
                  className="customerTr" 
                  key={index} 
                  style={sscTrStyles}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                >
                  {activeTab === 'previous' ? (
                    <>
                      <td style={sscTdStyles} className="customerTd">{item.tranId}</td>
                      <td style={sscTdStyles} className="customerTd">{item.Date}</td>
                      <td style={sscTdStyles} className="customerTd" >success</td>
                      <td style={sscTdStyles} className="customerTd">{item.amount}</td>
                      <td style={sscTdStyles} className="customerTd">
                        <button className="customerbutton" onClick={() => handleViewDetails(item)}>
                          <span className="customerbutton-content">View Details</span>
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td style={sscTdStyles} className="customerTd">{item.Date}</td>
                      <td style={sscTdStyles} className="customerTd">{item.Description}</td>
                      <td style={sscTdStyles} className="customerTd">{item.amount}</td>
                      <td style={sscTdStyles} className="customerTd">
                        <button className="customerbutton" onClick={() => handleViewDetails(item)}>
                          <span className="customerbutton-content">View Details</span>
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          <div className="customer-pagination">
            <button 
              onClick={() => paginate(currentPage - 1)} 
              disabled={currentPage === 1}
              className="customer-button"
            >
              Previous
            </button>
            <div className="customer-page-numbers">
              {[...Array(Math.ceil(filteredData.length / recordsPerPage)).keys()].map(number => (
                <button 
                  key={number + 1} 
                  onClick={() => paginate(number + 1)}
                  className={`customer-button ${currentPage === number + 1 ? 'customer-active' : ''}`}
                >
                  {number + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === Math.ceil(filteredData.length / recordsPerPage)}
              className="customer-button"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  const sscTabStyle = {
    padding: '10px 20px',
    cursor: 'pointer',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderBottom: '2px solid transparent',
    marginRight: '10px',
  };

  const sscActiveTabStyle = {
    ...sscTabStyle,
    borderBottom: '2px solid #5a287d',
    fontWeight: 'bold',
  };

  const sscHomeButtonStyle = {
    padding: '10px 20px',
    backgroundColor: '#5a287d',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '20px',
    height:'40px',
    display:'flex',
    justifyContent:'center',

  };
  const sschomebuttonimage={
//     width: 100% /* Make the image take up the full width of the button */
//   height: 100%, /* Make the image take up the full height of the button */
//   objectfit: cover
  };

  const sscTabsContainerStyle = {
    display: 'flex',
  };

  const sscPopupStyles = `
    .popup-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }
    .popup-content {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      max-width: 500px;
      width: 100%;
    }
    .popup-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }
    .popup-table th, .popup-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .popup-table th {
      background-color: #f2f2f2;
    }
    .close-popup {
      background-color: #5a287d;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
    .submit-popup {
      background-color: #5a287d;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
    }
  `;

  return (
    <div style={sscContainerStyle}>
      <style>{sscPopupStyles}</style>
      <div style={sscHeaderStyle}>
        <button style={sscHomeButtonStyle} onClick={toggleView}>
            <p>back</p>
            {/* <img src='https://png.pngtree.com/png-clipart/20190705/original/pngtree-vector-back-icon-png-image_4190818.jpg' alt="Button Image" style={sschomebuttonimage}/> */}
        </button>
        <div style={sscTabsContainerStyle}>
          <button
            onClick={() => handleTabChange('upcoming')}
            style={activeTab === 'upcoming' ? sscActiveTabStyle : sscTabStyle}
          >
            Upcoming Transactions
          </button>
          <button
            onClick={() => handleTabChange('previous')}
            style={activeTab === 'previous' ? sscActiveTabStyle : sscTabStyle}
          >
            Previous Transactions
          </button>
        </div>
      </div>
      {renderTabContent()}
      {renderPopup()}
    </div>
  );
};

export default TransactionsComponent;
