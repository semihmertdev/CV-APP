import React, { useState } from 'react';
import '../styles/GeneralInfo.css';

const GeneralInfo = ({ generalInfo, setGeneralInfo }) => {
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGeneralInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          errorMsg = 'Name is required';
        }
        break;
      case 'email':
        if (!value.trim()) {
          errorMsg = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          errorMsg = 'Email is invalid';
        }
        break;
      case 'phone':
        if (!value.trim()) {
          errorMsg = 'Phone is required';
        } else if (!/^\d{10}$/.test(value)) {
          errorMsg = 'Phone is invalid (must be 10 digits)';
        }
        break;
      case 'address':
        if (!value.trim()) {
          errorMsg = 'Address is required';
        }
        break;
      case 'linkedin':
        if (value && !/^https:\/\/www.linkedin.com\/.*$/.test(value)) {
          errorMsg = 'LinkedIn URL is invalid';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  return (
    <div className="general-info">
      <h2>General Information</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={generalInfo.name}
        onChange={handleChange}
      />
      {errors.name && <p className="error">{errors.name}</p>}
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={generalInfo.email}
        onChange={handleChange}
      />
      {errors.email && <p className="error">{errors.email}</p>}
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={generalInfo.phone}
        onChange={handleChange}
      />
      {errors.phone && <p className="error">{errors.phone}</p>}
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={generalInfo.address}
        onChange={handleChange}
      />
      {errors.address && <p className="error">{errors.address}</p>}
      <input
        type="text"
        name="linkedin"
        placeholder="LinkedIn Profile"
        value={generalInfo.linkedin}
        onChange={handleChange}
      />
      {errors.linkedin && <p className="error">{errors.linkedin}</p>}
    </div>
  );
};

export default GeneralInfo;
