import React from 'react'
import { useLocation } from 'react-router-dom';
import ManageProjects from '../../components/projectManagementComponents/manageProjects';
import MapUser from '../../components/projectManagementComponents/mapUser';

export default function ProjectManagement() {
  const location = useLocation();
  const pageName = location.pathname.split('/')[2];
  console.log("pageName", pageName);
  
  return (
   <>
    {pageName === 'manage-project' ? <ManageProjects/> : <MapUser/>}
   </>
  )
}
