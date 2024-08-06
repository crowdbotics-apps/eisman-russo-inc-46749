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

export default function UserManagement() {

  //------------------ State Management ---------------------//

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchedValue, setSearchedValue] = useState('');
  const [roleSelected, setRoleSelected] = useState(null);
  const [statusSelected, setStatusSelected] = useState(null);
  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  const [updateUserModal, setUpdateUserModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const rolesState = useSelector((state) => state.roles.roles);

  const roles = rolesState.map((role) => ({
      label: role.name,
      value: role.id,
    }));
    
  //------------------ Function to Fetch Data ---------------------//

  

 
  const fetchData = async (query = '',page = 1) => {
    main_api.get(`${adminAPIsEndPoints.LIST_USER}?${query}&page=${page}`)
    .then((response) => {
      setCount(response.data.count);
      const result = response.data.results;
      if (result) {
        const transformedData = result.map(item => ({
          key: item?.id, 
          name: item?.name || '---',
          phone_number: item?.phone_number || '---', 
          role: item?.role?.name || '---',
          roleData: item?.role,
          position: item?.position?.name || '---',
          positionData: item?.position,
          email: item?.email || '---',
          status: item?.is_active, 
        }));
        setData(transformedData);
      } else {
        setData([]);
        pushNotification("No data found!", "error");
      }
    }).catch((error) => {
      pushNotification(error.message, "error");
    });
  };

  useEffect(() => {
    fetchData();
  }, []);


  //----------------------- Filter -----------------------//

  useEffect(() => {
    let query = `search=${searchedValue}`;
    if(roleSelected){
      query += `&role=${roleSelected}`;
    }
    if (statusSelected!==null) {
      query+=`&is_active=${statusSelected}`;
    }
    fetchData(query);
  }, [roleSelected, statusSelected, searchedValue]);


  //------------------ Functions for Update User Modal ---------------------//

  const handleEditRow = (user) => {
    if (user) {
        
        setSelectedUser(user);
        setUpdateUserModal(true);
    }
  };

  const handleAddRow = () => {
    setSelectedUser(null);
    setUpdateUserModal(true);
  };


  //-------------------- Function for Change Password Modal -----------------//

  const handleChangePassword = (user) => {
    if (user) {
      setSelectedUser(user);
      setChangePasswordModal(true);
    }
  };

  

  //------------------ Search ---------------------//

  const handleSearch = (value) => {
    if (value) {
      setSearchedValue(value);
    }
  };



  //------------------ Functions to Handle Add and Edit User ---------------------//

  const handleEditUser = async (values, selectedRoleType, selectedPositionName) => {
    
    let payload = {
      name: values?.name || '',
      email: values?.email || '',
      phone_number: values?.telephone_number || '',
      is_active: values?.is_active || false,
      password: values?.password || '',
      confirm_password: values?.confirm_password || '',
      role: values?.role || '',
      position: values?.position || '',
    }
    
    payload = {
      ...payload,
      additional_data: {}
    };

    if (selectedRoleType === "contractor") {
      payload.additional_data.company_name = values?.company_name || '';
      payload.additional_data.prefix = values?.prefix || '';

      if (selectedPositionName === "Sub Contractor") {
        payload.prime_contractor = values?.prime_contractor || '';
      }
    }
    const id = selectedUser.key;
    try {
      const response = await main_api.put(adminAPIsEndPoints.UPDATE_USER(id), payload);
      if (response.status === 200) {
          pushNotification("User updated successfully", "success");
          fetchData();
          setUpdateUserModal(false);
      }
    } catch (error) {
        pushNotification(error.response.data.detail, "error");
    }
  }

  const handleAddUser = async (values, selectedRoleType, selectedPositionName) => {
    let payload = {
      name: values?.name || '',
      email: values?.email || '',
      phone_number: values?.telephone_number || '',
      is_active: values?.is_active || true,
      password: values?.password || '',
      confirm_password: values?.confirm_password || '',
      role: values?.role || '',
      position: values?.position || '',
    }
    
    payload = {
      ...payload,
      additional_data: {}
    };

    if (selectedRoleType === "contractor") {
      payload.additional_data.company_name = values?.company_name || '';
      payload.additional_data.prefix = values?.prefix || '';

      if (selectedPositionName === "Sub Contractor") {
        payload.prime_contractor = values?.prime_contractor || '';
      }
    }
    try {
      const response = await main_api.post(adminAPIsEndPoints.CREATE_USER, payload);
      if (response.status === 201) {
          pushNotification("User added successfully", "success");
          fetchData();
          setUpdateUserModal(false);

      }
    } catch (error) {
        pushNotification(error.response.data.detail, "error");
    }
  }


  return (
    <div style={{ marginTop: '10px' }}>
    <CustomCard style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <Heading text="Manage Users" margin="0px 0px 0px 5px" fontSize="1.3rem" color="#3B3B3B" />
          <CustomButton btnText={"Add User"} color={"white"} onClick={handleAddRow} />
        </div>
        <CustomFilter 
          searchBar={true}
          filter1={true}
          filter2={true}
          resetFilters={true}
          searchBarPlaceholder="Search By Name..."
          filter1Placeholder="Select Role"
          filter2Placeholder="Select Status"
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
            fetchData();
          }}
          filter1Style={{marginLeft:"20px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
          filter2Style={{marginLeft:"8px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
          resetFiltersStyle={{cursor:"pointer",color:"#EE3E41",marginLeft:"15px", marginBottom: "20px", position:"relative", top:"20px", left:"6px", width:"260px", height:"40px"}}
        />
        <AntdesignTablePagination 
          columns={userManagementColumns({handleEditRow,handleChangePassword})} 
          data={data}
          totalCount={count}
          loadPaginatedData={fetchData} 
          allowRowSelection={false}
          tableHeight={500}
          tableWidth={1200} 
        />
    </CustomCard>
    {updateUserModal && <UpdateUser isModalOpen={updateUserModal} title={selectedUser ? "Edit User" : "Add User"} onFinish={selectedUser ? handleEditUser : handleAddUser  } setModalOpen={setUpdateUserModal} editUserValues={selectedUser}/>}
    {changePasswordModal && <ResetPassword isModalOpen={changePasswordModal} setModalOpen={setChangePasswordModal} selectedUser={selectedUser}/>}
  </div>
  )
}

const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B" }) => {
  return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
};

const CustomCard = styled(Card)`
  width: calc(100vw - 40px);
  max-width: 1750px;
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

const SearchInputWrapper = styled.div`
width: 350px;
margin-left: 20px;
`;