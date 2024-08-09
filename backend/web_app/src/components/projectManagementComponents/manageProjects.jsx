import React, { useEffect, useState } from 'react'
import { Card, Input, Row, Select } from 'antd'
import styled from 'styled-components';
import HeadingComponent from '../../components/headingComponent/heading';
import CustomButton from '../../components/customButton/customButton';
import SearchInput from '../../components/searchInput/SearchInput';
import { userManagementColumns } from '../../util/antdTableColumns';
// import { AntdesignTable } from '../../components/antDesignTable/AntdesignTable';
import { AntdesignTablePagination } from '../../components/antDesignTable/AntdesignTablePagination';
import UpdateUser from '../../components/modals/userManagement/updateUser';
import { pushNotification } from '../../util/notification';
import { useSelector } from 'react-redux';
import { addUser, getUserList, updateUser } from '../../util/dataService';
import { main_api } from '../../api/axiosHelper';
import { adminAPIsEndPoints } from '../../constants/apiEndPoints';
import { status } from '../../util/dropdownData';
import ResetPassword from '../../components/auth/resetPassword';
import CustomFilter from '../../components/customFilterWithSearchBar/customFilter';
import useProjects from '../hooks/useProjects';


export default function ManageProjects() {


  //------------------ State Management ---------------------//

  const [selectedProject, setselectedProject] = useState(null);
  const [searchedValue, setSearchedValue] = useState('');
  const [roleSelected, setRoleSelected] = useState(null);
  const [statusSelected, setStatusSelected] = useState(null);
  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  const [updateProjectModal, setUpdateProjectModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const rolesState = useSelector((state) => state.roles.roles);

  const roles = rolesState.map((role) => ({
      label: role.name,
      value: role.id,
    }));


  //------------------ Custom Hooks ---------------------//
  

  const { projectsData, projectsDataForTable, projectsOptions, fetchProjects, handleEditProject, handleAddProject } = useProjects();
     

  //----------------------- Filter -----------------------//

  useEffect(() => {
    let query = `search=${searchedValue}`;
    if(roleSelected){
      query += `&role=${roleSelected}`;
    }
    if (statusSelected!==null) {
      query+=`&is_active=${statusSelected}`;
    }
    fetchProjects(query);
  }, [roleSelected, statusSelected, searchedValue]);


  //------------------ Functions for Update Projects Modal ---------------------//

  const handleEditRow = (user) => {
    if (user) {
        
        setselectedProject(user);
        setUpdateProjectModal(true);
    }
  };

  const handleAddRow = () => {
    setselectedProject(null);
    setUpdateProjectModal(true);
  };


  //-------------------- Function for View Details Modal -----------------//

  const handleViewDetails = (value) => {
    if (value) {
      setselectedProject(value);
    }
  };



  return (
    <div style={{ marginTop: '10px' }}>
    <CustomCard style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <Heading text="Manage Projects" margin="0px 0px 0px 5px" fontSize="1.3rem" color="#3B3B3B" />
          <CustomButton btnText={"Add New Project"} color={"white"} onClick={handleAddRow} />
        </div>
        <CustomFilter 
          searchBar={true}
          filter1={true}
          filter2={true}
          resetFilters={true}
          searchBarPlaceholder="Search By Name..."
          filter1Placeholder="Event Name"
          filter2Placeholder="Client Name"
          resetFiltersText="Reset Filter"
          filter1Options={roles}
          filter2Options={status}
          onSearchBarBlur={(e) => setSearchedValue(e)}
          onFilter1Change={(e) => setRoleSelected(e)}
          onFilter2Change={(e) => setStatusSelected(e)}
          onResetFiltersClick={() => {
            setRoleSelected(null);
            setStatusSelected(null);
            setSearchedValue('');
            fetchProjects();
          }}
          filter1Style={{marginLeft:"20px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
          filter2Style={{marginLeft:"8px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
          resetFiltersStyle={{cursor:"pointer",color:"#EE3E41",marginLeft:"15px", marginBottom: "20px", position:"relative", top:"20px", left:"6px", width:"260px", height:"40px"}}
        />
        <AntdesignTablePagination 
          columns={userManagementColumns({handleEditRow,handleViewDetails})} 
          data={projectsDataForTable.data}
          totalCount={projectsDataForTable.count}
          loadPaginatedData={fetchProjects} 
          allowRowSelection={false}
          tableHeight={500}
          tableWidth={1200} 
        />
    </CustomCard>
    {/* {updateProjectModal && <UpdateUser isModalOpen={updateProjectModal} title={selectedUser ? "Edit User" : "Add User"} onFinish={selectedUser ? handleEditUser : handleAddUser  } setModalOpen={setUpdateProjectModal} editUserValues={selectedUser}/>}
    {changePasswordModal && <ResetPassword isModalOpen={changePasswordModal} setModalOpen={setChangePasswordModal} selectedUser={selectedUser}/>} */}
  </div>
  )
}



const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B" }) => {
    return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
  };
  
const CustomCard = styled(Card)`
    width: calc(100vw - 40px);
    max-width: 1570px;
    height: calc(100vh - 40px);
    max-height: 750px;
    margin-top: 40px;
    margin-left: 40px;
    background-color: white;
    
    @media (max-width: 768px) {
      width: calc(100vw - 20px);
      height: calc(100vh - 20px);
      margin: 10px;
    }
  `;