import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Button } from "@mui/material";
import React from "react";

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
                    autoComplete="off"
                    margin="dense"
                    inputRef={userPosition}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleConfirm(userName.current.value, userAddress.current.value, userPhoneNumber.current.value, userPosition.current.value)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        );
}

export default AddUser;