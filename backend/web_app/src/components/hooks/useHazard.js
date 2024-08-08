//------------------------------ Custom Hook To Fetch Hazard Types ------------------------------//

import { useEffect, useState } from "react";
import { adminAPIsEndPoints } from "../../constants/apiEndPoints";
import { main_api } from "../../api/axiosHelper";
import { pushNotification } from "../../util/notification";

export default function useHazard() {
    
    const [hazardNames, setHazardNames] = useState({});
    const [hazardTypes, setHazardTypes] = useState({});
    const [hazardTypesOptions, setHazardTypesOptions] = useState([]);


    //----------------------- Fetch Hazard Types -----------------------//

    const fetchHazardTypes = async (query = '', page = 1) => {
        main_api.get(`${adminAPIsEndPoints.LIST_HAZARD_TYPE(query)}&page=${page}`)
        .then((response) => {
        const result = response.data.results;
        setHazardTypes(response);
    
        const options = result?.map((item) => {
            item.label = item.type.charAt(0).toUpperCase() + item.type.slice(1);
            item.value = item.id;
            return item;
        });
        setHazardTypesOptions(options);


        }).catch((error) => {
        pushNotification(error, "error");
        });
    };

    //----------------------- Fetch Hazard Names -----------------------//

    const fetchHazardNames = async (query = '', page = 1) => {
        main_api.get(`${adminAPIsEndPoints.LIST_HAZARD_NAME(query)}&page=${page}`)
        .then((response) => {
        setHazardNames(response);
        }).catch((error) => {
        pushNotification(error, "error");
        });
    };

    //----------------------- Use Effect -----------------------//

    useEffect(() => {
        fetchHazardTypes();
        fetchHazardNames();
    }, []);



    //----------------------- Add and Edit Hazard Names -----------------------//

    const handleEditHazardName = async (id,values,closeModal) => {
        main_api.put(adminAPIsEndPoints.UPDATE_HAZARD_NAME(id), values)
        .then((response) => {
            if (response.status === 200) {
                pushNotification("Hazard Name Updated Successfully!", "success");
                fetchHazardNames();
                closeModal(false);
            }
        }).catch((error) => {
            pushNotification(error?.response?.data?.detail, "error");
        });
    };

    const handleAddHazardName = async (values,closeModal) => {
       if (values) {
           main_api.post(adminAPIsEndPoints.ADD_HAZARD_NAME, values)
           .then((response) => {
               if (response.status === 201) {
                   pushNotification("Hazard Name Added Successfully!", "success");
                   fetchHazardNames();
                   closeModal(false);
               }
           }).catch((error) => {
               pushNotification(error?.response?.data?.detail, "error");
           });
       } else {
            pushNotification("error", "No values to add!");
       }
    };

    //----------------------- Add and Edit Hazard Types -----------------------//


    const handleEditHazardType = async (id,values,closeModal) => {
        main_api.put(adminAPIsEndPoints.UPDATE_HAZARD_TYPE(id), values)
        .then((response) => {
            if (response.status === 200) {
                pushNotification("Hazard Type Updated Successfully!", "success");
                fetchHazardTypes();
                closeModal(false);
            }
        }).catch((error) => {
            pushNotification(error?.response?.data?.detail, "error");
        });
    };

    const handleAddHazardType = async (values,closeModal) => {
        if (values) {
            main_api.post(adminAPIsEndPoints.ADD_HAZARD_TYPE, values)
            .then((response) => {
                if (response.status === 201) {
                    pushNotification("Hazard Type Added Successfully!", "success");
                    fetchHazardTypes();
                    closeModal(false);
                }
            }).catch((error) => {
                pushNotification(error?.response?.data?.detail, "error");
            });
        }else{
            pushNotification("error", "No values to add!");
        }
    }
    
    return {hazardTypes, hazardNames, hazardTypesOptions, fetchHazardTypes, fetchHazardNames, handleEditHazardType, handleAddHazardType, handleEditHazardName, handleAddHazardName};
}



