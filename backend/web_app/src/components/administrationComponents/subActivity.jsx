import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import styled from 'styled-components';
import HeadingComponent from '../headingComponent/heading';
import { pushNotification } from '../../util/notification';
import CustomButton from '../customButton/customButton';
import { main_api } from '../../api/axiosHelper';
import { adminAPIsEndPoints } from '../../constants/apiEndPoints';
import { AntdesignTablePagination } from '../antDesignTable/AntdesignTablePagination';
import { subActivityColumns } from '../../util/antdTableColumns';
import CustomFilter from '../customFilterWithSearchBar/customFilter';
import { status } from '../../util/dropdownData';
import UpdateSubActivity from '../modals/administration/subActivity/updateSubActivity';

export default function SubActivity() {

  const [data, setData] = useState([]);
  const [searchedValue, setSearchedValue] = useState('');
  const [statusSelected, setStatusSelected] = useState(null);


  const [editSubActivityValues, setEditSubActivityValues] = useState(null);
  const [updateSubActivityModal, setUpdateSubActivityModal] = useState(false);

  const [count, setCount] = useState(0);

 

  const fetchData = async (query = '',page = 1) => {
    main_api.get(`${adminAPIsEndPoints.LIST_SUB_ACTIVITY(query)}&page=${page}`)
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
      
        setEditSubActivityValues(values);
        setUpdateSubActivityModal(true);
    }
  };

  const handleAddRow = () => { 
    setEditSubActivityValues(null);
    setUpdateSubActivityModal(true);
  };



   //------------------ Functions to Handle Add and Edit Sub-Activity ---------------------//
   const handleEditSubActivity = async (values) => {
    const id = editSubActivityValues.id;
    if (values && id) {
      try {
        const response = await main_api.put(adminAPIsEndPoints.UPDATE_SUB_ACTIVITY(id), values);
        if (response.status === 200) {
          pushNotification("Sub-Activity updated successfully!", "success");
          fetchData();
          setUpdateSubActivityModal(false);
        }
      } catch (error) {
        pushNotification(error.response.data.detail, "error");
      }

    }else{
      pushNotification("Please fill all the fields!", "error");
    }
   
  };

  const handleAddSubActivity = async (values) => {
   if (values) { 
      try {
        const response = await main_api.post(adminAPIsEndPoints.ADD_SUB_ACTIVITY, values);
        if (response.status === 201) {
          pushNotification("Sub-Activity added successfully!", "success");
          fetchData();
          setUpdateSubActivityModal(false);
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
          <Heading text="Manage Sub-Activity" margin="0px 0px 0px 5px" fontSize="1.3rem" color="#3B3B3B" />
          <CustomButton btnText={"Add Sub-Activity"} color={"white"} onClick={handleAddRow} />
        </div>
        <CustomFilter 
          searchBar={true}
          filter1={true}
          resetFilters={true}
          searchBarPlaceholder={"Search by Sub-Activity Name..."}
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
          columns={subActivityColumns({handleEditRow})} 
          data={data}
          totalCount={count}
          loadPaginatedData={fetchData} 
          allowRowSelection={false}
          tableHeight={500}
          tableWidth={1200} 
        />
    </CustomCard>

    {updateSubActivityModal && (
      <UpdateSubActivity
        isModalOpen={updateSubActivityModal}
        title={editSubActivityValues ? 'Edit Sub-Activity' : 'Add Sub-Activity'}
        onFinish={editSubActivityValues ? handleEditSubActivity : handleAddSubActivity}
        setModalOpen={setUpdateSubActivityModal}
        editSubActivityValues={editSubActivityValues}  
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