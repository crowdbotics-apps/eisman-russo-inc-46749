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
import { addUser, getUserList } from '../../util/dataService';
import { main_api } from '../../api/axiosHelper';
import { adminAPIsEndPoints } from '../../constants/apiEndPoints';
import { status } from '../../util/dropdownData';

export default function UserManagement() {

  //------------------ State Management ---------------------//

  const [selectedUser, setSelectedUser] = useState(null);
  const [searchedValue, setSearchedValue] = useState('');
  const [roleSelected, setRoleSelected] = useState(null);
  const [statusSelected, setStatusSelected] = useState(null);
  const [data, setData] = useState();
  const [count, setCount] = useState(0);
  const [updateUserModal, setUpdateUserModal] = useState(false);
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
          role: item?.role?.name || '---',
          roleId: item?.role?.id || '---',
          position: item?.position?.name || '---',
          positionId: item?.position?.id || '---', 
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

  const handleEditRow = (position) => {
    if (position) {
        setSelectedUser(position);
        setUpdateUserModal(true);
    } else {
        pushNotification("error", "No role selected!");
    }
  };

  const handleAddRow = () => {
    setSelectedUser(null);
    setUpdateUserModal(true);
  };


  //------------------ Search ---------------------//

  const handleSearch = (value) => {
    if (value) {
      setSearchedValue(value);
    }
  };



  //------------------ Functions to Handle Add and Edit User ---------------------//

  const handleEditUser = (values) => {
    const payload = {
      email: values?.email || '',
      password: values?.password || '',
      confirm_password: values?.confirm_password || '',
      role: values?.role || '',
      position: values?.position || '',
      prime_contractor: values?.prime_contractor || '',
      additional_data:{
          company_name: values?.company_name || '',
          prefix: values?.prefix || '',
      },
    }
    // addUser(selectedUser.key, payload);
    setUpdateUserModal(false);
  }

  const handleAddUser = (values) => {
    const payload = {
      email: values?.email || '',
      password: values?.password || '',
      confirm_password: values?.confirm_password || '',
      role: values?.role || '',
      position: values?.position || '',
      prime_contractor: values?.prime_contractor || '',
      additional_data:{
          company_name: values?.company_name || '',
          prefix: values?.prefix || '',
      },
    }
    // addUser(payload);
    setUpdateUserModal(false);
  }


  return (
    <div style={{ marginTop: '10px' }}>
    <CustomCard style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <Heading text="Manage Users" margin="0px 0px 0px 20px" fontSize="1.3rem" color="#3B3B3B" />
          <CustomButton btnText={"Add User"} color={"white"} onClick={handleAddRow} />
        </div>
        <div style={{display:"flex", flexDirection:"row"}}>

        <SearchInputWrapper>
            <SearchInput onBlur={(e) => handleSearch(e.target.value)} placeholder="Search By Name..." />
        </SearchInputWrapper>
        <Select 
          placeholder="Select" 
          options={roles}
          onChange={(e)=>{ 
            setRoleSelected(e);
          }} 
          style={{marginLeft:"20px",position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
        />
        <Select 
          placeholder="Select" 
          options={status} 
          onChange={(e)=>{
            setStatusSelected(e); 
          }} 
          style={{marginLeft:"8px",position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
        />
        <div style={{marginLeft:"8px",position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}>

        <CustomButton
          btnText={"Reset Filter"}
          color={"red"}
          margin="0px 5px"
          noBackground
          hideIcon={true}
          onClick={() => {
            setRoleSelected(null);
            setStatusSelected(null);
            setSearchedValue('');
            fetchData();
          }}
        />
        </div>
        </div>
        <AntdesignTablePagination 
          columns={userManagementColumns({handleEditRow})} 
          data={data}
          totalCount={count}
          loadPaginatedData={fetchData} 
          allowRowSelection={false} 
        />
    </CustomCard>
    {updateUserModal && <UpdateUser isModalOpen={updateUserModal} title={selectedUser ? "Edit User" : "Add User"} onFinish={selectedUser ? handleEditUser : handleAddUser  } setModalOpen={setUpdateUserModal} editUserValues={selectedUser}/>}
  </div>
  )
}

const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B" }) => {
  return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
};

const CustomCard = styled(Card)`
  width: calc(100vw - 40px);
  max-width: 1605px;
  height: calc(100vh - 40px);
  max-height: 710px;
  margin: 20px;
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