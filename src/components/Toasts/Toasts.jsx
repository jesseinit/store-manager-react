import { withToastManager } from 'react-toast-notifications';

import React, { Component } from 'react';

class Toast extends Component {
  componentDidMount = () => {
    const { toastManager, content } = this.props;
    if (!content) return;
    const contentMessage = <p>{content}</p>;
    toastManager.add(contentMessage, {
      appearance: 'success',
      autoDismiss: true
    });
  };

  componentDidUpdate = prevProps => {
    const { toastManager, content } = this.props;
    if (!content) return;
    if (content === prevProps.content) return;
    const contentMessage = <p>{content}</p>;

    toastManager.add(contentMessage, {
      appearance: 'success',
      autoDismiss: true
    });
  };

  render() {
    return null;
  }
}

export default withToastManager(Toast);
