import React, { useState, useEffect } from 'react';
import '../styles/Sscustomeradmin.css';
import axios from 'axios';

const Customerdashboard = () => {
  const [orgID, setOrgID] = useState("344967");
  const [description, setDescription] = useState("salaries of my employees");
  const [data, setData] = useState([
    // { employee: 'ass hole Doe', email: 'john@gmail.com', bankAccountNumber: '12345678', salary: '50000' },
  ]);
  const [title, setTitle] = useState('SS sewwt shop');
  const [accountNumber, setAccountNumber] = useState('1234567890');
  const [balance, setBalance] = useState('1234567');
  const [sortConfig, setSortConfig] = useState({ key: 'employee', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const recordsPerPage = 8;

  useEffect(() => {
    const fetchTitleAndAccountDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/getorganisationdetails/?orgId=${orgID}`);
        setTitle(response.data.name);
        setAccountNumber(response.data.accountNumber);
        setBalance(response.data.accountBalance);
      } catch (error) {
        console.error('Error fetching title and account details:', error);
      }
    };
    const generateRandomEmail = (name) => {
        const domains = ['example.com', 'mail.com', 'company.com'];
        const randomDomain = domains[Math.floor(Math.random() * domains.length)];
        const email = `${name.toLowerCase().replace(/ /g, '')}@${randomDomain}`;
        return email;
      };

    const fetchEmployeeDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/getemployeedetailsbyorgid/?orgId=${orgID}`);
        console.log(response);
        const employeesWithPhoneNumbers = response.data.allEmployees.map(employee => ({
          ...employee,
          phoneNumber: `+44 7911 ${Math.floor(100000 + Math.random() * 900000)}`,
          email: generateRandomEmail(employee.name),
        }));
        setData(employeesWithPhoneNumbers);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        // Fill with sample data if there's an error
        setData([
        //   { employee: 'John Doe', email: 'john@gmail.com', phoneNumber: '+44 7911 123456', bankAccountNumber: '12345678', salary: '50000' },
        //   { employee: 'Jane Smith', email: 'jane@gmail.com', phoneNumber: '+44 7911 654321', bankAccountNumber: '87654321', salary: '60000' },
          // Add more sample data as needed
        ]);
      }
    };

    fetchTitleAndAccountDetails();
    fetchEmployeeDetails();
  }, [orgID]);

  const sortedData = React.useMemo(() => {
    let sortableData = [...data];
    sortableData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortableData;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = sortedData.filter(item =>
    Object.values(item).some(val => 
      val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSendDetails = async () => {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const tranID = Math.floor(1000000 + Math.random() * 9000000); // Generate a random 7-digit number
    const beneficiary = data.map(employee => ({
      empID: employee.empID,
      accountNumber: employee.accountNumber,
      salary: employee.salary,
    }));
    const amount = beneficiary.reduce((total, item) => total + parseFloat(item.salary), 0);

    const requestBody = {
      OrgID: orgID,
      Date: today,
      Description: description,
      beneficiary,
      amount,
      tranID,
    };
    console.log(requestBody);

    try {
      const response = await axios.post('http://127.0.0.1:8000/addtoupcoming/', requestBody);
      console.log('Response:', response.data);
      // Handle successful response
    } catch (error) {
      console.error('Error sending details:', error);
      // Handle error
    }
  };

  // Styles
  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(to bottom, #ffffff, #D6EFD8)',
  };

  const thStyles = {
    background: 'linear-gradient(to bottom, #1A5319, #508D4E)',
    color: 'white',
    textAlign: 'left',
    padding: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    cursor: 'pointer',
  };

  const tdStyles = {
    padding: '12px',
    borderBottom: '1px solid #e0e0e0',
  };

  const trStyles = {
    transition: 'background-color 0.3s',
  };

  const searchBarStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '15px',
    marginLeft: '65vw',
  };

  const searchInputStyle = {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    width: '200px',
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 17px',
  };

  const accountInfoStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    width: '100%',
    padding: '15px',
    backgroundColor: '#D6EFD8',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease',
  };

  const accountItemStyle = {
    display: 'flex',
    flexDirection: 'column',
  };

  const accountLabelStyle = {
    fontSize: '14px',
    color: '#666',
    marginBottom: '5px',
  };

  const accountValueStyle = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#1A5319',
  };

  return (
    <div style={containerStyle}>
      <div className="customeremployeeTitle">
        <span className="customeremployeeTitleText">{title}</span>
      </div>
      <div style={accountInfoStyle}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}>
        <div style={accountItemStyle}>
          <span style={accountLabelStyle}><b>Account Number</b></span>
          <span style={accountValueStyle}>{accountNumber}</span>
        </div>
        <div style={accountItemStyle}>
          <span style={accountLabelStyle}><b>Balance</b></span>
          <span style={accountValueStyle}>{balance}</span>
        </div>
      </div>
      <div className="customeremployeeWrapper">
        <div style={searchBarStyle}>
          <input
            style={searchInputStyle}
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="customeremployeeTableWrapper">
          <table style={tableStyles} className="customeremployeeKeywords" cellSpacing="0" cellPadding="0">
            <thead className="customeremployeeThead">
              <tr className="customeremployeeTr">
                <th style={thStyles} onClick={() => requestSort('empId')}><span>Employee</span></th>
                <th style={thStyles} onClick={() => requestSort('name')}><span>Email</span></th>
                <th style={thStyles} onClick={() => requestSort('phoneNumber')}><span>Phone Number</span></th>
                <th style={thStyles} onClick={() => requestSort('accountNumber')}><span>Bank Account Number</span></th>
                <th style={thStyles} onClick={() => requestSort('salary')}><span>Salary</span></th>
              </tr>
            </thead>
            <tbody className="customeremployeeTbody">
              {currentRecords.map((item, index) => (
                <tr
                  className="customeremployeeTr"
                  key={index}
                  style={trStyles}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                >
                  <td style={tdStyles} className="customeremployeeTd">{item.name}</td>
                  <td style={tdStyles} className="customeremployeeTd">{item.email}</td>
                  <td style={tdStyles} className="customeremployeeTd">{item.phoneNumber}</td>
                  <td style={tdStyles} className="customeremployeeTd">{item.accountNumber}</td>
                  <td style={tdStyles} className="customeremployeeTd">{item.salary}</td>
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
              {[...Array(Math.ceil(data.length / recordsPerPage)).keys()].map(number => (
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
              disabled={currentPage === Math.ceil(data.length / recordsPerPage)}
              className="customer-button"
            >
              Next
            </button>
          </div>
          <button className="customerbutton" onClick={handleSendDetails}>
            <span className="customerbutton-content">Send Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Customerdashboard;
