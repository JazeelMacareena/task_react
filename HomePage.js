import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();
  const [localStorageData, setLocalStorageData] = useState({});

  useEffect(() => {
    const data = {};

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);

      try {
        const parsedValue = JSON.parse(value);

        for (const field in parsedValue) {
          if (field !== 'password') {
            if (data[field]) {
              data[field].push({ key, value: parsedValue[field] });
            } else {
              data[field] = [{ key, value: parsedValue[field] }];
            }
          }
        }
      } catch (error) {
        console.error(`Error parsing JSON for key: ${key}`, error);
      }
    }

    setLocalStorageData(data);
  }, []);

  const handleDelete = (fieldName, key, entryIndex) => {
    return () => {
      const updatedEntries = [...localStorageData[fieldName]];
      updatedEntries.splice(entryIndex, 1);

      const RemainingEntries = updatedEntries.length > 0;

      if (RemainingEntries) {
        localStorage.setItem(key, JSON.stringify(updatedEntries.map(entry => entry.value)));
        setLocalStorageData(prevData => ({
          ...prevData,
          [fieldName]: updatedEntries
        }));
      } else {
        localStorage.removeItem(key);
        const { [fieldName]: omit, ...updatedData } = localStorageData;
        setLocalStorageData(updatedData);
      }
    };
  };

  const handleEditEntry = (fieldName, key, entryIndex) => {
    return () => {
      let newValue = prompt(`Edit ${fieldName}:`, localStorageData[fieldName][entryIndex].value);

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (fieldName === 'First Name') {
        if (!newValue.trim()) {
          alert('First name is required');
          return;
        }
      } else if (fieldName === 'Last Name') {
        if (!newValue.trim()) {
          alert('Last name is required');
          return;
        }
      } else if (fieldName === 'Email') {
        if (!newValue.trim() || !emailRegex.test(newValue)) {
          alert('Enter a valid email address');
          return;
        }
      } else if (fieldName === 'Phone Number') {
        if (!newValue.trim() || !/^\d{10}$/.test(newValue)) {
          alert('Enter a valid 10-digit phone number');
          return;
        }
      } else if (fieldName === 'Address') {
        if (!newValue.trim()) {
          alert('Address is required');
          return;
        }
      }

      if (newValue !== null) {
        newValue = newValue.trim();

        if (newValue !== '') {
          localStorageData[fieldName][entryIndex].value = newValue;
          localStorage.setItem(key, JSON.stringify(localStorageData[fieldName].map(entry => entry.value)));
          setLocalStorageData({ ...localStorageData });
        } else {
          handleDelete(fieldName, key, entryIndex)();
        }
      }
    };
  };

  return (
    <div className="container">
      <h1 className="heading">Home Page</h1>
      <button className="button"><Link to="/form">CREATE</Link></button>
      <div className="table-container">
        <h2 className="table-heading">Table of Contents</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Entries</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(localStorageData).map((fieldName, index) => {
              if (!fieldName || !Array.isArray(localStorageData[fieldName]) || localStorageData[fieldName].length === 0) {
                return null;
              }

              return (
                <tr key={index}>
                  <td>{fieldName}</td>
                  <td>
                    <ul>
                      {localStorageData[fieldName].map((entry, entryIndex) => (
                        <li key={entryIndex}>{entry.value}</li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <ul>
                      {localStorageData[fieldName].map((entry, entryIndex) => (
                        <li key={entryIndex}>
                          <button onClick={handleEditEntry(fieldName, entry.key, entryIndex)}>Edit</button>
                          <button onClick={handleDelete(fieldName, entry.key, entryIndex)}>Delete</button>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HomePage;
