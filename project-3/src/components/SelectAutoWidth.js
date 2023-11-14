// SelectAutoWidth.js
// Renders selector with material UI

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

/**
 * Material UI component generating selector
 * @param {object} props - object containing react props
 */
export default function SelectAutoWidth(props) {
  const [quantity, setQuantity] = React.useState('');

  const handleChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Quantity</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={'Quantity'}
          onChange={handleChange}
          autoWidth
          label="Quantity"
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

