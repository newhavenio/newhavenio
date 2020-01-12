import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from '@reach/dialog';

import '@reach/dialog/styles.css';

const Modal = ({ open, hideModal, children, ...props }) => {
  const handleKeyDown = useCallback(
    ({ key }) => key === 'Escape' && open && hideModal(),
    [open]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <Dialog isOpen={open} {...props}>
      {children}
    </Dialog>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  open: PropTypes.bool.isRequired,
  hideModal: PropTypes.func.isRequired,
};

export default Modal;
