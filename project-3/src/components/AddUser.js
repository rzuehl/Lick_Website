/* AddUser.js
 * React component redering Add User dialog
 */

import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Button } from "@mui/material";
import React from "react";

/**
 * Add User is a custom pop-up Dialog using MUI
 * Requires user to input all values before confirming
 * @param {object} props - Javascript object containing passed in props into AddUser component
 * @property {function} props.onClose - function to handle when the dialog is closed
 * @property {boolean} props.open - boolean designating whether the dialog should be open
 * @property {function} props.onConfirm - function to handle when the confirm button is pressed
 */

function AddUser(props) {
    const { onClose, open, onConfirm } = props;

    const userName = React.useRef('');
    const userAddress = React.useRef('');
    const userPhoneNumber = React.useRef('');
    const userPosition = React.useRef('');

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = (userName, userAddress, userPhoneNumber, userPosition) => {
        if (userName && userAddress && userPhoneNumber && userPosition) {
            onConfirm([userName, userAddress, userPhoneNumber, userPosition]);
        }
    }

        return (
            <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
                <DialogTitle> Add User </DialogTitle>
                <DialogContent>
                    <br/>
                    <p>User Name:</p>
                    <TextField
                    fullWidth
                    autoComplete="off"
                    margin="dense"
                    inputRef={userName}
                    />
                    <br/>
                    <p>Address:</p>
                    <TextField
                    fullWidth
                    autoComplete="off"
                    margin="dense"
                    inputRef={userAddress}
                    />
                    <br/>
                    <p>Phone Number:</p>
                    <TextField
                    fullWidth
                    autoComplete="off"
                    margin="dense"
                    inputRef={userPhoneNumber}
                    />
                    <br/>
                    <p>Position:</p>
                    <TextField
                    fullWidth
                    select
                    margin="dense"
                    defaultValue={'e'}
                    inputRef={userPosition}
                    >
                        <MenuItem key={'e'} value={'e'}>{'Employee'}</MenuItem>
                        <MenuItem key={'m'} value={'m'}>{'Manager'}</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleConfirm(userName.current.value, userAddress.current.value, userPhoneNumber.current.value, userPosition.current.value)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        );
}

export default AddUser;