import React from 'react';
import GeneralButton from '../components/GeneralButton';
import HamburgerButton from '../components/HamburgerButton';
import ScreenTitle from '../components/ScreenTitle';
import weatherLogo from '../assets/weather-icon.png';
import EmployeeButton from '../components/EmployeeButton';
import OptionsDropdown from '../components/OptionsDropdown';
import api from '../api/posts';
import AddItem from '../components/AddItem';
import EditItem from '../components/EditItem';
import InventoryTable from '../components/InventoryTable';
import DeleteItem from '../components/DeleteItem';
import ManagerDashboard from '../components/ManagerDashboard';
import AddUser from '../components/AddUser';

function UserManagement() {
    var buttonType = "manager";
    const [firstOpen, setFirstOpen] = React.useState(true);
    const [tableData, setTableData] = React.useState([]);
    const [openAdd, setOpenAdd] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const tableColumns = ['employee_id', 'name', 'address', 'phone_number', 'position'];
    const tableHeader = ['Employee Id', 'Name', 'Address', 'Phone Number', 'Position'];

    const openDialogAdd = () => {
        setOpenAdd(true);
    }

    const openDialogEdit = () => {

    }

    const openDialogDelete = () => {

    }

    const closeDialogAdd = () => {
        setOpenAdd(false);
    }

    const closeDialogEdit = () => {

    }

    const closeDialogDelete = () => {

    }

    const confirmDialogAdd = (values) => {
        setOpenAdd(false);
    }

    const confirmDialogEdit = () => {

    }

    const confirmDialogDelete = () => {

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
            <div className="customer-header">
                <HamburgerButton />
                <GeneralButton content="Translate" sidePadding={35} />
                <img className="weather-logo" src={weatherLogo} alt="Icon representing weather"/>
                <ScreenTitle />
                <GeneralButton content="Login" sidePadding={20} />
                <GeneralButton content="Order" sidePadding={20} />
                <OptionsDropdown sidePadding={20}/>
            </div>
            <ManagerDashboard />
            <body style={{margin: 0, display: 'flex', height: "80vh"}}>
                <div style={{display: 'flex', flexDirection: 'column', margin:10, marginTop:87}}>
                    <EmployeeButton employeeType= {buttonType} onClick={openDialogAdd} content="Add Item" />
                    <br/>
                    <EmployeeButton employeeType= {buttonType} onClick={openDialogEdit} content="Edit Item" />
                    <br/>
                    <EmployeeButton employeeType= {buttonType} onClick={openDialogDelete} content="Delete Item" />
                </div>
                <div style={{flex: 1, marginRight: 50, marginBottom: 20}}>
                    <InventoryTable tableData={tableData} columns={tableColumns} columnHeader={tableHeader}></InventoryTable>
                </div>
            </body>
        </div>
    );
}

export default UserManagement;