import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons
import '../styles/CoursesAndCertificates.css';

const CoursesAndCertificates = ({ courses, setCourses }) => {
  const [course, setCourse] = useState({ title: '', institution: '', date: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [showCourses, setShowCourses] = useState(false);
  const [errors, setErrors] = useState({ date: '' });

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

    if (name === 'date') {
      // Remove non-numeric characters and handle automatic insertion of '/'
      let formattedValue = value.replace(/[^0-9]/g, '');
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 6);
      }

      setCourse({ ...course, [name]: formattedValue });

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
      setCourse({ ...course, [name]: value });
    }
  };

  const handleAddOrUpdateCourse = () => {
    if (
      course.title &&
      course.institution &&
      course.date &&
      !errors.date
    ) {
      if (editingIndex !== null) {
        const updatedCourses = [...courses];
        updatedCourses[editingIndex] = course;
        setCourses(updatedCourses);
        setEditingIndex(null);
      } else {
        setCourses([...courses, course]);
      }
      setCourse({ title: '', institution: '', date: '' });
    }
  };

  const handleEdit = (index) => {
    setCourse(courses[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
    if (editingIndex === index) {
      setEditingIndex(null);
      setCourse({ title: '', institution: '', date: '' });
    }
  };

  return (
    <div className="courses-and-certificates">
      <form>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            placeholder="Enter course title"
          />
        </label>
        <label>
          Institution:
          <input
            type="text"
            name="institution"
            value={course.institution}
            onChange={handleChange}
            placeholder="Enter institution"
          />
        </label>
        <label>
          Date (MM/YYYY):
          <input
            type="text"
            name="date"
            value={course.date}
            onChange={handleChange}
            placeholder="MM/YYYY"
            maxLength="7"
          />
          {errors.date && <p className="error">{errors.date}</p>}
        </label>
        <div className="buttons">
          <button type="button" onClick={handleAddOrUpdateCourse}>
            {editingIndex !== null ? 'Update Course' : 'Add Course'}
          </button>
          <button type="button" onClick={() => setShowCourses(!showCourses)}>
            {showCourses ? 'Hide Courses' : 'Show Courses'}
          </button>
        </div>
      </form>
      {showCourses && (
        <div className="course-list">
          {courses.map((course, index) => (
            <div key={index} className="course-entry">
              <p><strong>Title:</strong> {course.title}</p>
              <p><strong>Institution:</strong> {course.institution}</p>
              <p><strong>Date:</strong> {formatDate(course.date)}</p>
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

export default CoursesAndCertificates;
