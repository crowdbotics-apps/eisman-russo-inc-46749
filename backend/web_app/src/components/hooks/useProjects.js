//------------------------------ Custom Hook To Fetch Hazard Types ------------------------------//

import { useEffect, useState } from "react";
import { adminAPIsEndPoints } from "../../constants/apiEndPoints";
import { main_api } from "../../api/axiosHelper";
import { pushNotification } from "../../util/notification";

export default function useProjects() {
    
    const [projectsDataForTable, setProjectsDataForTable] = useState({});
    const [projectsData, setProjectsData] = useState({});
    const [projectsOptions, setProjectsOptions] = useState([]);


    //----------------------- Fetch Projects  -------------------------//

    const fetchProjects = async (query = '', page = 1) => {
        main_api.get(`${adminAPIsEndPoints.LIST_PROJECT(query)}&page=${page}`)
        .then((response) => {
        setProjectsData(response);
        const result = response.data.results;
        const transformedData = result.map(item => ({
            key: item?.id,
            po_number: item?.po_number || '---',
            name: item?.name || '---',
            event_name: item?.event?.name || '---',
            client_name: item?.client?.name || '---',
            prime_contractor: item?.contractor?.prime_contractor?.name || '---',
            city: item?.city || '---',
            state: item?.state || '---',
            description: item?.description || '---', 
            is_active: item?.status || '---',
            created_at: item?.created_at || '---',
            updated_at: item?.updated_at || '---',
        }));

        setProjectsDataForTable({count: response.data.count, data: transformedData});
    
        const options = result?.map((item) => {
            item.label = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            item.value = item.id;
            return item;
        });
        setProjectsOptions(options);


        }).catch((error) => {
        pushNotification(error, "error");
        });
    };


    //----------------------- Use Effect -----------------------//

    useEffect(() => {
        fetchProjects();
    }, []);



    //----------------------- Add and Edit Project -----------------------//

    const handleEditProject = async (id,values,closeModal) => {
        main_api.put(adminAPIsEndPoints.UPDATE_PROJECT(id), values)
        .then((response) => {
            if (response.status === 200) {
                pushNotification("Project Updated Successfully!", "success");
                // fetchProjects();
                closeModal(false);
            }
        }).catch((error) => {
            pushNotification(error?.response?.data?.detail, "error");
        });
    };

    const handleAddProject = async (values,closeModal) => {
       if (values) {
           main_api.post(adminAPIsEndPoints.ADD_PROJECT, values)
           .then((response) => {
               if (response.status === 201) {
                   pushNotification("Project Added Successfully!", "success");
                   // fetchProjects();
                   closeModal(false);
               }
           }).catch((error) => {
               pushNotification(error?.response?.data?.detail, "error");
           });
       } else {
            pushNotification("error", "No values to add!");
       }
    };

   
    
    return {projectsData, projectsDataForTable, projectsOptions, fetchProjects, handleEditProject, handleAddProject};
}



