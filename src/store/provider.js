import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { Provider } from './createContext';

// TODO: Move this to Netlify env vars @a-trost
// This is ok, since the site key is not a sensitive secret, but managing on
// the cloud is easier.
const RECAPTCHA_SITE_KEY = '6LfTTMQUAAAAALXesYrKf-QxkzL19sGuBlfxPr4l';

// The provider, which holds the page-wide store and its actions.
// Feel free to abstract actions and state away from this file.
class AppProvider extends Component {
  state = {
    open: false,
    showModal: () => this.setState({ open: true }),
    hideModal: () => this.setState({ open: false }),
  };

  render() {
    return (
      <Provider value={this.state}>
        <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
          {this.props.children}
        </GoogleReCaptchaProvider>
      </Provider>
    );
  }
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
