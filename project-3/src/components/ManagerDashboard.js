/* ManagerChart.js
 * React component redering a custom dashboard for the manager / inventory view
 */

import React from 'react';
import EmployeeButton from './EmployeeButton';

/**
 * Renders a custom dashboard for the manager / inventory view
 * Routes to the corresponding page
 * @param {object} props - Javascript object containing passed in props into ManagerDashboard component
 */

function ManagerDashboard(props) {
    var buttonType = "manager"; 
    return (
        <body className='customer-header' style={{marginBottom: 20, color: 'black', fontSize: 30, fontWeight: 'bold', display: 'flex', height:"10vh"}}>
        <div style={{borderColor: 'black', borderTop:'solid', borderBottom:'solid', display: 'flex', alignItems:'center', height: "10vh", overflow: 'hidden', marginLeft:100, marginRight: 100, marginTop: 50, marginBottom: 50}}> 
            <EmployeeButton employeeType= {buttonType}  route="/inventory" content="Inventory Management" />
            <EmployeeButton employeeType= {buttonType}  route="/manager" content="Manager Reports" />
        </div>
        </body>
    );
}

export default ManagerDashboard;