import React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

/**
 * TableDropdown is a custom component rendering a button with a dropdown for the manager and cashier page
 * @param {object} props - Javascript object containing passed in props into TableDropdown component
 * @param {string} props.name
 * @param {array} props.options
 */

function TableDropdown(props) {

    let options = props.options;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const handleFunctionClick = (func) => {
        func();
    };
  
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          {props.name}
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
           {options.map((option) => (
                <MenuItem key={option['index']} onClick={() => {
                    handleClose();
                    handleFunctionClick(option.optionFunction);
                }}>{option['optionName']}</MenuItem>
            ))}
          
        </Menu>
      </div>
    );
  }

  export default TableDropdown;