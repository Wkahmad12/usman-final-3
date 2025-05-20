import React from 'react';
import './Footer.css';
import { FaInstagram, FaYoutube, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className="footer-container">
        
        {/* Social Media Section */}
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="footer-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="icon" />
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="icon" />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="icon" />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="icon" />
            </a>
          </div>
        </div>

        {/* Help Center Section */}
        <div className="footer-section">
          <h3>Help & Support</h3>
          <p><a href="/help">Help Center</a></p>
          <p>📞 <a href="tel:+1234567890">+1 234 567 890</a></p>
          <p>📧 <a href="mailto:support@moviehub.com">support@moviehub.com</a></p>
        </div>

        {/* Legal Section */}
        <div className="footer-section">
          <h3>Legal</h3>
          <p><a href="/terms">Terms of Service</a></p>
          <p><a href="/privacy">Privacy Policy</a></p>
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Movie Hub. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
