/* ManagerDialog.js
 * React component redering a custom dialog to select dates for manager queries
 */

import { Dialog, DialogActions, DialogContent, TextField, Button } from "@mui/material";
import React from "react";

/**
 * Manager Dialog is a custom Dialog component using MUI
 * Allows users to pick start / end date for their manager queries depending on the button pressed
 * @param {object} props - Javascript object containing passed in props into ManagerDialog component
 * @property {function} props.onClose - function to handle when the dialog is closed
 * @property {boolean} props.open - boolean designating whether the dialog should be open
 * @property {function} props.onConfirm - function to handle when the confirm button is pressed
 * @property {string} props.date - string for either 'Start' or 'End' to decide which dialog to render
 */

function ManagerDialog(props) {
    const { onClose, open, onConfirm, date } = props;

    const input = React.useRef('');

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = (input) => {
        onConfirm(input);
    }

    if (date === 'Start') {
        return (
            <Dialog onClose={handleClose} open={open}>
                <DialogContent>
                    <p>Start Date:</p>
                    <TextField
                        autoComplete="off"
                        id="Start-Date"
                        margin="dense"
                        inputRef={input}
                        type="date"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleConfirm(input.current.value)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        );
    }
    else {
        return (
            <Dialog onClose={handleClose} open={open}>
                <DialogContent>
                    <p>End Date:</p>
                    <TextField
                        autoComplete="off"
                        id="End-Date"
                        margin="dense"
                        inputRef={input}
                        type="date"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleConfirm(input.current.value)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default ManagerDialog;