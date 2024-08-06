import React, { useEffect, useState } from 'react'
import { Card, Input, Select } from 'antd'
import styled from 'styled-components';
import HeadingComponent from '../headingComponent/heading';
import SearchInput from '../searchInput/SearchInput';
import { AntdesignTable } from '../antDesignTable/AntdesignTable';
import { userPositionsColumns } from '../../util/antdTableColumns';
import { pushNotification } from '../../util/notification';
import CustomButton from '../customButton/customButton';
import { accessPermission } from '../../util/dropdownData';
import { addUserPosition, getUserPositionList, updateUserPosition } from '../../util/dataService';
import { useSelector } from 'react-redux';
import { main_api } from '../../api/axiosHelper';
import { adminAPIsEndPoints } from '../../constants/apiEndPoints';
import { AntdesignTablePagination } from '../antDesignTable/AntdesignTablePagination';
import UpdatePosition from '../modals/administration/position/updatePosition';
import CustomFilter from '../customFilterWithSearchBar/customFilter';

export default function Position({}) {
  const [data, setData] = useState([]);
  const [searchedValue, setSearchedValue] = useState('');
  const [roleSelected, setRoleSelected] = useState(null);
  const [accessPermissionSelected, setAccessPermissionSelected] = useState(null);


  const [editPositionValues, setEditPositionValues] = useState(null);
  const [updatePositionModal, setUpdatePositionModal] = useState(false);

  const [count, setCount] = useState(0);
  const rolesState = useSelector((state) => state.roles.roles);

  const roles = rolesState.map((role) => {
    return {
      label: role.name,
      value: role.id,
    };
  });

  const fetchData = async (query = '',page = 1) => {
    main_api.get(`${adminAPIsEndPoints.LIST_POSITION(query)}&page=${page}`)
    .then((response) => {
      setCount(response.data.count);
      const result = response.data.results;
      result?.map((item) => {
        item.userType = item.role.name;
        item.platform_type = item.platform_type.charAt(0).toUpperCase() + item.platform_type.slice(1);
      });
      setData(result);
    }).catch((error) => {
      pushNotification("error", error);
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
    if (accessPermissionSelected) {
      query+=`&platform_type=${accessPermissionSelected}`;
    }
    fetchData(query);
  }, [roleSelected, accessPermissionSelected, searchedValue]);


  const handleEditRow = (position) => {
    if (position) {
        setEditPositionValues(position);
        setUpdatePositionModal(true);
    } else {
        pushNotification("error", "No role selected!");
    }
  };

  const handleAddRow = () => { 
    setEditPositionValues(null);
    setUpdatePositionModal(true);
  };


   //------------------ Functions to Handle Add and Edit User Position ---------------------//
  //  const handleEditPosition = async (values) => {
  //   const id = editPositionValues.id;
  //   try {
      
  //     await updateUserPosition(id, values);
      
  //     fetchData(); // Make sure this is being called after update
  //   } catch (error) {
  //     console.error('Error updating position:', error);
  //   }
  //   setUpdatePositionModal(false);
  // };

  const handleEditPosition = async (values) => {
    const id = editPositionValues.id;
   
    try {
      const response = await main_api.put(adminAPIsEndPoints.UPDATE_POSITION(id), values);
      if (response.status === 200) {
        pushNotification("User position updated successfully", "success");
        fetchData();
        setUpdatePositionModal(false);
      }
    } catch (error) {
      pushNotification(error.response.data.detail, "error");

    }
      
    
    
  };


  const handleAddPosition = async (values) => {
    try {
      const response = await main_api.post(adminAPIsEndPoints.ADD_POSITION, values);
      if (response.status === 201) {
          pushNotification("User position added successfully", "success");
          fetchData(); 
          setUpdatePositionModal(false);
      }
    } catch (error) {
            pushNotification(error.response.data.detail, "error");
    }
  
  };



  return (
    <>
    
    <CustomCard style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <Heading text="Manage User Position" margin="0px 0px 0px 5px" fontSize="1.3rem" color="#3B3B3B" />
          <CustomButton btnText={"Add Position"} color={"white"} onClick={handleAddRow} />
        </div>
        <CustomFilter
          searchBar={true}
          filter1={true}
          filter2={true}
          resetFilters={true}
          searchBarPlaceholder="Search By Position Name..."
          filter1Placeholder="Select Role"
          filter2Placeholder="Select Access Permission"
          resetFiltersText="Reset Filter"
          filter1Options={roles}
          filter2Options={accessPermission}
          onSearchBarBlur={(e) => setSearchedValue(e)}
          onFilter1Change={(e) => setRoleSelected(e)}
          onFilter2Change={(e) => setAccessPermissionSelected(e)}
          onResetFiltersClick={() => {
            setRoleSelected(null);
            setAccessPermissionSelected(null);
            setSearchedValue('');
            fetchData();
          }}
          filter1Style={{marginLeft:"20px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
          filter2Style={{marginLeft:"8px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
          resetFiltersStyle={{cursor:"pointer",color:"#EE3E41",marginLeft:"15px", marginBottom: "20px", position:"relative", top:"20px", left:"6px", width:"260px", height:"40px"}}
        />
        <AntdesignTablePagination 
          columns={userPositionsColumns({rolesState,handleEditRow})} 
          data={data}
          totalCount={count}
          loadPaginatedData={fetchData} 
          allowRowSelection={false}
          pageSize={10}
          tableHeight={450}
          tableWidth={1200}
        />
    </CustomCard>

    {updatePositionModal && (
        <UpdatePosition
          isModalOpen={updatePositionModal}
          title={editPositionValues ? 'Edit Position' : 'Add Position'}
          onFinish={editPositionValues ? handleEditPosition : handleAddPosition}
          setModalOpen={setUpdatePositionModal}
          editPositionValues={editPositionValues}
        />
      )}
    </>
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
  max-width: 1270px;
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
margin-left: 20px;
`;