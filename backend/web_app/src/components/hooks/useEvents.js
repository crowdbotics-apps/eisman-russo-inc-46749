//------------------------------ Custom Hook To Fetch Hazard Types ------------------------------//

import { useEffect, useState } from "react";
import { adminAPIsEndPoints } from "../../constants/apiEndPoints";
import { main_api } from "../../api/axiosHelper";
import { pushNotification } from "../../util/notification";

export default function useEvents() {
    
    const [eventsDataForTable, setEventsDataForTable] = useState({});
    const [eventsData, setEventsData] = useState({});
    const [eventOptions, setEventOptions] = useState([]);

    //----------------------- Fetch Events -----------------------//

    const fetchEvents = async (query = '', page = 1) => {
        main_api.get(`${adminAPIsEndPoints.LIST_EVENT(query)}&page=${page}`)
        .then((response) => {
        setEventsData(response);
        const result = response.data.results;
        setEventsDataForTable(result);
        const options = result?.map((item) => {
            item.label = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            item.value = item.id;
            return item;
        });
        setEventOptions(options);
        }).catch((error) => {
        pushNotification(error, "error");
        });
    };

    //----------------------- Use Effect -----------------------//

    useEffect(() => {
        fetchEvents();
    }, []);



    //----------------------- Add and Edit Events  -----------------------//

    const handleEditEvent = async (id, values, selectedRoleType, selectedPositionName, closeModal) => {
      
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
        try {
          const response = await main_api.put(adminAPIsEndPoints.UPDATE_USER(id), payload);
          if (response.status === 200) {
              pushNotification("Event updated successfully", "success");
              fetchData();
              closeModal(false);
          }
        } catch (error) {
            pushNotification(error.response.data.detail, "error");
        }
      }

      const handleAddEvent = async (values, selectedRoleType, selectedPositionName, closeModal) => {
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
              pushNotification("Event added successfully", "success");
              fetchData();
              closeModal(false);
    
          }
        } catch (error) {
            pushNotification(error.response.data.detail, "error");
        }
      }

    
    return {eventsData, eventsDataForTable, eventOptions, fetchEvents, handleEditEvent, handleAddEvent};
}



