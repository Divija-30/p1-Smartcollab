import React, { useState } from 'react';
import Chat from './Chat';
import CreateDocument from './CreateDocument';
import EditDocument from './EditDocument';
import Collaborate from './Collaborate';
import './styles/Dashboard.css'; // Import the CSS file for styling

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState(''); // To track selected component

  const handleComponentClick = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li onClick={() => handleComponentClick('chat')}>Chat</li>
          <li onClick={() => handleComponentClick('createDocument')}>Create Document</li>
          <li onClick={() => handleComponentClick('editDocument')}>Edit Document</li>
          <li onClick={() => handleComponentClick('collaborate')}>Collaborate</li>
        </ul>
      </div>
      <div className="content">
        {selectedComponent === 'chat' && <Chat />}
        {selectedComponent === 'createDocument' && <CreateDocument />}
        {selectedComponent === 'editDocument' && <EditDocument />}
        {selectedComponent === 'collaborate' && <Collaborate />}
      </div>
    </div>
  );
};

export default Dashboard;
