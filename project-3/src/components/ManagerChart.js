import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import React from "react";


function ManagerChart(props) {
    const { onClose, open, chartCategories, chartData} = props;

    const xAxis = chartCategories;

    const series = chartData;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} maxWidth sx={{ backgroundColor: "#FFFDD0"}}>
            <DialogContent>
                <BarChart
                    xAxis={[
                        {
                        id: 'barCategories',
                        data: xAxis,
                        scaleType: 'band',
                        },
                    ]}
                    series={[
                        {
                        data: series,
                        color: "#7EEAFF"
                        },
                    ]}
                    width={1500}
                    height={600}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ManagerChart;