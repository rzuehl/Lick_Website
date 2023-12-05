import React from "react";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, createTheme } from "@mui/material";

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