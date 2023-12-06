/* DeleteItem.js
 * React component redering Delete Item dialog
 */

import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Autocomplete } from "@mui/material";
import React from "react";

/**
 * Delete Item is a custom pop-up Dialog using MUI
 * Renders all current items in the inventory
 * Requires user to select an item before confirming
 * @param {object} props - Javascript object containing passed in props into DeleteItem component
 * @property {function} props.onClose - function to handle when the dialog is closed
 * @property {boolean} props.open - boolean designating whether the dialog should be open
 * @property {function} props.onConfirm - function to handle when the confirm button is pressed
 * @property {object} props.foods - Javascript object containing all current foods in the inventory
 */

function DeleteItem(props) {
    const { onClose, open, onConfirm, foods } = props;

    const foodTypes = foods;

    const [foodName, setFoodName] = React.useState(null);

    const handleClose = () => {
        setFoodName(null);
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
        else {
            setFoodName(value);
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