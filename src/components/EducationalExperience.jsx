import React, { useState } from 'react';
import '../styles/EducationalExperience.css';

const EducationalExperience = ({ education, setEducation }) => {
  const [newEducation, setNewEducation] = useState({
    schoolName: '',
    titleOfStudy: '',
    dateOfStudy: '',
    location: '',
    description: '',
  });
  const [errors, setErrors] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEducation((prevEducation) => ({
      ...prevEducation,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let errorMsg = '';

    switch (name) {
      case 'schoolName':
        if (!value.trim()) {
          errorMsg = 'School name is required';
        }
        break;
      case 'titleOfStudy':
        if (!value.trim()) {
          errorMsg = 'Title of study is required';
        }
        break;
      case 'dateOfStudy':
        if (!value.trim()) {
          errorMsg = 'Date of study is required';
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
    const isValid = Object.values(newEducation).every((value) => value.trim()) && Object.values(errors).every((error) => !error);
    if (!isValid) {
      return;
    }

    if (editMode) {
      setEducation((prevEducation) => {
        const updatedEducation = [...prevEducation];
        updatedEducation[editIndex] = newEducation;
        return updatedEducation;
      });
      setEditMode(false);
      setEditIndex(null);
    } else {
      setEducation((prevEducation) => [...prevEducation, newEducation]);
    }

    setNewEducation({
      schoolName: '',
      titleOfStudy: '',
      dateOfStudy: '',
      location: '',
      description: '',
    });
  };

  const handleEdit = (index) => {
    setEditMode(true);
    setEditIndex(index);
    setNewEducation(education[index]);
  };

  const handleDelete = (index) => {
    setEducation((prevEducation) => prevEducation.filter((_, i) => i !== index));
  };

  return (
    <div className="education">
      <h2>Educational Experience</h2>
      <div className="input-section">
        <input
          type="text"
          name="schoolName"
          placeholder="School Name"
          value={newEducation.schoolName}
          onChange={handleChange}
        />
        {errors.schoolName && <p className="error">{errors.schoolName}</p>}
        <input
          type="text"
          name="titleOfStudy"
          placeholder="Title of Study"
          value={newEducation.titleOfStudy}
          onChange={handleChange}
        />
        {errors.titleOfStudy && <p className="error">{errors.titleOfStudy}</p>}
        <input
          type="text"
          name="dateOfStudy"
          placeholder="Date of Study"
          value={newEducation.dateOfStudy}
          onChange={handleChange}
        />
        {errors.dateOfStudy && <p className="error">{errors.dateOfStudy}</p>}
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newEducation.location}
          onChange={handleChange}
        />
        {errors.location && <p className="error">{errors.location}</p>}
        <textarea
          name="description"
          placeholder="Description"
          value={newEducation.description}
          onChange={handleChange}
        ></textarea>
        {errors.description && <p className="error">{errors.description}</p>}
        <div className="entry-actions">
          <button onClick={handleSave}>{editMode ? 'Update' : 'Save'}</button>
        </div>
      </div>
      <div className="existing-entries">
        {education.map((item, index) => (
          <div key={index} className="education-item">
            <div>
              <p>School: {item.schoolName}</p>
              <p>Title of Study: {item.titleOfStudy}</p>
              <p>Date of Study: {item.dateOfStudy}</p>
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

export default EducationalExperience;
