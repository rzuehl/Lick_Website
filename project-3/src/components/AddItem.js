import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Button } from "@mui/material";
import React from "react";

function AddItem(props) {
    const { onClose, open, onConfirm } = props;

    const foodTypes = ['Ice Cream', "Seasonal Ice Cream", 'Diary Free/Vegan', "Sandwich", "Topping", "Seasonal Topping", "Beverage"];

    const foodType = React.useRef('');
    const foodName = React.useRef('');
    const quantity = React.useRef('');
    const foodPrice = React.useRef('');

    const handleClose = () => {
        onClose();
    };

    const handleConfirm = (foodType, foodName, quantity, foodPrice) => {
        let values = [foodType.current.value, foodName.current.value, quantity.current.value, foodPrice.current.value]
        onConfirm(values);
    }

        return (
            <Dialog onClose={handleClose} open={open} fullWidth maxWidth="sm">
                <DialogTitle> Add Item </DialogTitle>
                <DialogContent>
                    <p>Food Type:</p>
                    <TextField
                    fullWidth
                    select
                    margin="dense"
                    defaultValue={"Ice Cream"}
                    inputRef={foodType}
                    >
                        {foodTypes.map((option) =>
                        <MenuItem key = {option} value={option}>
                            {option}
                        </MenuItem>
                        )}
                    </TextField>
                    <br/>
                    <p>Food Name:</p>
                    <TextField
                    fullWidth
                    autoComplete="off"
                    margin="dense"
                    inputRef={foodName}
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
                    <Button onClick={() => handleConfirm(foodType, foodName, quantity, foodPrice)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        );
}

export default AddItem;