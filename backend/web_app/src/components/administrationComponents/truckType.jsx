import React, { useEffect, useState } from 'react'
import { Card, Input, Select } from 'antd'
import styled from 'styled-components';
import HeadingComponent from '../headingComponent/heading';
import SearchInput from '../searchInput/SearchInput';
import { AntdesignTable } from '../antDesignTable/AntdesignTable';
import { pushNotification } from '../../util/notification';
import CustomButton from '../customButton/customButton';
import { addUserPosition, getUserPositionList, updateUserPosition } from '../../util/dataService';
import { useSelector } from 'react-redux';
import { main_api } from '../../api/axiosHelper';
import { adminAPIsEndPoints } from '../../constants/apiEndPoints';
import { AntdesignTablePagination } from '../antDesignTable/AntdesignTablePagination';
import UpdatePosition from '../modals/administration/position/updatePosition';
import { debrisTypeColumns, truckTypeColumns } from '../../util/antdTableColumns';
import CustomFilter from '../customFilterWithSearchBar/customFilter';
import { status } from '../../util/dropdownData';
import UpdateDebrisType from '../modals/administration/debrisType/updateDebrisType';
import UpdateTruckType from '../modals/administration/truckType/updateTruckType';


export default function TruckType() {

  const [data, setData] = useState([]);
  const [searchedValue, setSearchedValue] = useState('');
  const [statusSelected, setStatusSelected] = useState(null);


  const [editTruckTypeValues, setEditTruckTypeValues] = useState(null);
  const [updateTruckTypeModal, setUpdateTruckTypeModal] = useState(false);

  const [count, setCount] = useState(0);

 

  const fetchData = async (query = '',page = 1) => {
    main_api.get(`${adminAPIsEndPoints.LIST_TRUCK_TYPE(query)}&page=${page}`)
    .then((response) => {
      setCount(response.data.count);
      const result = response.data.results;
      setData(result);
    }).catch((error) => {
      pushNotification(error, "error");
    });
  };
    
  useEffect(() => {

    fetchData();
  }, []);

   //----------------------- Filter -----------------------//

   useEffect(() => {
    let query = `search=${searchedValue}`;
    if (statusSelected!==null) {
      query+=`&is_active=${statusSelected}`;
    }
    fetchData(query);
  }, [statusSelected, searchedValue]);


  const handleEditRow = (values) => {
    
    if (values) {
      
        setEditTruckTypeValues(values);
        setUpdateTruckTypeModal(true);
    }
  };

  const handleAddRow = () => { 
    setEditTruckTypeValues(null);
    setUpdateTruckTypeModal(true);
  };



   //------------------ Functions to Handle Add and Edit Truck Type ---------------------//
  
  const handleEditTruckType = async (values) => {
    const id = editTruckTypeValues.id;
    if (values && id) {
      try {
        const response = await main_api.put(adminAPIsEndPoints.UPDATE_TRUCK_TYPE(id), values);
        if (response.status === 200) {
          pushNotification("Truck Type updated successfully!", "success");
          fetchData();
          setUpdateTruckTypeModal(false);
        }
      } catch (error) {
        pushNotification(error.response.data.detail, "error");
      }

    }else{
      pushNotification("Please fill all the fields!", "error");
    }
   
  };

  const handleAddTruckType = async (values) => {
   if (values) {    
      try {
        const response = await main_api.post(adminAPIsEndPoints.ADD_TRUCK_TYPE, values);
        if (response.status === 201) {
          pushNotification("Truck Type added successfully!", "success");
          fetchData();
          setUpdateTruckTypeModal(false);
        }
      } catch (error) {
        pushNotification(error.response.data.detail, "error");
      }
      
    }else{
      pushNotification("Please fill all the fields!", "error");
    }
  };

  return (
    <>
    
    <CustomCard style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <Heading text="Manage Truck Type" margin="0px 0px 0px 5px" fontSize="1.3rem" color="#3B3B3B" />
          <CustomButton btnText={"Add Truck Type"} color={"white"} onClick={handleAddRow} />
        </div>
        <CustomFilter 
          searchBar={true}
          filter1={true}
          resetFilters={true}
          searchBarPlaceholder={"Search by Truck Type..."}
          filter1Placeholder={"Status"}
          resetFiltersText='Reset Filter'
          filter1Options={status}
          onSearchBarBlur={(e) => setSearchedValue(e)}
          onFilter1Change={(e) => setStatusSelected(e)}
          onResetFiltersClick={() => {
            setSearchedValue('');
            setStatusSelected(null);
            fetchData();
          }}
          filter1Style={{marginLeft:"20px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
          resetFiltersStyle={{cursor:"pointer",color:"#EE3E41",marginLeft:"15px", marginBottom: "20px", position:"relative", top:"20px", left:"6px", width:"260px", height:"40px"}}
        />
        <AntdesignTablePagination 
          columns={truckTypeColumns({handleEditRow})} 
          data={data}
          totalCount={count}
          loadPaginatedData={fetchData} 
          allowRowSelection={false}
          tableHeight={450}
          tableWidth={1200} 
        />
    </CustomCard>

    {updateTruckTypeModal && (
      <UpdateTruckType
        isModalOpen={updateTruckTypeModal}
        title={editTruckTypeValues ? 'Edit Truck Type' : 'Add Truck Type'}
        onFinish={editTruckTypeValues ? handleEditTruckType : handleAddTruckType}
        setModalOpen={setUpdateTruckTypeModal}
        editTruckTypeValues={editTruckTypeValues}  
      />
      )}
    </>
  )
}


const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B" }) => {
  return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
};


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

