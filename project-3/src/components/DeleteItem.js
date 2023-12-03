import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Button, Autocomplete } from "@mui/material";
import React from "react";

function DeleteItem(props) {
    const { onClose, open, onConfirm, foods } = props;

    const foodTypes = foods;

    const [foodName, setFoodName] = React.useState(null);

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = (foodName) => {
        if (foodName) {
            let values = [foodName]
            onConfirm(values);
            setFoodName(null);
        }
    }

    const handleChange = (event, value) => {
        if (value !== null) {
            setFoodName(value.id);
        }
    };

        return (
            <Dialog onClose={handleClose} open={open} fullWidth>
                <DialogTitle> Delete Item </DialogTitle>
                <DialogContent sx={{height: 250}}>
                    <p>Food Name:</p>
                    <Autocomplete
                        disablePortal
                        onChange={handleChange}
                        id="Food-Name"
                        options={foodTypes}
                        renderInput={(params) => <TextField {...params} label="Food Name" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleConfirm(foodName)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        );
}

export default DeleteItem;