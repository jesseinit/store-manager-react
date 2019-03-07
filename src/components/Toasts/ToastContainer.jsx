import React from 'react';
import { ToastProvider } from 'react-toast-notifications';
import Toasts from './Toasts';

const ToastContainer = ({ message }) => {
  return (
    <ToastProvider placement="top-center" transitionDuration={300} autoDismissTimeout={3000}>
      <Toasts content={message || null} />
    </ToastProvider>
  );
};

export default ToastContainer;
