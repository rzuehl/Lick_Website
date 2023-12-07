/* DeleteUser.js
 * React component redering Delete User dialog
 */

import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Autocomplete } from "@mui/material";
import React from "react";

/**
 * Delete User is a custom pop-up Dialog using MUI
 * Renders all current users in the database
 * Requires user to select a user before confirming
 * @param {object} props - Javascript object containing passed in props into DeleteUser component
 * @property {function} props.onClose - function to handle when the dialog is closed
 * @property {boolean} props.open - boolean designating whether the dialog should be open
 * @property {function} props.onConfirm - function to handle when the confirm button is pressed
 * @property {object} props.employees - Javascript object containing all current employees in the database
 */

function DeleteUser(props) {
    const { onClose, open, onConfirm, employees } = props;

    const [userName, setUserName] = React.useState(null);

    const handleClose = () => {
        setUserName(null);
        onClose();
    };

    const handleConfirm = (userName) => {
        if (userName) {
            let values = [userName]
            onConfirm(values);
            setUserName(null);
        }
    }

    const handleChange = (event, value) => {
        if (value !== null) {
            setUserName(value.id);
        }
        else {
            setUserName(value);
        }
    };

        return (
            <Dialog onClose={handleClose} open={open} fullWidth>
                <DialogTitle> Delete User </DialogTitle>
                <DialogContent sx={{height: 250}}>
                    <p>User Name:</p>
                    <Autocomplete
                        disablePortal
                        onChange={handleChange}
                        id="Employee-Name"
                        options={employees}
                        renderInput={(params) => <TextField {...params} label="User Name" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleConfirm(userName)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        );
}

export default DeleteUser;