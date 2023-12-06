/* ManagerChart.js
 * React component redering a dynamic chart for Product Usage manager query
 */

import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import { BarChart } from '@mui/x-charts/BarChart';
import React from "react";

/**
 * Manager Chart is a custom BarChart component using MUI
 * Requires chart categories and chart data to dynamically render data
 * @param {object} props - Javascript object containing passed in props into ManagerChart component
 * @property {function} props.onClose - function to handle when the dialog is closed
 * @property {boolean} props.open - boolean designating whether the dialog should be open
 * @property {object} props.chartCategories - Javascript object containing the chart categories for the x-axis
 * @property {object} props.columnHeader - Javascript object containing the chart data for the y-axis
 */

function ManagerChart(props) {
    const { onClose, open, chartCategories, chartData} = props;

    const xAxis = chartCategories;

    const series = chartData;

    const handleClose = () => {
        onClose();
    };

    return (
        <Dialog onClose={handleClose} open={open} maxWidth sx={{ backgroundColor: "#F2F1DF"}}>
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
                        color: "#4d969c"
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