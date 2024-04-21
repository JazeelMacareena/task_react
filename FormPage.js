import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FormPage.css';

function FormPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const initialFormData = location.state ? location.state.formData : {
    firstName: '',
    lastName: '',
    email: '', 
    password: '',
    phoneNumber: '',
    address: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const specialChars = /[!@#$%^&*(),.?":{}|<>]/;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: ''
    };

    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }
    if (!formData.password.trim() || formData.password.length < 6 || !specialChars.test(formData.password)) {
      newErrors.password = 'Password must be at least 6 characters long and contain a special character';
      isValid = false;
    }
    if (!formData.phoneNumber.trim() || !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Enter a valid 10-digit phone number';
      isValid = false;
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      isValid = false;
    }

    if (!isValid) {
      setErrors(newErrors);
      return;
    }

    setErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: ''
    });

    const entryKey = Date.now().toString();

    localStorage.setItem(entryKey, JSON.stringify(formData));

    navigate('/summary', { state: { formData } });
  };

  const handleCancel = () => {
    navigate('/');
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (!value.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  return (
    <div className="container">
      <h1>Create Form</h1>
      <div className="input-container">
        <div>
          <label htmlFor="firstName" className="label">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input"
          />
          {errors.firstName && <div className="-error">{errors.firstName}</div>}
        </div>
        <div>
          <label htmlFor="lastName" className="label">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input"
          />
          {errors.lastName && <div className="error">{errors.lastName}</div>}
        </div>
        <div>
          <label htmlFor="email" className="label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input"
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div>
          <label htmlFor="password" className="label">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input"
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>
        <div>
          <label htmlFor="phoneNumber" className="label">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input"
          />
          {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
        </div>
        <div>
          <label htmlFor="address" className="label">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            onBlur={handleBlur}
            className="input"
          />
          {errors.address && <div className="error">{errors.address}</div>}
        </div>
      </div>
      <button onClick={handleSubmit} className="button">Submit</button>
      <button onClick={handleCancel} className="button">Cancel</button>
    </div>
  );
}

export default FormPage;
