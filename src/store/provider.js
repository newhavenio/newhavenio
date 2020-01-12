import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

import { Provider } from './createContext';

// TODO: Move this to Netlify env vars @a-trost
// This is ok, since the site key is not a sensitive secret, but managing on
// the cloud is easier.
const RECAPTCHA_SITE_KEY = '6LfTTMQUAAAAALXesYrKf-QxkzL19sGuBlfxPr4l';

// The provider, which holds the page-wide store and its actions.
// Feel free to abstract actions and state away from this file.
const AppProvider = ({ children }) => {
  const [innerOpen, setInnerOpen] = useState(false);
  const [outerOpen, setOuterOpen] = useState(false);
  const [timeout, setTimeoutId] = useState(null);

  const showModal = useCallback(() => {
    setOuterOpen(true);
    setInnerOpen(true);
    if (clearTimeout != null) {
      clearTimeout(timeout);
    }
  }, [timeout]);
  const hideModal = useCallback(() => {
    setInnerOpen(false);
    const timeout = setTimeout(() => setOuterOpen(false), 300);
    setTimeoutId(timeout);
  }, []);
  const ctx = useMemo(
    () => ({
      outerOpen,
      innerOpen,
      showModal,
      hideModal,
    }),
    [outerOpen, innerOpen, showModal, hideModal]
  );

  return (
    <Provider value={ctx}>
      <GoogleReCaptchaProvider reCaptchaKey={RECAPTCHA_SITE_KEY}>
        {children}
      </GoogleReCaptchaProvider>
    </Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
