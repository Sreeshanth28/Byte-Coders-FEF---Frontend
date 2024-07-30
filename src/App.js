import React from 'react'; 

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/loginForm';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Analytics from './components/Analytics';
import History from './components/History';
import MakePayment from './components/MakePayment';
import Navbar from './components/Navbar';
import DetailsForm from './components/detialsForm';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar />
        <Routes>
          <Route path="/auth" element={<LoginForm />} />
          <Route path="/details" element={<DetailsForm />} />
              {/* <Route index element={<ProtectedRoute />} /> */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/history" element={<History />} />
              <Route path="/make-payment" element={<MakePayment />} />
              <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
