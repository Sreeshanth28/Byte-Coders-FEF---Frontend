import React, { useState, useMemo } from 'react';
import '../styles/customerDashboard.css';

const CustomerDashboard = () => {
  // Mock data for demonstration
  const allTransactions = [
    { id: 1, date: '1:35, 22 July 2024', method: 'MasterCard_4583', description: 'Prestige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (04 oz)', amount: 912.51, status: 'completed' },
    { id: 2, date: '2:35, 22 July 2024', method: 'PayPal', description: 'California Gold Nutrition, Vitamin C, European Quali-C, 1,000 mg, 60 Veggie Caps', amount: 2744.98, status: 'completed' },
    { id: 3, date: '1:35, 22 July 2024', method: 'MasterCard_4583', description: 'Prestige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (04 oz)', amount: 912.51, status: 'completed' },
    { id: 4, date: '1:35, 22 July 2024', method: 'MasterCard_4583', description: 'Prestige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (04 oz)', amount: 912.51, status: 'completed' },
    { id: 5, date: '1:35, 22 July 2024', method: 'MasterCard_4583', description: 'Prestige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (04 oz)', amount: 912.51, status: 'completed' },
    { id: 6, date: '1:35, 22 July 2024', method: 'MasterCard_4583', description: 'Prestige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (04 oz)', amount: 912.51, status: 'completed' },
    { id: 7, date: '1:35, 22 July 2024', method: 'MasterCard_4583', description: 'Prestige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (04 oz)', amount: 912.51, status: 'completed' },
    { id: 8, date: '1:35, 22 July 2024', method: 'MasterCard_4583', description: 'Prestige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (04 oz)', amount: 912.51, status: 'completed' },
    { id: 9, date: '1:35, 22 July 2024', method: 'MasterCard_4583', description: 'Prestige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (04 oz)', amount: 912.51, status: 'completed' },
    { id: 10, date: '1:35, 30 June 2024', method: 'MasterCard_4583', description: 'Prestige Cosmetics, Total Intensity Eyeliner Long Lasting Intense Color, Deepest Black, 1.2 g (04 oz)', amount: 912.51, status: 'completed' },
    
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [filterMethod, setFilterMethod] = useState('all');
  const [dateFilter, setDateFilter] = useState(14);


  const itemsPerPage = 8;

  const filteredAndSortedTransactions = useMemo(() => {
    const currentDate = new Date();
    const dateFilteredTransactions = allTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date.split(', ')[1]);
      const dateDifference = (currentDate - transactionDate) / (1000 * 60 * 60 * 24); // difference in days
      return dateDifference <= dateFilter;
    });
  
    return dateFilteredTransactions
      .filter(transaction => filterMethod === 'all' || transaction.method.includes(filterMethod))
      .sort((a, b) => {
        if (sortField === 'date') {
          const dateA = new Date(a.date.split(', ')[1]);
          const dateB = new Date(b.date.split(', ')[1]);
          return sortDirection === 'asc' ? dateA - dateB : dateB - dateA;
        } else {
          if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
          if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        }
      });
  }, [allTransactions, filterMethod, sortField, sortDirection, dateFilter]);
  
  const totalSpent = useMemo(() => {
    return filteredAndSortedTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  }, [filteredAndSortedTransactions]);
  

  const currentTransactions = filteredAndSortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredAndSortedTransactions.length / itemsPerPage);

  const handleSort = (field) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="custDash-dashboard">
      <h2>Transactions</h2>
      <div className="custDash-totalSpent">
        <h3>Spent: 
          <select 
            value={dateFilter} 
            onChange={(e) => setDateFilter(Number(e.target.value))}
            className="custDash-filterSelect"
          >
            <option value={14}>Last 14 days</option>
            <option value={18}>Last 18 days</option>
            <option value={28}>Last 28 days</option>
          </select>
        </h3>
        <p className="custDash-amount">${totalSpent.toFixed(2)}</p>
      </div>

      <div className="custDash-filters">
      <select 
        value={filterMethod} 
        onChange={(e) => setFilterMethod(e.target.value)}
        className="custDash-filterSelect"
      >
        <option value="all">All Methods</option>
        <option value="VISA">VISA</option>
        <option value="MasterCard">MasterCard</option>
        <option value="PayPal">PayPal</option>
      </select>
    </div>

      <div className="custDash-transactions">
        <table className="custDash-transactionTable">
          <thead>
            <tr>
              <th onClick={() => handleSort('date')}>Date {sortField === 'date' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
              <th onClick={() => handleSort('method')}>Payment method {sortField === 'method' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
              <th>Description</th>
              <th onClick={() => handleSort('amount')}>Amount {sortField === 'amount' && (sortDirection === 'asc' ? '▲' : '▼')}</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id} className={`custDash-transactionRow ${transaction.status === 'failed' ? 'custDash-failedTransaction' : ''}`}>
                <td>{transaction.date}</td>
                <td>{transaction.method}</td>
                <td>{transaction.description}</td>
                <td>${transaction.amount.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="custDash-pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CustomerDashboard;