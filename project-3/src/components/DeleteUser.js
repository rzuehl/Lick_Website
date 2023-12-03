import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Autocomplete } from "@mui/material";
import React from "react";

function DeleteUser(props) {
    const { onClose, open, onConfirm, employees } = props;

    const [userName, setUserName] = React.useState(null);

    const handleClose = () => {
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