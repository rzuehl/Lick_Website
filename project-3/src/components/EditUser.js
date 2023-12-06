/* EditUser.js
 * React component redering Edit User dialog
 */

import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Autocomplete } from "@mui/material";
import React from "react";

/**
 * Edit User is a custom pop-up Dialog using MUI
 * Renders all current users in the database
 * Allows users to edit properties on a selected user
 * @param {object} props - Javascript object containing passed in props into EditUser component
 * @property {function} props.onClose - function to handle when the dialog is closed
 * @property {boolean} props.open - boolean designating whether the dialog should be open
 * @property {function} props.onConfirm - function to handle when the confirm button is pressed
 * @property {object} props.employees - Javascript object containing all current employees in the database
 * @property {object} props.positions - Javascript object containing all current positions from the database
 */

function EditUser(props) {
    const { onClose, open, onConfirm, employees, positions } = props;

    const [userName, setUserName] = React.useState(null);
    const userAddress = React.useRef('');
    const userPhoneNumber = React.useRef('');
    const [userPosition, setUserPosition] = React.useState('');
    const newUserName = React.useRef('');

    const handleClose = () => {
        setUserName(null);
        setUserPosition('');
        onClose();
    };

    const handleConfirm = (userName, newUserName, userAddress, userPhoneNumber, userPosition) => {
        if (userName && (newUserName || userAddress || userPhoneNumber || userPosition)) {
            onConfirm([userName, newUserName, userAddress, userPhoneNumber, userPosition]);
            setUserName(null);
            setUserPosition('');
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

    const handleChangePosition = (event, value) => {
        if (value !== null) {
            setUserPosition(value.id);
        }
        else {
            setUserPosition(value);
        }
    };

        return (
            <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
                <DialogTitle> Edit User </DialogTitle>
                <DialogContent>
                    <p>Employee Name:</p>
                    <Autocomplete
                        disablePortal
                        onChange={handleChange}
                        id="Employee-Name"
                        options={employees}
                        renderInput={(params) => <TextField {...params} label="Employee Name" />}
                    />
                    <br/>
                    <p>Update Name:</p>
                    <TextField
                        fullWidth
                        autoComplete="off"
                        margin="dense"
                        inputRef={newUserName}
                    />
                    <p>Update Address:</p>
                    <TextField
                        fullWidth
                        autoComplete="off"
                        margin="dense"
                        inputRef={userAddress}
                    />
                    <p>Update Phone Number:</p>
                    <TextField
                        fullWidth
                        autoComplete="off"
                        margin="dense"
                        inputRef={userPhoneNumber}
                    />
                    <br/>
                    <p>Update Position:</p>
                    <Autocomplete
                        disablePortal
                        onChange={handleChangePosition}
                        id="Employee-Position"
                        options={positions}
                        renderInput={(params) => <TextField {...params} label="Position" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleConfirm(userName, newUserName.current.value, userAddress.current.value, userPhoneNumber.current.value, userPosition)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        );
}

export default EditUser;