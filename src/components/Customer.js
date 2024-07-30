import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Customer.css';
import TransactionsComponent from './TransactionsComponent';

const Customer = () => {
  const [data, setData] = useState([
    // { customerId: '1', name: 'John Doe', accountNumber: '123456789', balance: '$6000', employerInfo: 'Details 1' },
    // { customerId: '2', name: 'Jane Smith', accountNumber: '987654321', balance: '$2200', employerInfo: 'Details 2' },
    // { customerId: '3', name: 'Sam Green', accountNumber: '456789123', balance: '$13500', employerInfo: 'Details 3' },
    // { customerId: '4', name: 'Emily Brown', accountNumber: '321654987', balance: '$8700', employerInfo: 'Details 4' },
    // { customerId: '5', name: 'Chris Blue', accountNumber: '147258369', balance: '$9900', employerInfo: 'Details 5' },
    // { customerId: '6', name: 'Pat Yellow', accountNumber: '963852741', balance: '$10500', employerInfo: 'Details 6' },

  ]);
  const [showChild, setShowChild] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'customerId', direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/getallorgdetails/'); // replace with your API endpoint
        const formattedData = Object.keys(response.data).map(customerId => ({
          customerId,
          ...response.data[customerId],
          balance: response.data[customerId].accountBalance,
        }));
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  

  const toggleView = (customerId) => {
    setSelectedCustomerId(customerId);
    setShowChild(!showChild);
  };

  const recordsPerPage = 25;

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
      val.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const tableStyles = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '14px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    background: 'linear-gradient(to bottom, #ffffff, #f7f7f7)',
  };
  
  const thStyles = {
    background: 'linear-gradient(to bottom, #5a287d, #4a1d6d)',
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
  
  const trHoverStyles = {
    backgroundColor: '#f5f5f5',
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

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

  return (
    <div>
      {showChild ? (
        <TransactionsComponent customerId={selectedCustomerId} toggleView={toggleView} />
      ) : (
        <>
          <div className="customerTitle">
            <img src="https://www.natwest.com/content/dam/natwest_com/Logos/og-logo-nw.png" alt="Natwest Logo" className="customerLogo" />
            <span className="customerTitleText">Natwest Customers</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="customerWrapper">
              <div style={searchBarStyle}>
                <input
                  style={searchInputStyle}
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="customerTableWrapper">
                <table style={tableStyles} className="customerKeywords" cellSpacing="0" cellPadding="0">
                  <thead className="customerThead">
                    <tr className="customerTr">
                      <th style={thStyles} onClick={() => requestSort('customerId')}><span>CustomerID</span></th>
                      <th style={thStyles} onClick={() => requestSort('name')}><span>Customer Name</span></th>
                      <th style={thStyles} onClick={() => requestSort('accountNumber')}><span>Account Number</span></th>
                      <th style={thStyles} onClick={() => requestSort('balance')}><span>Balance</span></th>
                      <th style={thStyles}><span>Employer Info</span></th>
                    </tr>
                  </thead>
                  <tbody className="customerTbody">
                    {currentRecords.map((item, index) => (
                      <tr 
                        className="customerTr" 
                        key={index} 
                        style={trStyles}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
                      >
                        <td style={tdStyles} className="customerTd customerLalign">{item.customerId}</td>
                        <td style={tdStyles} className="customerTd">{item.name}</td>
                        <td style={tdStyles} className="customerTd">{item.accountNumber}</td>
                        <td style={tdStyles} className="customerTd">{item.balance}</td>
                        <td style={tdStyles} className="customerTd">
                          <button className="customerbutton" onClick={() => toggleView(item.customerId)}>
                            <span className="customerbutton-content">View Details</span>
                          </button>
                        </td>
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
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Customer;
