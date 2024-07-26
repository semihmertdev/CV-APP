import React from 'react';
import { FaLinkedin, FaGithub, FaGlobe, FaEnvelope, FaPhone, FaHome } from 'react-icons/fa';
import '../styles/CVPreview.css';

const CVPreview = ({ generalInfo, education, experience, courses, skills }) => {
  // Updated formatDate function for MM/YYYY format
  const formatDate = (date) => {
    if (!date) return '';
    const [month, year] = date.split('/');
    if (month && year) {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const monthIndex = parseInt(month, 10) - 1;
      if (monthIndex >= 0 && monthIndex < 12) {
        const monthName = monthNames[monthIndex];
        return `${monthName} ${year}`;
      }
    }
    return '';
  };

  return (
    <div className="cv-preview">
      {generalInfo.name || generalInfo.title ? (
        <div className="cv-section">
          <div className="general-info-container">
            {generalInfo.name && (
              <div className="general-info-item">
                <p className="general-info-name">{generalInfo.name}</p>
              </div>
            )}
            {generalInfo.title && (
              <div className="general-info-item">
                <p className="general-info-title">{generalInfo.title}</p>
              </div>
            )}
          </div>
          <div className="icon-section">
            {generalInfo.email && (
              <div className="icon-text">
                <FaEnvelope />
                <p>{generalInfo.email}</p>
              </div>
            )}
            {generalInfo.phone && (
              <div className="icon-text">
                <FaPhone />
                <p>{generalInfo.phone}</p>
              </div>
            )}
            {generalInfo.address && (
              <div className="icon-text">
                <FaHome />
                <p>{generalInfo.address}</p>
              </div>
            )}
            {generalInfo.links && generalInfo.links.length > 0 && (
              <div className="cv-section">
                {generalInfo.links.map((link, index) => (
                  <div key={index} className="cv-link">
                    {link.type === 'linkedin' && <FaLinkedin />}
                    {link.type === 'github' && <FaGithub />}
                    {link.type === 'website' && <FaGlobe />}
                    {link.type === 'other' && <FaGlobe />}
                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                      {link.url}
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}

      {education && education.length > 0 && (
        <div className="cv-section">
          <h3>Educational Experience</h3>
          {education.map((edu, index) => (
            <div key={index} className="cv-entry">
              <div className="cv-entry-details">
                <div className="education-1">
                <div className="cv-entry-field">
                  <p className="degree">{edu.degree}</p>
                </div>
                <div className="cv-entry-field">
                 <p className="institution">{edu.institution}</p> 
                </div>
                <div className="cv-entry-field">
                 <p className="description">{edu.description}</p>
                </div>
                </div>
                <div className="education-2">
                <div className="cv-entry-field">
                {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </div>
                <div className="cv-entry-field">
                <p className="country">{edu.country}</p>
                </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {experience && experience.length > 0 && (
        <div className="cv-section">
          <h3>Practical Experience</h3>
          {experience.map((exp, index) => (
            <div key={index} className="cv-entry">
              <div className="cv-entry-details">
                <div className="professional-1">
                <div className="cv-entry-field">
                  <p className="company">{exp.company}</p> 
                </div>
                <div className="cv-entry-field">
                  <p className="position">{exp.position}</p>
                </div>
                <div className="cv-entry-field">
                  <p className="description">{exp.description}</p>
                </div>
                </div>
                <div className="professional-2">
                <div className="cv-entry-field">
                  <p className="dates">{formatDate(exp.startDate)} - {formatDate(exp.endDate)}</p>
                </div>
                <div className="cv-entry-field">
                  <p className="country">{exp.country}</p>
                </div>
              </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {courses && courses.length > 0 && (
        <div className="cv-section">
          <h3>Courses and Certificates</h3>
          {courses.map((course, index) => (
            <div key={index} className="cv-entry">
              <div className="cv-entry-details">
                <div className="cours-cert-1">
                  <div className="cv-entry-field">
                    <p className="title">{course.title}</p>
                  </div>
                <div className="cv-entry-field">
                 <p className="institution">{course.institution}</p>
                </div>
                </div>
                <div className="cv-entry-field">
                  <p className="date">{formatDate(course.date)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {skills && skills.length > 0 && (
        <div className="cv-section">
          <h3>Skills</h3>
          <ul>
            {skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CVPreview;
