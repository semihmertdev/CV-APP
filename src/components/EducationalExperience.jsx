import React, { useState } from 'react';
import '../styles/EducationalExperience.css';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const EducationalExperience = ({ education, setEducation }) => {
  const [edu, setEdu] = useState({
    degree: '',
    institution: '',
    country: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [showEducation, setShowEducation] = useState(false);
  const [errors, setErrors] = useState({
    startDate: '',
    endDate: '',
  });

  const months = [
    { value: '01', label: 'January' }, { value: '02', label: 'February' },
    { value: '03', label: 'March' }, { value: '04', label: 'April' },
    { value: '05', label: 'May' }, { value: '06', label: 'June' },
    { value: '07', label: 'July' }, { value: '08', label: 'August' },
    { value: '09', label: 'September' }, { value: '10', label: 'October' },
    { value: '11', label: 'November' }, { value: '12', label: 'December' }
  ];

  const formatDate = (date) => {
    if (!date) return '';
    const [month, year] = date.split('/');
    const monthName = months.find(m => m.value === month)?.label || '';
    return `${monthName} ${year}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'startDate' || name === 'endDate') {
      // Remove non-numeric characters and handle automatic insertion of '/'
      let formattedValue = value.replace(/[^0-9]/g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 6);
      }

      setEdu({ ...edu, [name]: formattedValue });

      // Validate month and year
      const [month, year] = formattedValue.split('/');
      if (month && (month < 1 || month > 12)) {
        setErrors({ ...errors, [name]: 'Month must be between 01 and 12' });
      } else if (year && (year.length !== 4 || isNaN(year))) {
        setErrors({ ...errors, [name]: 'Year must be a four-digit number' });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    } else {
      setEdu({ ...edu, [name]: value });
    }
  };

  const handleAddOrUpdateEdu = () => {
    if (
      edu.degree &&
      edu.institution &&
      edu.country &&
      edu.startDate &&
      edu.endDate &&
      !errors.startDate &&
      !errors.endDate
    ) {
      if (editingIndex !== null) {
        const updatedEducation = [...education];
        updatedEducation[editingIndex] = edu;
        setEducation(updatedEducation);
        setEditingIndex(null);
      } else {
        setEducation([...education, edu]);
      }
      setEdu({
        degree: '',
        institution: '',
        country: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    }
  };

  const handleEdit = (index) => {
    setEdu(education[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newEducation = education.filter((_, i) => i !== index);
    setEducation(newEducation);
    if (editingIndex === index) {
      setEditingIndex(null);
      setEdu({
        degree: '',
        institution: '',
        country: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    }
  };

  return (
    <div className="educational-experience">
      <form>
        <label>
          Degree:
          <input
            type="text"
            name="degree"
            value={edu.degree}
            onChange={handleChange}
            placeholder="Enter degree"
          />
        </label>
        <label>
          Institution:
          <input
            type="text"
            name="institution"
            value={edu.institution}
            onChange={handleChange}
            placeholder="Enter institution"
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={edu.country}
            onChange={handleChange}
            placeholder="Enter country"
          />
        </label>

        <label>
          Start Date (MM/YYYY):
          <input
            type="text"
            name="startDate"
            value={edu.startDate}
            onChange={handleChange}
            placeholder="MM/YYYY"
            maxLength="7"
          />
          {errors.startDate && <p className="error">{errors.startDate}</p>}
        </label>

        <label>
          End Date (MM/YYYY):
          <input
            type="text"
            name="endDate"
            value={edu.endDate}
            onChange={handleChange}
            placeholder="MM/YYYY"
            maxLength="7"
          />
          {errors.endDate && <p className="error">{errors.endDate}</p>}
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={edu.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </label>
        <div className="buttons">
          <button type="button" onClick={handleAddOrUpdateEdu}>
            {editingIndex !== null ? 'Update Education' : 'Add Education'}
          </button>
          <button type="button" onClick={() => setShowEducation(!showEducation)}>
            {showEducation ? 'Hide Education' : 'Show Education'}
          </button>
        </div>
      </form>
      {showEducation && (
        <div className="education-list">
          {education.map((edu, index) => (
            <div key={index} className="education-entry">
              <div className="entry-content">
                <p><strong>Degree:</strong> {edu.degree}</p>
                <p><strong>Institution:</strong> {edu.institution}</p>
                <p><strong>Country:</strong> {edu.country}</p>
                <p><strong>Start Date:</strong> {formatDate(edu.startDate)}</p>
                <p><strong>End Date:</strong> {formatDate(edu.endDate)}</p>
                <p><strong>Description:</strong> {edu.description}</p>
              </div>
              <div className="entry-buttons">
                <button onClick={() => handleEdit(index)}><FaEdit /></button>
                <button onClick={() => handleDelete(index)}><FaTrashAlt /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationalExperience;
