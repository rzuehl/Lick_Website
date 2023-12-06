/* InventoryTable.js
 * React component redering general purpose table
 */

import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, createTheme } from "@mui/material";

/**
 * Inventory Table is a custom Table component using MUI
 * Requires table data, column names and column headers to dynamically render data
 * @param {object} props - Javascript object containing passed in props into InventoryTable component
 * @property {object} props.tableData - Javascript object containing row data entries
 * @property {object} props.columns - Javascript object containing column data properties
 * @property {object} props.columnHeader - Javascript object containing column headers
 */

function InventoryTable(props) {

    const { tableData, columns, columnHeader } = props;

    const [searchTerm, setSearchTerm] = React.useState('');

    const header = columnHeader;

    const properties = columns;

    const data = tableData;

    const filteredData = data.filter((row) =>
        properties.some((property) => String(row[property]).toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const { palette } = createTheme();

    const theme = createTheme({
        palette: {
            lickPink: palette.augmentColor({
                color: {
                    main: "#ff657f"
                }
            })
        },
    });

    return (
        <div>
            <ThemeProvider theme={theme}>
            <TextField
            style={{margin:10, backgroundColor: "white", borderRadius: '5px'}}
            autoComplete="off"
            placeholder="Search"
            value={searchTerm}
            color="lickPink"
            focused
            onChange={(e) => setSearchTerm(e.target.value)}
            inputProps={{
                style: {
                }
            }}
            />
            </ThemeProvider>
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
                            <TableCell key={propIndex} style={{backgroundColor: index % 2 === 0 ? 'white' : 'whitesmoke', fontSize: 20, borderColor: 'black'}}>{row[property]}</TableCell>
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