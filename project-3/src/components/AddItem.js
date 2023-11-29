import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem } from "@mui/material";
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
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle> Date Range </DialogTitle>
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
                    autoComplete="off"
                    margin="dense"
                    inputRef={foodName}
                    />
                    <br/>
                    <p>Quantity:</p>
                    <TextField
                    autoComplete="off"
                    margin="dense"
                    inputRef={quantity}
                    type="number"
                    />
                    <br/>
                    <p>Food Price:</p>
                    <TextField
                    autoComplete="off"
                    margin="dense"
                    inputRef={foodPrice}
                    type="number"
                    />
                </DialogContent>
                <DialogActions>
                    <button onClick={handleClose}>Cancel</button>
                    <button onClick={() => handleConfirm(foodType, foodName, quantity, foodPrice)}>Confirm</button>
                </DialogActions>
            </Dialog>
        );
}

export default AddItem;