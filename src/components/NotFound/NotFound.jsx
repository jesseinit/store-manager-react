import React from 'react';
import Helmet from 'react-helmet';
import HeaderDefault from '../Header/Header';
import notFoundIcon from '../../assets/img/404.png';
import './NotFound.scss';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found - Store Manager</title>
      </Helmet>
      <HeaderDefault />
      <div className="notfound">
        <img className="notfound__image" src={notFoundIcon} alt="404_image" />
        <h1 className="notfound__message">Sorry! The page you are looking for does not exist yet!</h1>
        <button type="button" className="notfound__button" onClick={() => history.back()}>
          Go back
        </button>
      </div>
    </>
  );
};

export default NotFound;
