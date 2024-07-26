import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Importing the icons
import '../styles/Skills.css';

const Skills = ({ skills, setSkills }) => {
  const [skill, setSkill] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [showSkills, setShowSkills] = useState(false);

  const handleChange = (e) => {
    setSkill(e.target.value);
  };

  const handleAddOrUpdateSkill = () => {
    if (skill) {
      if (editingIndex !== null) {
        const updatedSkills = [...skills];
        updatedSkills[editingIndex] = skill;
        setSkills(updatedSkills);
        setEditingIndex(null);
      } else {
        setSkills([...skills, skill]);
      }
      setSkill('');
    }
  };

  const handleEdit = (index) => {
    setSkill(skills[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
    if (editingIndex === index) {
      setEditingIndex(null);
      setSkill('');
    }
  };

  return (
    <div className="skills">
      <form>
        <label>
          Skill:
          <input
            type="text"
            value={skill}
            onChange={handleChange}
            placeholder="Enter a skill"
          />
        </label>
        <div className="buttons">
          <button type="button" onClick={handleAddOrUpdateSkill}>
            {editingIndex !== null ? 'Update Skill' : 'Add Skill'}
          </button>
          <button type="button" onClick={() => setShowSkills(!showSkills)}>
            {showSkills ? 'Hide Skills' : 'Show Skills'}
          </button>
        </div>
      </form>
      {showSkills && (
        <div className="skills-list">
          {skills.map((skill, index) => (
            <div key={index} className="skill-entry">
              <p>{skill}</p>
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

export default Skills;
