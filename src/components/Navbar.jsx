import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "./navbar.css";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">HiveNimble</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        {user && <li><Link to="/clients">Clients</Link></li>}
        {user && <li><Link to="/dashboard">Dashboard</Link></li>}
        {user && <li><Link to="/calendar">Calendar</Link></li>}
        {user && <li><Link to="/time">Time Tracker</Link></li>}
        {user && <li><Link to="/invoices">Invoices</Link></li>}
        {user ? (
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
