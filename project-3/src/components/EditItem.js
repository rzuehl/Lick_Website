import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Autocomplete } from "@mui/material";
import React from "react";

function EditItem(props) {
    const { onClose, open, onConfirm, foods, categories } = props;

    const foodTypes = foods;

    const [foodName, setFoodName] = React.useState(null);
    const quantity = React.useRef('');
    const foodPrice = React.useRef('');
    const newName = React.useRef('');
    const [newType, setFoodType] = React.useState('');

    const handleClose = () => {
        setFoodName(null);
        setFoodType('');
        onClose();
    };

    const handleConfirm = (foodName, newName, newType, quantity, foodPrice) => {
        if (foodName && (newName.current.value || newType || quantity.current.value || foodPrice.current.value)) {
            let values = [foodName, newName.current.value, newType, quantity.current.value, foodPrice.current.value]
            onConfirm(values);
            setFoodName(null);
            setFoodType('');
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

    const handleChangeType = (event, value) => {
        if (value !== null) {
            setFoodType(value.id);
        }
        else {
            setFoodType(value);
        }
    } 

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
                    <p>Update Name:</p>
                    <TextField
                        fullWidth
                        autoComplete="off"
                        margin="dense"
                        inputRef={newName}
                    />
                    <p>Update Food Type:</p>
                    <Autocomplete
                        disablePortal
                        onChange={handleChangeType}
                        id="Food-Type"
                        options={categories}
                        renderInput={(params) => <TextField {...params} label="Food Type" />}
                    />
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
                    <Button onClick={() => handleConfirm(foodName, newName, newType, quantity, foodPrice)}>Confirm</Button>
                </DialogActions>
            </Dialog>
        );
}

export default EditItem;