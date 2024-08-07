import React, { useEffect, useState } from 'react'
import { Card } from 'antd'
import styled from 'styled-components';
import HeadingComponent from '../../components/headingComponent/heading';
import CustomButton from '../../components/customButton/customButton';
import { eventManagementColumns } from '../../util/antdTableColumns';
import { AntdesignTablePagination } from '../../components/antDesignTable/AntdesignTablePagination';
import { pushNotification } from '../../util/notification';
import { main_api } from '../../api/axiosHelper';
import { adminAPIsEndPoints } from '../../constants/apiEndPoints';
import { status } from '../../util/dropdownData';
import CustomFilter from '../../components/customFilterWithSearchBar/customFilter';
import PermissionModal from '../../components/modals/permission/permissionModal';
import UpdateEvent from '../../components/modals/eventManagement/updateEvent';

export default function EventManagement() {

    //------------------ State Management ---------------------//

    const [data, setData] = useState();
    const [searchedValue, setSearchedValue] = useState('');
    const [eventDateSelected, setEventDateSelected] = useState(null);
    const [statusSelected, setStatusSelected] = useState(null);

    const [editEventValues, setEditEventValues] = useState(null);
    const [updateEventModal, setUpdateEventModal] = useState(false);    
    const [deleteEventModal, setDeleteEventModal] = useState(false);    
    
    const [count, setCount] = useState(0);
  
    
      
    //------------------ Function to Fetch Data ---------------------//
  
    
  
   
    const fetchData = async (query = '',page = 1) => {
      main_api.get(`${adminAPIsEndPoints.LIST_EVENT(query)}&page=${page}`)
      .then((response) => {
        setCount(response.data.count);
        const result = response.data.results;
        if (result) {
          setData(result);
        } else {
          setData([]);
          pushNotification("No data found!", "error");
        }
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
      if(eventDateSelected){
        query += `&event_date=${eventDateSelected}`;
      }
      if (statusSelected!==null) {
        query+=`&is_active=${statusSelected}`;
      }
      fetchData(query);
    }, [eventDateSelected, statusSelected, searchedValue]);
  
  
    //------------------ Functions for Update & Delete Event Modal ---------------------//
  
    const handleAddRow = () => {
      setEditEventValues(null);
      setUpdateEventModal(true);
    };


    const handleEditRow = (values) => {
      if (values) {
          setEditEventValues(values);
          setUpdateEventModal(true);
      }
    };

    const handleDeleteRow = (values) => {
      if (values) {
          setEditEventValues(values);
          setDeleteEventModal(true);
      }
    };
  
  
  
  
    //------------------ Functions to Handle Add, Edit and Delete Event ---------------------//
  
    const handleAddEvent = async (values) => {
      const payload = {
        name: values?.name || '',
        event_date: values?.event_date ? values.event_date.format("YYYY-MM-DD") : '',
        declaration_date: values?.declaration_date ? values.declaration_date.format("YYYY-MM-DD") : '',
        is_active: values?.is_active || true,
        notes: values?.notes || '',
        fema_dates: values?.fema_dates
          ? values.fema_dates.map((fema_date) => ({
              ...fema_date,
              start_date: fema_date.start_date ? fema_date.start_date.format("YYYY-MM-DD") : '',
              end_date: fema_date.end_date ? fema_date.end_date.format("YYYY-MM-DD") : '',
              percentage: fema_date.percentage || 1,
            }))
          : [{}],
      };
      
      try {
        const response = await main_api.post(adminAPIsEndPoints.ADD_EVENT, payload);
        if (response.status === 201) {
            pushNotification("Event created successfully", "success");
            fetchData();
            setUpdateEventModal(false);
  
        }
      } catch (error) {
          pushNotification(error.response.data.detail, "error");
      }
    }

    const handleEditEvent = async (values) => {
      
      const payload = {
        name: values?.name || '',
        event_date: values?.event_date ? values.event_date.format("YYYY-MM-DD") : '',
        declaration_date: values?.declaration_date ? values.declaration_date.format("YYYY-MM-DD") : '',
        is_active: values?.is_active,
        notes: values?.notes || '',
        fema_dates: values?.fema_dates
          ? values.fema_dates.map((fema_date) => ({
              ...fema_date,
              start_date: fema_date.start_date ? fema_date.start_date.format("YYYY-MM-DD") : '',
              end_date: fema_date.end_date ? fema_date.end_date.format("YYYY-MM-DD") : '',
              percentage: fema_date.percentage || 1,
            }))
          : [{}],
      };
      const id = editEventValues.id;
      try {
        const response = await main_api.put(adminAPIsEndPoints.UPDATE_EVENT(id), payload);
        if (response.status === 200) {
            pushNotification("Event updated successfully", "success");
            fetchData();
            setUpdateEventModal(false);
        }
      } catch (error) {
          pushNotification(error.response.data.detail, "error");
      }
    }

    const handleDeleteEvent = async () => {
      const id = editEventValues.id;
      try {
        const response = await main_api.delete(adminAPIsEndPoints.DELETE_EVENT(id));
        console.log("response",response);
        
        if (response.status === 200) {
            pushNotification("Event deleted successfully", "success");
            fetchData();
            setDeleteEventModal(false);
        }
      } catch (error) {
          pushNotification(error.response.data.detail, "error");
      }
    }
  
  

  return (
    <div style={{ marginTop: '10px' }}>
    <CustomCard style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <Heading text="Event List" margin="0px 0px 0px 5px" fontSize="1.3rem" color="#3B3B3B" />
          <CustomButton btnText={"Add New Event"} color={"white"} onClick={handleAddRow} />
        </div>
        <CustomFilter 
          searchBar={true}
          filter1={true}
          dateFilter={true}
          resetFilters={true}
          searchBarPlaceholder="Search By Event Name..."
          filter1Placeholder="Status"
          dateFilterPlaceholder="Event Date"
          resetFiltersText="Reset Filter"
          filter1Options={status}
          onSearchBarBlur={(e) => setSearchedValue(e)}
          onFilter1Change={(e) => setStatusSelected(e)}
          onDateFilterChange={(e) => setEventDateSelected(e)}
          onResetFiltersClick={() => {
            setEventDateSelected(null);
            setStatusSelected(null);
            setSearchedValue('');
            fetchData();
          }}
          filter1Style={{marginLeft:"20px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
          dateFilterStyle={{marginLeft:"8px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
          resetFiltersStyle={{cursor:"pointer",color:"#EE3E41",marginLeft:"15px", marginBottom: "20px", position:"relative", top:"20px", left:"6px", width:"260px", height:"40px"}}
        />
        <AntdesignTablePagination 
          columns={eventManagementColumns({handleEditRow,handleDeleteRow})} 
          data={data}
          totalCount={count}
          loadPaginatedData={fetchData} 
          allowRowSelection={false}
          tableHeight={500}
          tableWidth={1200} 
        />
    </CustomCard>
    {updateEventModal && 
      <UpdateEvent 
        isModalOpen={updateEventModal} 
        title={editEventValues ? "Edit Event" : "Add New Event"} 
        onFinish={editEventValues ? handleEditEvent : handleAddEvent  } 
        setModalOpen={setUpdateEventModal} 
        editEventValues={editEventValues}
      />
    }
    {deleteEventModal &&
      <PermissionModal
        isModalOpen={deleteEventModal} 
        title={""} 
        onDelete={handleDeleteEvent} 
        setModalOpen={setDeleteEventModal} 
        editEventValues={editEventValues}
      />
    }
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