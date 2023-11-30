import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function InventoryTable(props) {

    const { foodData, columns, columnHeader } = props;

    const header = columnHeader;

    const properties = columns;

    const data = foodData;

    return (
        <TableContainer component={Paper} style={{maxHeight: '100%', overflow: 'auto', margin:10}}>
            <Table stickyHeader sx={{ minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        {header.map((column) => (
                                <TableCell key={column} style={{backgroundColor: 'black', color: 'white'}}>
                                    {column}
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {properties.map((property, propIndex) => (
                                <TableCell key={propIndex} style={{backgroundColor: index % 2 === 0 ? 'white' : 'whitesmoke'}}>{row[property]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default InventoryTable;