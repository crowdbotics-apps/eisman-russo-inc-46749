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
import { debrisTypeColumns } from '../../util/antdTableColumns';
import CustomFilter from '../customFilterWithSearchBar/customFilter';
import { status } from '../../util/dropdownData';
import UpdateDebrisType from '../modals/administration/debrisType/updateDebrisType';

export default function DebrisType() {

  const [data, setData] = useState([]);
  const [searchedValue, setSearchedValue] = useState('');
  const [statusSelected, setStatusSelected] = useState(null);


  const [editDebrisValues, setEditDebrisValues] = useState(null);
  const [updateDebrisModal, setUpdateDebrisModal] = useState(false);

  const [count, setCount] = useState(0);

 

  const fetchData = async (query = '',page = 1) => {
    main_api.get(`${adminAPIsEndPoints.LIST_DEBRIS(query)}&page=${page}`)
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


  const handleEditRow = (position) => {
    if (position) {
        setEditDebrisValues(position);
        setUpdateDebrisModal(true);
    }
  };

  const handleAddRow = () => { 
    setEditDebrisValues(null);
    setUpdateDebrisModal(true);
  };



   //------------------ Functions to Handle Add and Edit Debris Type ---------------------//
   const handleEditDebrisType = async (values) => {
    // const id = editPositionValues.id;
    // try {
    //   await updateUserPosition(id, values);
    //   fetchData(); // Make sure this is being called after update
    // } catch (error) {
    //   console.error('Error updating debris type:', error);
    // }
    setUpdateDebrisModal(false);
  };

  const handleAddDebrisType = async (values) => {
    try {
      await addUserPosition(values);
      fetchData(); // Make sure this is being called after add
    } catch (error) {
      console.error('Error adding debris type:', error);
    }
    setUpdateDebrisModal(false);
  };

  return (
    <>
    
    <CustomCard style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <Heading text="Manage Debris Type" margin="0px 0px 0px 20px" fontSize="1.3rem" color="#3B3B3B" />
          <CustomButton btnText={"Add Debris Type"} color={"white"} onClick={handleAddRow} />
        </div>
        <CustomFilter 
          searchBar={true}
          filter1={true}
          resetFilters={true}
          searchBarPlaceholder={"Search by Debris Name..."}
          filter1Placeholder={"Select Status"}
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
          columns={debrisTypeColumns({handleEditRow})} 
          data={data}
          totalCount={count}
          loadPaginatedData={fetchData} 
          allowRowSelection={false}
          tableHeight={500}
          tableWidth={1200} 
        />
    </CustomCard>

    {updateDebrisModal && (
       <UpdateDebrisType/>
      )}
    </>
  )
}

const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B" }) => {
  return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
};


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
margin-left: 20px;
`;