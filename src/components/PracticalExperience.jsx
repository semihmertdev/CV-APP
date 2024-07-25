import React, { useState } from 'react';
import '../styles/PracticalExperience.css';

const PracticalExperience = ({ experience, setExperience }) => {
  const [newExperience, setNewExperience] = useState({
    companyName: '',
    positionTitle: '',
    mainTasks: '',
    dateFrom: '',
    dateUntil: '',
    location: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewExperience((prevExperience) => ({
      ...prevExperience,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = '';

    switch (name) {
      case 'companyName':
        if (!value.trim()) {
          errorMsg = 'Company name is required';
        }
        break;
      case 'positionTitle':
        if (!value.trim()) {
          errorMsg = 'Position title is required';
        }
        break;
      case 'mainTasks':
        if (!value.trim()) {
          errorMsg = 'Main tasks are required';
        }
        break;
      case 'dateFrom':
        if (!value.trim()) {
          errorMsg = 'Date from is required';
        }
        break;
      case 'dateUntil':
        if (!value.trim()) {
          errorMsg = 'Date until is required';
        }
        break;
      case 'location':
        if (!value.trim()) {
          errorMsg = 'Location is required';
        }
        break;
      case 'description':
        if (!value.trim()) {
          errorMsg = 'Description is required';
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

  const handleSave = () => {
    const isValid = Object.values(newExperience).every((value) => value.trim()) && Object.values(errors).every((error) => !error);
    if (!isValid) {
      return;
    }

    if (editMode) {
      setExperience((prevExperience) => {
        const updatedExperience = [...prevExperience];
        updatedExperience[editIndex] = newExperience;
        return updatedExperience;
      });
      setEditMode(false);
      setEditIndex(null);
    } else {
      setExperience((prevExperience) => [...prevExperience, newExperience]);
    }

    setNewExperience({
      companyName: '',
      positionTitle: '',
      mainTasks: '',
      dateFrom: '',
      dateUntil: '',
      location: '',
      description: '',
    });
  };

  const handleEdit = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setNewExperience(experience[index]);
  };

  const handleDelete = (index) => {
    setExperience((prevExperience) => prevExperience.filter((_, i) => i !== index));
  };

  return (
    <div className="practical-experience">
      <h2>Practical Experience</h2>
      <div className="input-section">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={newExperience.companyName}
          onChange={handleChange}
        />
        {errors.companyName && <p className="error">{errors.companyName}</p>}
        <input
          type="text"
          name="positionTitle"
          placeholder="Position Title"
          value={newExperience.positionTitle}
          onChange={handleChange}
        />
        {errors.positionTitle && <p className="error">{errors.positionTitle}</p>}
        <input
          type="text"
          name="mainTasks"
          placeholder="Main Tasks"
          value={newExperience.mainTasks}
          onChange={handleChange}
        />
        {errors.mainTasks && <p className="error">{errors.mainTasks}</p>}
        <input
          type="text"
          name="dateFrom"
          placeholder="Date From"
          value={newExperience.dateFrom}
          onChange={handleChange}
        />
        {errors.dateFrom && <p className="error">{errors.dateFrom}</p>}
        <input
          type="text"
          name="dateUntil"
          placeholder="Date Until"
          value={newExperience.dateUntil}
          onChange={handleChange}
        />
        {errors.dateUntil && <p className="error">{errors.dateUntil}</p>}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newExperience.location}
          onChange={handleChange}
        />
        {errors.location && <p className="error">{errors.location}</p>}
        <textarea
          name="description"
          placeholder="Description"
          value={newExperience.description}
          onChange={handleChange}
        ></textarea>
        {errors.description && <p className="error">{errors.description}</p>}
        <div className="entry-actions">
          <button onClick={handleSave}>{editMode ? 'Update' : 'Save'}</button>
        </div>
      </div>
      <div className="existing-entries">
        {experience.map((item, index) => (
          <div key={index} className="experience-item">
            <div>
              <p>Company: {item.companyName}</p>
              <p>Position: {item.positionTitle}</p>
              <p>Tasks: {item.mainTasks}</p>
              <p>From: {item.dateFrom}</p>
              <p>Until: {item.dateUntil}</p>
              <p>Location: {item.location}</p>
              <p>Description: {item.description}</p>
            </div>
            <div className="entry-actions">
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PracticalExperience;
