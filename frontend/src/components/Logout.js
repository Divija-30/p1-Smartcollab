// src/components/Logout.js

import { removeToken } from '../utils/auth';  // Import from utils/auth.js

const Logout = () => {
  const handleLogout = () => {
    removeToken();  // Remove the token from localStorage
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
