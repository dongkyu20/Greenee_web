import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);
  
  // Mock user data
  const [isLoggedIn] = useState(true);
  const userData = {
    name: 'Byeongsu Ko',
    level: 3,
    exp: 75 // percentage to next level
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // Handle mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuActive) {
        setMenuActive(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [menuActive]);

  return (
    <header>
      <Link to="/" className="logo-container">
        <img src="/svg/greenee_logo_big_w.svg" alt="Greenee Logo" style={{ width: '30px', height: '30px' }} />
        <span className="company-name">Greenee</span>
      </Link>
      
      <div className={`menu-toggle ${menuActive ? 'active' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      
      <nav className={menuActive ? 'active' : ''}>
        <Link to="/measure" onClick={() => setMenuActive(false)}>Measure</Link>
        <Link to="/ranking" onClick={() => setMenuActive(false)}>Rankings</Link>
        <Link to="/about" onClick={() => setMenuActive(false)}>About us</Link>
        <Link to="/user" onClick={() => setMenuActive(false)}>User Page</Link>
      </nav>
      
      <div className="auth-buttons">
        {isLoggedIn ? (
          <div className="user-info">
            <div className="level-badge">
              <span className="level-number">{userData.level}</span>
            </div>
            <span className="user-name">{userData.name}</span>
          </div>
        ) : (
          <>
            <button className="login-btn">Sign in</button>
            <button className="signup-btn">Sign up</button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
