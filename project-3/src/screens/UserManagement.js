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
    const [firstOpen, setFirstOpen] = React.useState(true);
    const [tableData, setTableData] = React.useState([]);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [employees, setEmployees] = React.useState([]);
    const [positions, setPositions] = React.useState([]);
    const tableColumns = ['employee_id', 'name', 'address', 'phone_number', 'position'];
    const tableHeader = ['Employee Id', 'Name', 'Address', 'Phone Number', 'Position'];

    const openDialogAdd = () => {
        setOpenAdd(true);
    }

    const openDialogEdit = async () => {
        try {
            const employeeList = await api.get('/getEmployee');

            let employeeMap = [];
            let positionMap = []

            for (let i = 0; i < Object.keys(employeeList.data).length; i++) {
                employeeMap.push({label: employeeList.data[i].name + " (" + employeeList.data[i].employee_id + ")", id: employeeList.data[i].employee_id});
                if (!positionMap.some(item => item.id === employeeList.data[i].position)) {
                    if (employeeList.data[i].position === 'm') {
                        positionMap.push({ label: 'Manager', id: employeeList.data[i].position });
                    }
                    else {
                        positionMap.push({ label: 'Employee', id: employeeList.data[i].position });
                    }
                }
            }

            setEmployees(employeeMap);
            setPositions(positionMap);

            setOpenEdit(true);
            
        } catch(err) {
            console.log("FAIL");
            setOpenEdit(false);
        }
        setOpenEdit(true);
    }

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

    const closeDialogAdd = () => {
        setOpenAdd(false);
    }

    const closeDialogEdit = () => {
        setOpenEdit(false);
    }

    const closeDialogDelete = () => {
        setOpenDelete(false);
    }

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
            <ManagerDashboard />
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