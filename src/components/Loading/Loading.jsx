import React from 'react';
import PropTypes from 'prop-types';

import './Loading.scss';

const Loading = ({ title }) => {
  return (
    <div className="main loader">
      <p>{`${title}...`}</p>
      <div className="lds-ellipsis">
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

Loading.propTypes = {
  title: PropTypes.string
};

Loading.defaultProps = {
  title: 'Fetching Data...'
};

export default Loading;
