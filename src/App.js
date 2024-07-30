import logo from './logo.svg';
import './App.css';
import './components/Customer'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './components/Customerdashboard'
// import Customerdashboard from './components/Customerdashboard';
import Customer from './components/Customer';
import TransactionsComponent from './components/TransactionsComponent';
import PaymentCardForm from './components/PaymentCard';
import OtpForm from './components/OtpPage';
import OtpSuccessPage from './components/OtpSuccessPage';
import EcommerceFrontPage from './components/EcommerceFrontPage';
function App() {
  return (
    <div className="App">
      {/* <TransactionsComponent /> */}
      {/* <Customerdashboard /> */}
      {/* <PaymentCardForm /> */}
      {/* <OtpForm /> */}
      {/* <OtpSuccessPage /> */}
      <BrowserRouter>

        <Routes>
          <Route path="/" element={ <Customer />}/>
          <Route path='/payment' element={<PaymentCardForm />} />
          <Route path="/home" element={<EcommerceFrontPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
