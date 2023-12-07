/* UserManagement.js
 * React component to allow user management by admins
*/

import React from 'react';
import GeneralButton from '../components/GeneralButton';
import ScreenTitle from '../components/ScreenTitle';
import EmployeeButton from '../components/EmployeeButton';
import OptionsDropdown from '../components/OptionsDropdown';
import WeatherIcon from '../components/WeatherIcon';
import api from '../api/posts';
import InventoryTable from '../components/InventoryTable';
import ManagerDashboard from '../components/ManagerDashboard';
import AddUser from '../components/AddUser';
import EditUser from '../components/EditUser';
import DeleteUser from '../components/DeleteUser';

function UserManagement() {
    var buttonType = "manager";
    /**
     * State Variables
     * firstOpen: used to render the inventory table if it is the users first open of the page
     * tableData: array of objects used to render the data in the table
     * openAdd: controls whether the AddUser component is open
     * openEdit: controls whether the EditUser component is open
     * openDelete: controls whether the DeleteUser component is open
     * employees: array of objects to be passed into EditUser and DeleteUser to render current users in the database
     * positions: array of objects to be passed into EditUser to render current users in the database
     */
    const [firstOpen, setFirstOpen] = React.useState(true);
    const [tableData, setTableData] = React.useState([]);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [employees, setEmployees] = React.useState([]);
    const [positions, setPositions] = React.useState([]);
    const tableColumns = ['employee_id', 'name', 'address', 'phone_number', 'position'];
    const tableHeader = ['Employee Id', 'Name', 'Address', 'Phone Number', 'Position'];

    /**
     * Function to open the AddUser dialog
     */
    const openDialogAdd = () => {
        setOpenAdd(true);
    }

    /**
     * Function to open the EditUser dialog
     * Queries the database to get an updated list of users to send to the EditUser dialog
     */
    const openDialogEdit = async () => {
        try {
            const employeeList = await api.get('/getEmployee');

            let employeeMap = [];
            let positionMap = []

            for (let i = 0; i < Object.keys(employeeList.data).length; i++) {
                employeeMap.push({label: employeeList.data[i].name + " (" + employeeList.data[i].employee_id + ")", id: employeeList.data[i].employee_id});
            }

            positionMap.push({ label: 'Admin', id: 'a' });
            positionMap.push({ label: 'Manager', id: 'm' });
            positionMap.push({ label: 'Employee', id: 'e' });
            
            setEmployees(employeeMap);
            setPositions(positionMap);

            setOpenEdit(true);
            
        } catch(err) {
            console.log("FAIL");
            setOpenEdit(false);
        }
        setOpenEdit(true);
    }

    /**
     * Function to open the DeleteUser dialog
     * Queries the database to get an updated list of users to send to the DeleteUser dialog
     */
    const openDialogDelete = async () => {
        try {
            const employeeList = await api.get('/getEmployee');

            let employeeMap = [];

            for (let i = 0; i < Object.keys(employeeList.data).length; i++) {
                employeeMap.push({label: employeeList.data[i].name + " (" + employeeList.data[i].employee_id + ")", id: employeeList.data[i].employee_id});
            }

            setEmployees(employeeMap);

            setOpenDelete(true);
        } catch(err) {
            console.log("FAIL");
            setOpenDelete(false);
        }
        
    }

    /**
     * Closes the AddUser dialog by setting openAdd to false
     */
    const closeDialogAdd = () => {
        setOpenAdd(false);
    }

    /**
     * Closes the EditUser Dialog by setting openEdit to false
     */
    const closeDialogEdit = () => {
        setOpenEdit(false);
    }

    /**
     * Closes the DeleteUser Dialog by setting openDelete to false
     */
    const closeDialogDelete = () => {
        setOpenDelete(false);
    }

    /**
     * Function to handle the AddUser confirm
     * Queries the database to get the next available userId
     * Updates the employees table in the databse with the new user
     * @param {object} values - array of values representing the new user details 
     */
    const confirmDialogAdd = async (values) => {
        try {
            let employeeName = values[0];
            let employeeAddress = values[1];
            let employeePhone = values[2];
            let employeePosition = values[3];
            const maxValue = await api.get('/maxEmployee');

            let parameters = [maxValue.data + 1, employeeName, employeeAddress, employeePhone, employeePosition];

            await api.post('/addEmployee', parameters);
            handleViewEmployees();
        } catch (err) {
            console.log("FAIL");
            setOpenAdd(false);
        }
        setOpenAdd(false);
    }

    /**
     * Function to handle the EditUser confirm
     * Updates the selected user with the new values selected from EditUser
     * @param {object} values - array of values representing the new values for the selected user 
     */
    const confirmDialogEdit = async (values) => {
        try {
            let employeeId = values[0];
            let newName = values[1];
            let newAddress = values[2];
            let newPhoneNumber = values[3];
            let newPosition = values[4];

            console.log(employeeId, newName, newAddress, newPhoneNumber, newPosition);
            var updateType;

            if (newName !== '') {
                updateType = 'name';
                let parameters = [updateType, newName, employeeId];
                await api.post('/editEmployee', parameters);
            }
            if (newAddress !== '') {
                updateType = 'address';
                let parameters = [updateType, newAddress, employeeId];
                await api.post('/editEmployee', parameters);
            }
            if (newPhoneNumber !== '') {
                updateType = 'phoneNumber';
                let parameters = [updateType, newPhoneNumber, employeeId];
                await api.post('/editEmployee', parameters);
            }
            if (newPosition !== '') {
                updateType = 'position';
                let parameters = [updateType, newPosition, employeeId];
                await api.post('/editEmployee', parameters);
            }
            handleViewEmployees();
        } catch(err) {
            console.log("FAIL");
            setOpenEdit(false);
        }

        setOpenEdit(false);
    }

    /**
     * Function to handle the DeleteUser confirm
     * Removes the selected user from the employees table
     * @param {object} values - holds the user to be deleted 
     */
    const confirmDialogDelete = async (values) => {
        try {
            await api.post('/deleteEmployee', values);
            handleViewEmployees();
        } catch(err) {
            console.log("FAIL");
            setOpenDelete(false);
        }
        setOpenDelete(false);
    }

    /**
     * Helper function that renders the InventoryTable with the current users
     * Queries the database for a current list of users
     */
    const handleViewEmployees = async () => {
        try {
            const response = await api.get('/getEmployee');
            let tempData = [];
            for (let index = 0; index < Object.keys(response.data).length; index++) {
                tempData.push(response.data[index]);
            }
            setTableData(tempData);
        } catch (err) {
            console.log("FAIL");
        }
    }

    if (firstOpen) {
        handleViewEmployees();
        setFirstOpen(false);
    }

    return(
        <div>
            <AddUser onClose={closeDialogAdd} open={openAdd} onConfirm={confirmDialogAdd}></AddUser>
            <EditUser onClose={closeDialogEdit} open={openEdit} onConfirm={confirmDialogEdit} employees={employees} positions={positions}></EditUser>
            <DeleteUser onClose={closeDialogDelete} open={openDelete} onConfirm={confirmDialogDelete} employees={employees}></DeleteUser>
            <div className="customer-header">
                <WeatherIcon />
                <GeneralButton content="Login" sidePadding={20} route="/login" />
                <ScreenTitle />
                <GeneralButton content="Order" sidePadding={20} route="/menu" />
                <OptionsDropdown sidePadding={20}/>
            </div>
            <body style={{margin: 0, display: 'flex', height: "80vh"}}>
                <div style={{display: 'flex', flexDirection: 'column', margin:10, marginTop:87}}>
                    <EmployeeButton employeeType= {buttonType} onClick={openDialogAdd} content="Add User" />
                    <br/>
                    <EmployeeButton employeeType= {buttonType} onClick={openDialogEdit} content="Edit User" />
                    <br/>
                    <EmployeeButton employeeType= {buttonType} onClick={openDialogDelete} content="Delete User" />
                </div>
                <div style={{flex: 1, marginRight: 50, marginBottom: 20}}>
                    <InventoryTable tableData={tableData} columns={tableColumns} columnHeader={tableHeader}></InventoryTable>
                </div>
            </body>
        </div>
    );
}

export default UserManagement;