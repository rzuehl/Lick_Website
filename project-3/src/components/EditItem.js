import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Button, Autocomplete } from "@mui/material";
import React from "react";

function EditItem(props) {
    const { onClose, open, onConfirm, foods } = props;

    const foodTypes = foods;

    const [foodName, setFoodName] = React.useState(null);
    const quantity = React.useRef('');
    const foodPrice = React.useRef('');

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = (foodName, quantity, foodPrice) => {
        if (foodName && (quantity.current.value || foodPrice.current.value)) {
            let values = [foodName, quantity.current.value, foodPrice.current.value]
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
            <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
                <DialogTitle> Edit Item </DialogTitle>
                <DialogContent>
                    <p>Food Name:</p>
                    <Autocomplete
                        disablePortal
                        onChange={handleChange}
                        id="Food-Name"
                        options={foodTypes}
                        renderInput={(params) => <TextField {...params} label="Food Name" />}
                    />
                    <br/>
                    <p>Quantity:</p>
                    <TextField
                        fullWidth
                        autoComplete="off"
                        margin="dense"
                        inputRef={quantity}
                        type="number"
                    />
                    <br/>
                    <p>Food Price:</p>
                    <TextField
                        fullWidth
                        autoComplete="off"
                        margin="dense"
                        inputRef={foodPrice}
                        type="number"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => handleConfirm(foodName, quantity, foodPrice)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        );
}

export default EditItem;