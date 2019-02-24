import React from 'react';
import PropTypes from 'prop-types';

const ErrorToast = ({ errors }) => {
  return (
    <ul className="errors">
      {errors.map(error => {
        return <li key={Date.now()}>{error}</li>;
      })}
    </ul>
  );
};

ErrorToast.propTypes = {
  errors: PropTypes.oneOfType([PropTypes.array])
};

ErrorToast.defaultProps = {
  errors: []
};

export default ErrorToast;
