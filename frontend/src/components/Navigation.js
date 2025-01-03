import React from "react";
import { Link } from "react-router-dom";
import "./styles/Navigation.css";

const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/">
        <img src="/logo.png" alt="SmartCollab Logo" className="logo" />
      </Link>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/chat">Chat</Link></li>
        <li><Link to="/create-document">Create Document</Link></li>
      </ul>
    </nav>
  );
};

export default Navigation;
