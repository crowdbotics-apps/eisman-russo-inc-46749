import React, { useEffect, useState } from 'react'
import { Card, Divider } from 'antd'
import styled from 'styled-components';
import HeadingComponent from '../headingComponent/heading';
import SearchInput from '../searchInput/SearchInput';
import { AntdesignTable } from '../antDesignTable/AntdesignTable';
import { userRolesColumns } from '../../util/antdTableColumns';
import { pushNotification } from '../../util/notification';
import { getRoles } from "../../redux/slices/roles";
import { getUserRoleList } from '../../util/dataService';
import { useDispatch, useSelector } from 'react-redux';
import CustomFilter from '../customFilterWithSearchBar/customFilter';

export default function UserRole({editUserRoleNameModal,setEditUserRoleNameModal}) {
  const [selectedRole, setSelectedRole] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState();
  
  const dispatch = useDispatch();
  const rolesState = useSelector((state) => state.roles.roles);
  
  
 useEffect(() => {
    const fetchData = async () => {
      await dispatch(getRoles());
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    setData(rolesState);
    setFilteredData(rolesState);
  }, [rolesState]);


  const handleEditRow = (role) => {
    if (role) {
        setSelectedRole(role);
        setEditUserRoleNameModal(true);
    } else {
        pushNotification("error", "No role selected!");
    }
  };

  const handleSearch = (value) => {
    if (value) {
    const filteredData = rolesState?.filter(role => {
      const matchedRoles = value ? role.name.toLowerCase().includes(value.toLowerCase()) : true;
      return matchedRoles;
    });
    setFilteredData(filteredData);
    }else{
      setFilteredData(rolesState);
    }
  };


 
  return (
    <CustomCard style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <Heading text="Manage User Roles" margin="0px 0px 15px 5px" fontSize="1.3rem" color="#3B3B3B" />
        <CustomFilter
          searchBar={true}
          filter1={false}
          filter2={false}
          resetFilters={false}
          searchBarPlaceholder="Search By Role Name..."
          onSearchBarBlur={(e) => handleSearch(e)}
         />
        <AntdesignTable columns={userRolesColumns} data={filteredData} allowMultieSelectRows={false} pagination={false}/>
    </CustomCard>
  )
}

const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B" }) => {
    return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
  };

  
// const CustomCard = styled(Card)`
//   width: 1274px;
//   height: 760px;
//   margin-right: 10px;
//   margin-left: 20px;
//   background-color: white;
// `;

const CustomCard = styled(Card)`
  width: calc(100vw - 40px);
  max-width: 1474px;
  height: calc(100vh - 40px);
  max-height: 720px;
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
  margin-left: 10px;
`;



