import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

function InventoryTable(props) {

    return (
        <TableContainer>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell> Food Id </TableCell>
                        <TableCell> Food Name </TableCell>
                        <TableCell> Food Type </TableCell>
                        <TableCell> Quantity </TableCell>
                        <TableCell> Food Price </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody></TableBody>
            </Table>
        </TableContainer>
    );
}

export default InventoryTable;