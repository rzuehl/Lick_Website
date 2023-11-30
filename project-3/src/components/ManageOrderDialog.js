import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React from "react";

function ManageOrderDialog(props) {
    const { onClose, open, onConfirm } = props;

    const orderID = React.useRef('');

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = (orderID) => {
        let values = [orderID]
        onConfirm(values);
    }

        return (
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle> Order Manager </DialogTitle>
                <DialogContent>
                    <p>Enter Order ID:</p>
                    <TextField
                        id="order-id"
                        label="Number"
                        type="number"
                        inputRef={orderID}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={() => handleConfirm(orderID.current.value)}>Confirm</button>
                </DialogActions>
            </Dialog>
        );
}

export default ManageOrderDialog;