import React from 'react';
import './Main.scss';

const Main = prop => (
  <main id="site-main" className={window.location.pathname === '/' ? 'blue-bg row' : 'row'}>
    {prop.children}
  </main>
);

export default Main;
