import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import necessary components from react-router-dom
import LandingPage from './Landing.js'; // Import the LandingPage component
import EmployeeHomePage from './empHome.js'; // Import the HomePage component
import CustomerHomepage from './customerHome'; // Import the HomePage component
import CustomerMenu from './Menu.js'; 
import store from './store';
import {Provider} from 'react-redux';
import CustomerProfile from './CustomerProfile';
import EmployeeProfile from './EmpProfile';

function App() {
  return (
    <div className="App">
      
      <Router>

        <Routes>
      
          <Route path="/" element={<LandingPage />} /> 
          <Route path="/emp-home" element={<EmployeeHomePage/>} /> 
          <Route path="/customer-home" element={<CustomerHomepage/>} /> 
          <Route path="/customer-profile" element={<CustomerProfile/>} /> 
          <Route path="/emp-profile" element={<EmployeeProfile/>} /> 
          <Route path="/customer-menu" element={<Provider store={store}><CustomerMenu/></Provider>} /> 
          {/* <Route path="/home" element={<HomePage />} /> 
          <Route path="/create-auction" element={<CreateAuction />} /> 
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/browse" element={<Browse />} /> 
          <Route path="/auction" element={<Auction/>} />  */}
      
        </Routes>
      
      </Router>
    
    </div>
  );
}

export default App;
