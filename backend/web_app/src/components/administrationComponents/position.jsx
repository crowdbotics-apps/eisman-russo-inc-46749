import React, { useEffect, useState } from 'react'
import { Card, Input, Select } from 'antd'
import styled from 'styled-components';
import HeadingComponent from '../headingComponent/heading';
import SearchInput from '../searchInput/SearchInput';
import { AntdesignTable } from '../antDesignTable/AntdesignTable';
import { userPositionsColumns } from '../../util/antdTableColumns';
import { pushNotification } from '../../util/notification';
import CustomButton from '../customButton/customButton';

export default function Position() {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const data = [
    { 
      key: '1', 
      userType: 'E&R User', 
      positionName: 'Test', 
      accessPermission: 'Mobile' 
    },
    { 
      key: '2', 
      userType: 'E&R User', 
      positionName: 'Data Manager', 
      accessPermission: 'Web' 
    },
    { 
      key: '3', 
      userType: 'E&R User', 
      positionName: 'Monitor', 
      accessPermission: 'Both' 
    },
    { 
      key: '4', 
      userType: 'Guest', 
      positionName: 'Field Supervisor', 
      accessPermission: 'Read-Only Access' 
    },
    { 
      key: '5', 
      userType: 'E&R User', 
      positionName: 'Data Entry', 
      accessPermission: 'Web' 
    },
    { 
      key: '6', 
      userType: 'User', 
      positionName: 'Field Supervisor', 
      accessPermission: 'Both' 
    },
    { 
      key: '7', 
      userType: 'E&R User', 
      positionName: 'Data Supervisor', 
      accessPermission: 'Mobile' 
    },
    { 
      key: '8', 
      userType: 'E&R User', 
      positionName: 'Data Supervisor', 
      accessPermission: 'Both' 
    },
  ];
  
  const roles = [
    { label: "Client", value: "Client" },
    { label: "Contractor", value: "Contractor" },
    { label: "E&R Sub Consultant", value: "E&R Sub Consultant" },
    { label: "E&R User", value: "E&R User" },
  ];
  const accessPermission = [
    { label: "Web", value: "Web" },
    { label: "Mobile", value: "Mobile" },
    { label: "Both", value: "Both" },
  ];
  useEffect(() => {
    setFilteredData(data);
  }, []);


  const handleEditRow = (position) => {
    if (position) {
        setSelectedPosition(position);
        // setEditUserRoleNameModal(true);
    } else {
        pushNotification("error", "No role selected!");
    }
  };

  const handleSearch = (value) => {
    if (value) {
    const filteredData = data.filter(position => {
      const matchedPositions = value ? position.positionName.toLowerCase().includes(value.toLowerCase()) : true;
      return matchedPositions;
    });
    setFilteredData(filteredData);
    }
  };

  return (
    <CustomCard style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <Heading text="Manage User Position" margin="0px 0px 0px 20px" fontSize="1.3rem" color="#3B3B3B" />
          <CustomButton btnText={"Add Position"} color={"white"} />
        </div>
        <div style={{display:"flex", flexDirection:"row"}}>

        <SearchInputWrapper>
            <SearchInput onChange={(e) => handleSearch(e)} placeholder="Search By Position Name..." />
        </SearchInputWrapper>
        <Select  placeholder="Select" options={roles} style={{marginLeft:"20px",position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}} />
        <Select  placeholder="Select" options={accessPermission} style={{marginLeft:"8px",position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}} />
        </div>
        <AntdesignTable columns={userPositionsColumns({handleEditRow})} data={filteredData} allowMultieSelectRows={false} pagination={true}/>
    </CustomCard>
  )
}

const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B" }) => {
  return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
};


// const CustomCard = styled(Card)`
// width: 1274px;
// height: 760px;
// margin-right: 10px;
// margin-left: 20px;
// background-color: white;
// `;

const CustomCard = styled(Card)`
  width: calc(100vw - 40px);
  max-width: 1274px;
  height: calc(100vh - 40px);
  max-height: 760px;
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