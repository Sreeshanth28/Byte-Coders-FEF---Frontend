// components/Statistics.js
import React from 'react';
import '../styles/Statistics.css';

const Statistics = () => {
  return (
    <div className="custDash-statistics">
      <h3 className="custDash-statistics-title">Statistics</h3>
      <div className="custDash-statistics-header">
        <select className="custDash-statistics-period">
          <option>Monthly</option>
          <option>Yearly</option>
        </select>
      </div>
      <div className="custDash-graph">
        {/* Placeholder for the graph */}
        <div className="custDash-graph-placeholder">Graph will be implemented here</div>
      </div>
      <div className="custDash-statistics-summary">
        <div className="custDash-statistic">
          <span className="custDash-statistic-label">Average income</span>
          <span className="custDash-statistic-value">$12,325.96</span>
          <span className="custDash-statistic-change positive">+4.85%</span>
        </div>
        <div className="custDash-statistic">
          <span className="custDash-statistic-label">Average expenses</span>
          <span className="custDash-statistic-value">$8,146.96</span>
          <span className="custDash-statistic-change negative">-1.85%</span>
        </div>
      </div>
    </div>
  );
};

export default Statistics;