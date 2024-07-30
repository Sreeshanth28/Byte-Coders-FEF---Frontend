import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Transactions.css';


const TransactionsPage = () => {
  const [view, setView] = useState('currentTransactions');
  const [searchQuery, setSearchQuery] = useState('');
  const [loanSearchQuery, setLoanSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [allTransactions, setAllTransactions] = useState([]);
  const transactionsPerPage = 7;

  const scrollRef = useRef(null);

  useEffect(() => {
    const bnplId = sessionStorage.getItem('bnplId');
    if (bnplId) {
      axios.get(`http://127.0.0.1:8000/gettransactiondetails/?bnplId=${bnplId}`)
        .then(response => {
          if (response.data.allTransactions) {
            setAllTransactions(response.data.allTransactions);
          }
        })
        .catch(error => {
          console.error('Error fetching transaction details:', error);
        });
    }
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const handleToggleChange = (e) => {
    setView(e.target.checked ? 'previousTransactions' : 'currentTransactions');
    setSearchQuery('');
    setLoanSearchQuery('');
    setCurrentPage(1);
  };

  const currentLoans = allTransactions.filter(transaction => 
    transaction.installments.length > 0 || transaction.salaryCuttings.length > 0
  );

  const previousLoans = allTransactions.filter(transaction => 
    transaction.installments.length === 0 && transaction.salaryCuttings.length === 0
  );

  const filteredLoans = (view === 'currentTransactions' ? currentLoans : previousLoans)
    .filter(transaction =>
      transaction.description.toLowerCase().includes(loanSearchQuery.toLowerCase()) ||
      transaction.transactionDate.toLowerCase().includes(loanSearchQuery.toLowerCase()) ||
      transaction.amount.toString().toLowerCase().includes(loanSearchQuery.toLowerCase())
    );

  const filteredTransactions = currentLoans.flatMap(transaction => [
    ...transaction.installments.map(installment => ({
      ...installment,
      type: 'Installment',
      description: transaction.description
    })),
    ...transaction.salaryCuttings.map(salaryCutting => ({
      ...salaryCutting,
      type: 'Salary cut',
      description: transaction.description
    }))
  ]).filter(item =>
    item.dueDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.amountToPay.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));  // Sort by date

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredTransactions.length / transactionsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="transactionsPage-container">
      <input id="checkbox_toggle" type="checkbox" className="check" onChange={handleToggleChange} />
      <div className="checkbox" style={{ display: 'flex', justifyContent: "center", marginBottom: "20px" }}>
        <label className="slide" htmlFor="checkbox_toggle">
          <label className="toggle" htmlFor="checkbox_toggle"></label>
          <label className="text" htmlFor="checkbox_toggle">Current</label>
          <label className="text" htmlFor="checkbox_toggle">Previous</label>
        </label>
      </div>
      <h1 className="transactionsPage-heading">Transactions Overview</h1>
      <p className="transactionsPage-tagline">Keep track of your loans and transactions easily.</p>
    
      <input
        type="text"
        className="transactionsPage-search-input-loans"
        placeholder="Search for loans..."
        value={loanSearchQuery}
        onChange={(e) => setLoanSearchQuery(e.target.value)}
        style={{ marginBottom: '20px' }}
      />

      <div className="transactionsPage-loan-cards">
        <button className="transactionsPage-scroll-btn transactionsPage-left" onClick={scrollLeft}>←</button>
        <div className="transactionsPage-cards-container" ref={scrollRef}>
          {filteredLoans.length === 0 ? (
            <div className='transactionsPage-no-loans'>No loan cards available on your query. Please search for a new query in the above search bar. 🙅</div>
          ) : (
            filteredLoans.map((loan) => (
              <div key={loan.transactionId} className="transactionsPage-card">
                <div className="transactionsPage-card-inner">
                  <div className="transactionsPage-first-content">
                    <span>{loan.description}</span>
                  </div>
                  <div className="transactionsPage-second-content">
                    <span>
                      Date: {loan.transactionDate} <br />
                      Amount: {loan.amount} <br />
                      Outstanding: {loan.amountLeft} <br />
                      Salary Cut: {loan.salaryCut}% <br />
                      Personal Pay Left: {loan.personalPayLeft} <br />
                      Salary Pay Cut Left: {loan.salaryPayCutLeft} <br />
                      Card: {loan.cardNumber}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <button className="transactionsPage-scroll-btn transactionsPage-right" onClick={scrollRight}>→</button>
      </div>

      {view === 'currentTransactions' && (
        <>
          <h2 className="transactionsPage-heading" style={{ marginTop: '100px' }}>All Upcoming Due's</h2>
          <input
            type="text"
            className="transactionsPage-search-input"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="transactionsPage-transactions-list">
            <ul className="transactionsPage-transaction-list">
              {currentTransactions.map((transaction) => (
                <li key={transaction.installmentId} className="transactionsPage-transaction-item">
                  <div className="transactionsPage-transaction-icon">
                    <span>{transaction.description[0]}</span>
                  </div>
                  <div className="transactionsPage-transaction-details">
                    <span className="transactionsPage-transaction-name">
                      {transaction.type} for {transaction.description}
                    </span>
                    <span className="transactionsPage-transaction-date">{transaction.dueDate}</span>
                  </div>
                  <span className="transactionsPage-transaction-amount">{transaction.amountToPay}</span>
                </li>
              ))}
            </ul>
            <div className="transactionsPage-pagination">
              <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage}</span>
              <button onClick={handleNextPage} disabled={currentPage === Math.ceil(filteredTransactions.length / transactionsPerPage)}>Next</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TransactionsPage;