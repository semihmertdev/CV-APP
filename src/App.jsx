import React, { useState } from 'react';
import GeneralInfo from './components/GeneralInfo';
import EducationalExperience from './components/EducationalExperience';
import PracticalExperience from './components/PracticalExperience';
import CVPreview from './components/CVPreview';
import './styles/App.css';

const App = () => {
  const [generalInfo, setGeneralInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    linkedin: ''
  });

  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  return (
    <div className="app">
      <div className="form-section">
        <GeneralInfo generalInfo={generalInfo} setGeneralInfo={setGeneralInfo} />
        <EducationalExperience education={education} setEducation={setEducation} />
        <PracticalExperience experience={experience} setExperience={setExperience} />
      </div>
      <div className="cv-preview">
        <CVPreview generalInfo={generalInfo} education={education} experience={experience} />
      </div>
    </div>
  );
};

export default App;
