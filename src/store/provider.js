import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Provider } from './createContext';

// The provider, which holds the page-wide store and its actions.
// Feel free to abstract actions and state away from this file.
const AppProvider = () => {
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

  return <Provider value={ctx}></Provider>;
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
