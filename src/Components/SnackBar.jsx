// import { useState } from 'react';
import { IconButton, Snackbar } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const SnackBar = ({ message, closeSnack, showSnackBar }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      onClose={closeSnack}
      autoHideDuration={3000}
      message={message}
      open={showSnackBar}
      action={
        <IconButton onClick={closeSnack}>
          <Close />
        </IconButton>
      }
    ></Snackbar>
  );
};

export default SnackBar;
