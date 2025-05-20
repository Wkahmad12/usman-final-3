import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search from '../../assets/search.png';
import profile from '../../assets/profile.jpg';
import { logout } from '../../firebase';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navRef = useRef();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={navRef} className='navbar'>
      <div className="navbar-left">
        <img src={logo} alt="Logo" />
        
        {/* Toggle Button */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>

        {/* Menu List */}
        <ul className={menuOpen ? "nav-menu open" : "nav-menu"}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/tvshows" onClick={() => setMenuOpen(false)}>TV Shows</Link></li>
          <li><Link to="/UpComing" onClick={() => setMenuOpen(false)}>UpComing</Link></li>
          <li><Link to="/Song" onClick={() => setMenuOpen(false)}>Song</Link></li>
          
          
        
        </ul>
      </div>

      <div className="navbar-right">
        
        <div className='profile-navbar'>
          <img src={profile} alt="Profile" className='profile' />
          <div className='dropdown'>
            <p onClick={() => { logout(); setMenuOpen(false); }}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
