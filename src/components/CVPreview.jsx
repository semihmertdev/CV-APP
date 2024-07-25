import React from 'react';
import '../styles/CVPreview.css';

const CVPreview = ({ generalInfo, education, experience }) => {
  return (
    <div className="cv-preview">
      <h2>CV Preview</h2>
      <div className="section info">
        <h3>General Information</h3>
        <p><strong>Name:</strong> {generalInfo.name}</p>
        <p><strong>Email:</strong> {generalInfo.email}</p>
        <p><strong>Phone:</strong> {generalInfo.phone}</p>
        <p><strong>Address:</strong> {generalInfo.address}</p>
        <p><strong>LinkedIn:</strong> {generalInfo.linkedin}</p>
      </div>
      <div className="section education">
        <h3>Educational Experience</h3>
        {education.map((edu, index) => (
          <div key={index} className="education-item">
            <p><strong>School:</strong> {edu.schoolName}</p>
            <p><strong>Title of Study:</strong> {edu.titleOfStudy}</p>
            <p><strong>Date of Study:</strong> {edu.dateOfStudy}</p>
            <p><strong>Location:</strong> {edu.location}</p>
            <p><strong>Description:</strong> {edu.description}</p>
          </div>
        ))}
      </div>
      <div className="section experience">
        <h3>Practical Experience</h3>
        {experience.map((exp, index) => (
          <div key={index} className="experience-item">
            <p><strong>Company:</strong> {exp.companyName}</p>
            <p><strong>Position:</strong> {exp.positionTitle}</p>
            <p><strong>Main Tasks:</strong> {exp.mainTasks}</p>
            <p><strong>From:</strong> {exp.dateFrom} <strong>Until:</strong> {exp.dateUntil}</p>
            <p><strong>Location:</strong> {exp.location}</p>
            <p><strong>Description:</strong> {exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVPreview;
