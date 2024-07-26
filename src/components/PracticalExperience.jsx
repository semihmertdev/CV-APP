import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons
import '../styles/PracticalExperience.css';

const PracticalExperience = ({ experience, setExperience }) => {
  const [exp, setExp] = useState({
    position: '',
    company: '',
    country: '',
    startDate: '',
    endDate: '',
    description: '',
  });

  const [editingIndex, setEditingIndex] = useState(null);
  const [showExperience, setShowExperience] = useState(false);
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
      let formattedValue = value.replace(/[^0-9]/g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 6);
      }

      setExp({ ...exp, [name]: formattedValue });

      const [month, year] = formattedValue.split('/');
      if (month && (month < 1 || month > 12)) {
        setErrors({ ...errors, [name]: 'Month must be between 01 and 12' });
      } else if (year && (year.length !== 4 || isNaN(year))) {
        setErrors({ ...errors, [name]: 'Year must be a four-digit number' });
      } else {
        setErrors({ ...errors, [name]: '' });
      }
    } else {
      setExp({ ...exp, [name]: value });
    }
  };

  const handleAddOrUpdateExp = () => {
    if (
      exp.position &&
      exp.company &&
      exp.country &&
      exp.startDate &&
      exp.endDate &&
      !errors.startDate &&
      !errors.endDate
    ) {
      if (editingIndex !== null) {
        const updatedExperience = [...experience];
        updatedExperience[editingIndex] = exp;
        setExperience(updatedExperience);
        setEditingIndex(null);
      } else {
        setExperience([...experience, exp]);
      }
      setExp({
        position: '',
        company: '',
        country: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    }
  };

  const handleEdit = (index) => {
    setExp(experience[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newExperience = experience.filter((_, i) => i !== index);
    setExperience(newExperience);
    if (editingIndex === index) {
      setEditingIndex(null);
      setExp({
        position: '',
        company: '',
        country: '',
        startDate: '',
        endDate: '',
        description: '',
      });
    }
  };

  return (
    <div className="practical-experience">
      <form>
        <label>
          Position:
          <input
            type="text"
            name="position"
            value={exp.position}
            onChange={handleChange}
            placeholder="Enter position"
          />
        </label>
        <label>
          Company:
          <input
            type="text"
            name="company"
            value={exp.company}
            onChange={handleChange}
            placeholder="Enter company"
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={exp.country}
            onChange={handleChange}
            placeholder="Enter country"
          />
        </label>

        <label>
          Start Date (MM/YYYY):
          <input
            type="text"
            name="startDate"
            value={exp.startDate}
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
            value={exp.endDate}
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
            value={exp.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </label>
        <div className="buttons">
          <button type="button" onClick={handleAddOrUpdateExp}>
            {editingIndex !== null ? 'Update Experience' : 'Add Experience'}
          </button>
          <button type="button" onClick={() => setShowExperience(!showExperience)}>
            {showExperience ? 'Hide Experience' : 'Show Experience'}
          </button>
        </div>
      </form>
      {showExperience && (
        <div className="experience-list">
          {experience.map((exp, index) => (
            <div key={index} className="experience-entry">
              <div className="entry-content">
                <p><strong>Position:</strong> {exp.position}</p>
                <p><strong>Company:</strong> {exp.company}</p>
                <p><strong>Country:</strong> {exp.country}</p>
                <p><strong>Start Date:</strong> {formatDate(exp.startDate)}</p>
                <p><strong>End Date:</strong> {formatDate(exp.endDate)}</p>
                <p><strong>Description:</strong> {exp.description}</p>
              </div>
              <div className="entry-buttons">
                <button onClick={() => handleEdit(index)}><FaEdit /></button>
                <button onClick={() => handleDelete(index)}><FaTrash /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PracticalExperience;
