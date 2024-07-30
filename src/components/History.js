import React, { useState, useEffect } from 'react';
import "../styles/History.css"

const parseDate = (dateString) => {
  const months = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };
  const [month, day, year] = dateString.split(' ');
  return new Date(year, months[month], parseInt(day));
};

const BNPLHistoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchTransactions = async () => {
      const bnplId = sessionStorage.getItem('bnplId');
      try {
        const response = await fetch(`http://127.0.0.1:8000/getcustomerhistory/?bnplId=${bnplId}`);
        const data = await response.json();
        if (data.success === "yes" && data.transactionHistory && data.transactionHistory.history) {
          const sortedTransactions = data.transactionHistory.history.sort((a, b) => {
            const dateA = parseDate(getDisplayDate(a));
            const dateB = parseDate(getDisplayDate(b));
            return dateB - dateA; // Sort in descending order (most recent first)
          });
          setTransactions(sortedTransactions);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };
    fetchTransactions();
  }, []);

  const getStatusClass = (message) => {
    switch (message) {
      case 'Success':
        return 'status-success';
      case 'Salary cut miss':
        return 'status-warning';
      case 'Interest':
        return 'status-danger';
      case 'Salary cut success':
        return 'status-info';
      default:
        return 'status-default';
    }
  };

  const filteredTransactions = transactions.filter(transaction =>
    (transaction.description?.toLowerCase().includes(searchQuery.toLowerCase()) || '') ||
    (transaction.amountToPay?.includes(searchQuery) || '') ||
    (transaction.message?.toLowerCase().includes(searchQuery.toLowerCase()) || '')
  );

  const pageCount = Math.ceil(filteredTransactions.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const getDisplayDate = (transaction) => {
    return transaction.paymentDate || transaction.date || transaction.dateOfCut || transaction.dueDate || 'N/A';
  };

  const getDisplayName = (transaction) => {
    console.log("Transaction:", transaction); 
    return transaction.description || transaction.name || 'Unknown';
  };

  const getDisplayAmount = (transaction) => {
    if (transaction.message === "Interest") {
      return parseFloat(transaction.interest || '0').toFixed(2);
    }
    return parseFloat(transaction.amountToPay || '0').toFixed(2);
  };

  return (
    <div className="bnplHist-container">
      <h2 className="bnplHist-heading" style={{ marginTop: '100px' }}>BNPL Payment History</h2>
      <input
        type="text"
        className="bnplHist-search-input"
        placeholder="Search transactions..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="bnplHist-transactions-list">
        <ul className="bnplHist-transaction-list">
          {currentItems.map((transaction, index) => (
          <li key={index} className="bnplHist-transaction-item">
            <div className="bnplHist-transaction-icon">
              <span>{getDisplayName(transaction)[0]}</span>
            </div>
            <div className="bnplHist-transaction-details">
              <span className="bnplHist-transaction-name">{getDisplayName(transaction)}</span>
              <span className="bnplHist-transaction-date">{getDisplayDate(transaction)}</span>
            </div>
            <span className="bnplHist-transaction-amount">
              ${getDisplayAmount(transaction)}
            </span>
            <span 
              className={`bnplHist-transaction-status ${getStatusClass(transaction.message)}`}
            >
              {transaction.message || 'N/A'}
            </span>
          </li>
        ))}
        </ul>
      </div>
      <div className="bnplHist-pagination">
        {Array.from({ length: pageCount }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`bnplHist-pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BNPLHistoryPage;
