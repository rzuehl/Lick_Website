import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from "@mui/material";
import React from "react";

function ManageOrderDialog(props) {
    const { onClose, open, onConfirm } = props;

    const orderID = React.useRef('');
    const orderStatus = React.useRef('');
    const customerName = React.useRef('');
    var disabledInputs = props.disable;
    var currOrderStatus = props.status;
    var currOrderID = props.orderID;
    var currCustomerName = props.customerName;

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = (orderID, orderStatus, customerName) => {
        let values = [orderID, orderStatus, customerName]
        onConfirm(values);
    }

        return (
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle> Order Manager </DialogTitle>
                <DialogContent>
                    <p>Enter Order ID:</p>
                    <TextField
                        disabled = {disabledInputs.includes(0)}
                        id="order-id"
                        label="Order ID"
                        type="number"
                        inputRef={orderID}
                        defaultValue={currOrderID}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <p>Change Order Status:</p>
                    <TextField
                        disabled = {disabledInputs.includes(1)}
                        id="order-status"
                        select
                        label="Order Status"
                        inputRef={orderStatus}
                        defaultValue={currOrderStatus}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    >
                        <MenuItem value = "Pending" disabled = {currOrderStatus === "Fulfilled"}>Pending</MenuItem>
                        <MenuItem value = "Cancelled" disabled = {currOrderStatus === "Fulfilled"}>Cancelled</MenuItem>
                        <MenuItem value = "Fulfilled" disabled = {currOrderStatus === "Cancelled"}>Fulfilled</MenuItem>
                    </TextField>
                    <p>Change Customer Name:</p>
                    <TextField 
                        disabled = {disabledInputs.includes(2)}
                        id="Customer Name" 
                        label="Customer Name" 
                        inputRef={customerName}
                        defaultValue={currCustomerName} 
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleConfirm(orderID.current.value, orderStatus.current.value, customerName.current.value)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        );
}

export default ManageOrderDialog;