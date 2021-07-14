// import { useState } from 'react';
import{ Snackbar} from '@material-ui/core';

const SnackBar = ({message, showSnackBar}) => {
    console.log(message)
    return (
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}} autoHideDuration={3000} message={message} open={showSnackBar} action={
            <div></div>
        } />
        )
}

export default SnackBar;