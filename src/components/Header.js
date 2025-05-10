import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  // 화면 크기가 변경될 때 모바일 메뉴 처리
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
        <Link to="/measure" onClick={() => setMenuActive(false)}>측정하기</Link>
        <Link to="/ranking" onClick={() => setMenuActive(false)}>순위보기</Link>
        <Link to="/about" onClick={() => setMenuActive(false)}>About us</Link>
        <Link to="/user" onClick={() => setMenuActive(false)}>User Page</Link>
      </nav>
      
      <div className="auth-buttons">
        <button className="login-btn">Sign in</button>
        <button className="signup-btn">Sign up</button>
      </div>
    </header>
  );
};

export default Header;
