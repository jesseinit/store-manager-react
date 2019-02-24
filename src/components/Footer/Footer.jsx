import React from 'react';
import './Footer.scss';

const Footer = () => (
  <footer id="site-footer" className={window.location.pathname === '/' ? 'blue-bg row' : 'row'}>
    <p>
      Store Manager &copy;
      {new Date().getFullYear()}
    </p>
  </footer>
);

export default Footer;
