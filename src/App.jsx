import React, { useState, useCallback } from 'react';
import GeneralInfo from './components/GeneralInfo';
import EducationalExperience from './components/EducationalExperience';
import PracticalExperience from './components/PracticalExperience';
import CVPreview from './components/CVPreview';
import CoursesAndCertificates from './components/CoursesAndCertificates';
import Skills from './components/Skills';
import Tabs from './components/Tabs';
import './styles/App.css';

const App = () => {
  const [generalInfo, setGeneralInfo] = useState({
    title: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    links: [],
  });

  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [courses, setCourses] = useState([]);
  const [skills, setSkills] = useState([]);

  const tabs = [
    {
      title: 'Personal Information',
      content: (
        <GeneralInfo generalInfo={generalInfo} setGeneralInfo={setGeneralInfo} />
      ),
    },
    {
      title: 'Education',
      content: (
        <EducationalExperience education={education} setEducation={setEducation} />
      ),
    },
    {
      title: 'Professional Experience',
      content: (
        <PracticalExperience experience={experience} setExperience={setExperience} />
      ),
    },
    {
      title: 'Courses and Certificates',
      content: (
        <CoursesAndCertificates courses={courses} setCourses={setCourses} />
      ),
    },
    {
      title: 'Skills',
      content: <Skills skills={skills} setSkills={setSkills} />,
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = useCallback((index) => {
    setActiveTab(index);
  }, []);

  return (
    <div className="app">
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={handleTabChange} />
      <div className="cv-preview">
        <CVPreview
          generalInfo={generalInfo}
          education={education}
          experience={experience}
          courses={courses}
          skills={skills}
        />
      </div>
    </div>
  );
};

export default App;
