import React from "react";
import { InputAdornment, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

function InventoryTable(props) {

    const { foodData, columns, columnHeader } = props;

    const [searchTerm, setSearchTerm] = React.useState('');

    const header = columnHeader;

    const properties = columns;

    const data = foodData;

    const filteredData = data.filter((row) =>
        properties.some((property) => String(row[property]).toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <TextField
            style={{margin:10}}
            label='Search'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <TableContainer component={Paper} style={{maxHeight: '80vh', overflow: 'auto', margin:10}}>
                <Table stickyHeader sx={{ minWidth: 650}}>
                    <TableHead>
                        <TableRow>
                            {header.map((column) => (
                                <TableCell key={column} style={{backgroundColor: 'black', color: 'white', fontSize: 20, fontWeight: "bold"}}>
                                    {column}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.map((row, index) => (
                            <TableRow key={index}>
                                {properties.map((property, propIndex) => (
                            <TableCell key={propIndex} style={{backgroundColor: index % 2 === 0 ? 'white' : 'whitesmoke', fontSize: 15}}>{row[property]}</TableCell>
                            ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default InventoryTable;