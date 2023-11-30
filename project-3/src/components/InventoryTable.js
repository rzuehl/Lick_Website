import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function InventoryTable(props) {

    const { foodData } = props;

    const header = ["Food Id", "Food Name", "Food Type", "Quantity", "Food Price"];

    const properties = ["food_id", "food_name", "food_type", "quantity", "food_price"];

    // const data = [
    //     {food_id: 1, food_name: "Chocolate", food_type: "Ice Cream", quantity: 100, food_price: 3.99},
    //     {food_id: 2, food_name: "Chocolate", food_type: "Ice Cream", quantity: 100, food_price: 3.99}
    // ]

    const data = foodData;

    return (
        <TableContainer component={Paper} style={{maxHeight: '100%', overflow: 'auto', margin:10}}>
            <Table stickyHeader sx={{ minWidth: 650}}>
                <TableHead>
                    <TableRow>
                        {header.map((column) => (
                                <TableCell key={column}>
                                    {column}
                                </TableCell>
                            ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index}>
                            {properties.map((property, propIndex) => (
                                <TableCell key={propIndex}>{row[property]}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default InventoryTable;