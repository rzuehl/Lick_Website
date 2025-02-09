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
  const [amount, setAmount] = React.useState('');

  const handleChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 100 }}>
        <InputLabel id="demo-simple-select-autowidth-label">Amount</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={amount}
          onChange={handleChange}
          autoWidth
          label="Quantity"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

