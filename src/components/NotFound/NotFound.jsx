import React from 'react';
import Helmet from 'react-helmet';
import notFoundIcon from '../../assets/img/404.png';
import './NotFound.scss';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Store Manager</title>
      </Helmet>
      <header id="site-header" className="row">
        <a className="logo" href="./">
          SM
        </a>
      </header>
      <div className="notfound">
        <img className="404Image" src={notFoundIcon} alt="404_image" />
        <h1>Sorry! The page you are looking for does not exist yet!</h1>
        <button type="button" className="goBackBtn" onClick={() => history.back()}>
          Go back
        </button>
      </div>
    </>
  );
};

export default NotFound;
