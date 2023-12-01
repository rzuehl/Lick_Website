import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import React from "react";

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