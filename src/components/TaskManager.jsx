
import React, { useState } from 'react';
import Auth from './Auth';
import TaskList from './TaskList';
import Dashheader from './Dashheader';
import Profile from './Profile'; 

const TaskManager = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setToken(localStorage.getItem('accessToken'));
    setUsername(localStorage.getItem('username'));
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    setIsAuthenticated(false);
    setUsername('');
    setShowProfile(false); 
  };

  return (
    <>
      {isAuthenticated && <Dashheader onLogout={handleLogout} />}
      <div className="task-manager">
        {!isAuthenticated ? (
          <Auth onLogin={handleLogin} />
        ) : (
          

          <div >
    <h2 className="text-center">Welcome, {username}!</h2>
    <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
        <button onClick={() => setShowProfile(!showProfile)}>
            {showProfile ? 'Hide Profile' : 'View Profile'}
        </button>
    </div>
    {showProfile ? (
        <Profile token={token} /> 
    ) : (
        <TaskList token={token} />
    )}
</div>

        )}
      </div>
    </>
  );
};

export default TaskManager;




