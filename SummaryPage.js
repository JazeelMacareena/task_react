import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SummaryPage.css';

function SummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state && location.state.formData;

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = () => {
    if (formData) {
      localStorage.setItem('firstName', formData.firstName);
      localStorage.setItem('lastName', formData.lastName);
      localStorage.setItem('email', formData.email);
      localStorage.setItem('password', formData.password);
      localStorage.setItem('phoneNumber', formData.phoneNumber);
      localStorage.setItem('address', formData.address);
    }

    navigate('/');
  };

  const handleGoBackToForm = () => {
    navigate('/form', { state: { formData } });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <h1>Summary Page</h1>
      <div className="summary-container">
        <h2>Summary</h2>
        <ul>
          <li>First Name: {formData ? formData.firstName : ''}</li>
          <li>Last Name: {formData ? formData.lastName : ''}</li>
          <li>Email: {formData ? formData.email : ''}</li>
          <li>
            Password: {formData && formData.password ? (showPassword ? formData.password : '*'.repeat(formData.password.length)) : ''}
            {formData && formData.password && <button onClick={togglePasswordVisibility}>{showPassword ? 'Hide' : 'Show'}</button>}
          </li>
          <li>Phone Number: {formData ? formData.phoneNumber : ''}</li>
          <li>Address: {formData ? formData.address : ''}</li>
        </ul>
      </div>
      <button onClick={handleSubmit} className="button">Submit</button>
      <button onClick={handleGoBackToForm} className="button">Go Back to Form Page</button>
    </div>
  );
}

export default SummaryPage;
