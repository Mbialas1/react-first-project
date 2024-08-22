import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployee.css';

const FIELD_FIRST_NAME = 'FirstName';
const FIELD_SURNAME = 'LastName';
const FIELD_EMAIL = 'Email';
const FIELD_PHONE = 'PhoneNumber';

function AddEmployee() {
  const fieldConfig = {
    [FIELD_FIRST_NAME]: 'Imię',
    [FIELD_SURNAME]: 'Nazwisko',
    [FIELD_EMAIL]: 'Email',
    [FIELD_PHONE]: 'Numer telefonu'
  };

  const [formData, setFormData] = useState({
    [FIELD_FIRST_NAME]: '',
    [FIELD_SURNAME]: '',
    ContactInfo: {
      [FIELD_EMAIL]: '',
      [FIELD_PHONE]: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === FIELD_PHONE || name === FIELD_EMAIL) {
      setFormData(prevData => ({
        ...prevData,
        ContactInfo: {
          ...prevData.ContactInfo,
          [name]: name === FIELD_PHONE ? formatPhoneNumber(value) : value
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const formatPhoneNumber = (value) => {
    const cleaned = ('' + value).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return `${match[1]}${match[2] ? '-' : ''}${match[2]}${match[3] ? '-' : ''}${match[3]}`;
    }
    return value;
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        newErrors[key] = `${fieldConfig[key]} jest wymagane`;
      }
    });
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData[FIELD_EMAIL] && !emailRegex.test(formData[FIELD_EMAIL])) {
      newErrors[FIELD_EMAIL] = 'Nieprawidłowy format emaila';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      console.info("Body: ", formData);
      const result = await axios.post('https://localhost:7142/Employee/CreateNewUser', formData);
      setResponse(result.data);
    } catch (error) {
      console.error('Error:', error);
  
      if (error.response) {
        const errorMessage = error.response.data || 'Wystąpił błąd';
        setResponse(`Błąd ${error.response.status}: ${errorMessage}`);
      } else if (error.request) {
        setResponse('Brak odpowiedzi od serwera');
      } else {
        setResponse('Wystąpił błąd podczas wysyłania żądania');
      }
    }
  };

  return (
    <div>
      <h1>Dodaj Pracownika</h1>
      <form onSubmit={handleSubmit}>
        {Object.keys(fieldConfig).map((key) => (
          <div key={key}>
          <input
            key={key}
            type="text"
            name={key}
            value={formData[key]}
            onChange={handleChange}
            placeholder={fieldConfig[key]}
            maxLength={key === FIELD_PHONE ? '11' : '100'}
          />
          {errors[key] && <span className="error">{errors[key]}</span>}
          </div>
        ))}
        <button type="submit">Dodaj</button>
      </form>
      <div className="response">
        {response ? <pre>{JSON.stringify(response, null, 2)}</pre> : ''}
      </div>
    </div>
  );
}

export default AddEmployee;
