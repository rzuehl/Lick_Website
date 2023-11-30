import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import React from "react";

function ManagerDialog(props) {
    const { onClose, open, onConfirm } = props;

    const startInput = React.useRef('');
    const endInput = React.useRef('');

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = (start, end) => {
        let values = [start, end]
        onConfirm(values);
    }

        return (
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle> Date Range </DialogTitle>
                <DialogContent>
                    <p>Start Date:</p>
                    <TextField
                        autoComplete="off"
                        id="Start-Date"
                        margin="dense"
                        inputRef={startInput}
                        type="date"
                        placeholder="YYYY-MM-DD"
                    />
                    <br/>
                    <p>End Date:</p>
                    <TextField
                        autoComplete="off"
                        id="End-Date"
                        margin="dense"
                        inputRef={endInput}
                        type="date"
                        placeholder="YYYY-MM-DD"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleConfirm(startInput.current.value, endInput.current.value)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        );
}

export default ManagerDialog;