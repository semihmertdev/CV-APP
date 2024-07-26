import React from 'react';
import '../styles/Tabs.css';

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="tabs">
      <ul className="tab-titles">
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={activeTab === index ? 'active' : ''}
            onClick={() => setActiveTab(index)}
          >
            {tab.title}
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};

export default Tabs;
