import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
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
                <DialogTitle> Test </DialogTitle>
                <DialogContent>
                    <TextField
                    id="Start-Date"
                    margin="dense"
                    type="date"
                    inputRef={startInput}
                    />
                    <br/>
                    <TextField
                    id="End-Date"
                    margin="dense"
                    type="date"
                    inputRef={endInput}
                    />
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={() => handleConfirm(startInput.current.value, endInput.current.value)}>Confirm</button>
                </DialogActions>
            </Dialog>
        );
}

export default ManagerDialog;