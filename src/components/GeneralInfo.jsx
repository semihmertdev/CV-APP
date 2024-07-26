import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaGlobe, FaTrash, FaEdit } from 'react-icons/fa';
import '../styles/GeneralInfo.css';

const GeneralInfo = ({ generalInfo, setGeneralInfo }) => {
  const [link, setLink] = useState({ type: '', url: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGeneralInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setLink((prevLink) => ({ ...prevLink, [name]: value }));
  };

  const handleLinkUpdate = () => {
    if (link.type && link.url) {
      if (editIndex !== null) {
        const updatedLinks = generalInfo.links.map((l, index) =>
          index === editIndex ? link : l
        );
        setGeneralInfo((prevInfo) => ({ ...prevInfo, links: updatedLinks }));
        setEditIndex(null);
      } else {
        setGeneralInfo((prevInfo) => ({
          ...prevInfo,
          links: [...prevInfo.links, link],
        }));
      }
      setLink({ type: '', url: '' });
    }
  };

  const handleDeleteLink = (index) => {
    const newLinks = generalInfo.links.filter((_, i) => i !== index);
    setGeneralInfo((prevInfo) => ({ ...prevInfo, links: newLinks }));
  };

  const handleEditLink = (index) => {
    const linkToEdit = generalInfo.links[index];
    setLink(linkToEdit);
    setEditIndex(index);
  };

  return (
    <div className="general-info">
      {['name', 'title', 'email', 'phone', 'address'].map((field) => (
        <label key={field}>
          {field.charAt(0).toUpperCase() + field.slice(1)}:
          <input
            type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
            name={field}
            value={generalInfo[field]}
            onChange={handleChange}
            placeholder={`Enter your ${field}`}
            required={field === 'email'}
          />
        </label>
      ))}

      <div className="link-form">
        <div className="radio-group">
          {['linkedin', 'github', 'website', 'other'].map((type) => (
            <label key={type} className="radio-label">
              <input
                type="radio"
                name="type"
                value={type}
                checked={link.type === type}
                onChange={handleLinkChange}
              />
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </label>
          ))}
        </div>
        <label>
          URL:
          <input
            type="url"
            name="url"
            value={link.url}
            onChange={handleLinkChange}
            placeholder="Enter URL"
          />
        </label>
        <div className="buttons">
          <button type="button" onClick={handleLinkUpdate}>
            {editIndex !== null ? 'Update Link' : 'Add Link'}
          </button>
        </div>
      </div>

      <div className="links-list">
        {generalInfo.links.map((l, index) => (
          <div key={index} className="link-entry">
            <div className="link-details">
              <span className="link-icon">
                {l.type === 'linkedin' && <FaLinkedin />}
                {l.type === 'github' && <FaGithub />}
                {l.type === 'website' && <FaGlobe />}
                {l.type === 'other' && <FaGlobe />}
              </span>
              <a href={l.url} target="_blank" rel="noopener noreferrer">
                {l.url}
              </a>
            </div>
            <div className="buttons">
              <button onClick={() => handleEditLink(index)} className="edit-button">
                <FaEdit />
              </button>
              <button onClick={() => handleDeleteLink(index)} className="delete-button">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GeneralInfo;
