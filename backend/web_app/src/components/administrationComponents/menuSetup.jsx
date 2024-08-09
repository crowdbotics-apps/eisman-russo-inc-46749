import React, { useEffect, useState } from 'react'
import { Card, Checkbox, Divider } from 'antd'
import styled from 'styled-components';
import HeadingComponent from '../headingComponent/heading';
import CustomButton from '../customButton/customButton';
import { AntdesignTablePagination } from '../antDesignTable/AntdesignTablePagination';
import { subActivityColumns } from '../../util/antdTableColumns';
import CustomFilter from '../customFilterWithSearchBar/customFilter';
import { status } from '../../util/dropdownData';
import { useSelector } from 'react-redux';


export default function MenuSetup() {

  const [roleSelected, setRoleSelected] = useState(null);
  const [userSelected, setUserSelected] = useState(null);
  const [clientPermissions, setClientPermissions] = useState({
    searchClient: false,
    createClient: false,
    updateClient: false,
  });

  const [projectPermissions, setProjectPermissions] = useState({
    manageProject: false,
    createProject: false,
    updateProject: false,
    manageMapUser: false,
    createProjectUserMap: false,
    updateProjectUserMap: false,
    manageMapTask: false,
    createProjectTaskMap: false,
    updateProjectTaskMap: false,
  });

  const [reportPermissions, setReportPermissions] = useState({
    ticketsByMonitors: false,
    dailyLeanerHangerActivity: false,
    ticketsByTrucks: false,
    ticketsByDisposalSite: false,
    dropPins: false,
    tickets: false,
    pdfTickets: false,
    pdfTrucks: false,
    trucksRanToday: false,
    trucksCertifiedToday: false,
    ticketsByFEMADates: false,
    dailySummary: false,
    ticketsByTrucksDetails: false,
    reconciliation: false,
    dailyDisposal: false,
  });

  const rolesState = useSelector((state) => state.roles.roles);
  const roles = rolesState.map((role) => ({
    label: role.name,
    value: role.id,
  }));



  // useEffect(() => {
  //   console.log("clientPermissions", clientPermissions);
  //   console.log("projectPermissions", projectPermissions);
  //   console.log("reportPermissions", reportPermissions);
  // }, [clientPermissions, projectPermissions, reportPermissions]);
   
  const handleResetPermissions = () => {
    setClientPermissions({
      searchClient: false,
      createClient: false,
      updateClient: false,
    });
    setProjectPermissions({
      manageProject: false,
      createProject: false,
      updateProject: false,
      manageMapUser: false,
      createProjectUserMap: false,
      updateProjectUserMap: false,
      manageMapTask: false,
      createProjectTaskMap: false,
      updateProjectTaskMap: false,
    });
    setReportPermissions({
      ticketsByMonitors: false,
      dailyLeanerHangerActivity: false,
      ticketsByTrucks: false,
      ticketsByDisposalSite: false,
      dropPins: false,
      tickets: false,
      pdfTickets: false,
      pdfTrucks: false,
      trucksRanToday: false,
      trucksCertifiedToday: false,
      ticketsByFEMADates: false,
      dailySummary: false,
      ticketsByTrucksDetails: false,
      reconciliation: false,
      dailyDisposal: false,
    });
  };
  
  const handleSubmitPermissions = () => {
    console.log("clientPermissions", clientPermissions);
    console.log("projectPermissions", projectPermissions);
    console.log("reportPermissions", reportPermissions);
  };


  return (
  
    
    <CustomCard style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
        <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <Heading text="Manage User Menu Setup" margin="0px 0px 0px 5px" fontSize="1.3rem" color="#3B3B3B" />
          {/* <CustomButton btnText={"Add Sub-Activity"} color={"white"} onClick={handleAddRow} /> */}
        </div>
        <CustomFilter 
          filter1={true}
          filter2={true}
          resetFilters={true}
          filter1Placeholder={"User Role"}
          filter2Placeholder={"User Name"}
          resetFiltersText='Reset Filter'
          filter1Options={roles}
          filter2Options={status}
          onFilter1Change={(e) => setRoleSelected(e)}
          onFilter2Change={(e) => setUserSelected(e)}
          onResetFiltersClick={() => {
            setRoleSelected(null);
            setUserSelected(null);
          }}
          filter1Style={{marginLeft:"0px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
          filter2Style={{marginLeft:"20px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
          resetFiltersStyle={{cursor:"pointer",color:"#EE3E41",marginLeft:"15px", marginBottom: "20px", position:"relative", top:"20px", left:"6px", width:"260px", height:"40px"}}
        />
        <div style={{position:"relative", top:"24px", left:"2px"}}>
          <span style={{display:"flex", flexDirection:"row"}}>
            <Checkbox 
              checked={clientPermissions.searchClient && clientPermissions.createClient && clientPermissions.updateClient}
              onChange={(e) => setClientPermissions(
                {
                  searchClient: e.target.checked,
                  createClient: e.target.checked,
                  updateClient: e.target.checked,
                }
              )}
            />
            <Heading text="Client" margin="2px 0px 0px 5px" fontFamily="Manrope" fontSize="1.125rem" fontWeight={600} color="#111827" />
          </span>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"14px", left:"0px"}}>
            <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
              <Checkbox checked={clientPermissions.searchClient} onChange={(e) => setClientPermissions({...clientPermissions,searchClient: e.target.checked})}/>
              <Heading text="Search Client" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
            </span>
            <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"140px"}}>
              <Checkbox checked={clientPermissions.createClient} onChange={(e) => setClientPermissions({...clientPermissions,createClient: e.target.checked})}/>
              <Heading text="Create Client" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
            </span>
            <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"331px"}}>
              <Checkbox checked={clientPermissions.updateClient} onChange={(e) => setClientPermissions({...clientPermissions,updateClient: e.target.checked})}/>
              <Heading text="Update Client" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
            </span>
       
          </div>
        </div>
        <div style={{position:"relative", top:"90px", left:"2px"}}>
      
          <span style={{display:"flex", flexDirection:"row"}}>
            <Checkbox
              checked={projectPermissions.manageProject && projectPermissions.createProject && projectPermissions.updateProject && projectPermissions.manageMapUser && projectPermissions.createProjectUserMap && projectPermissions.updateProjectUserMap && projectPermissions.manageMapTask && projectPermissions.createProjectTaskMap && projectPermissions.updateProjectTaskMap} 
              onChange={(e) => setProjectPermissions(
                {
                  manageProject: e.target.checked,
                  createProject: e.target.checked,
                  updateProject: e.target.checked,
                  manageMapUser: e.target.checked,
                  createProjectUserMap: e.target.checked,
                  updateProjectUserMap: e.target.checked,
                  manageMapTask: e.target.checked,
                  createProjectTaskMap: e.target.checked,
                  updateProjectTaskMap: e.target.checked,
                }
              )}
            />
            <Heading text="Project" margin="2px 0px 0px 5px" fontFamily="Manrope" fontSize="1.125rem" fontWeight={600} color="#111827" />
          </span>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"14px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox checked={projectPermissions.manageProject} onChange={(e) => setProjectPermissions({...projectPermissions, manageProject: e.target.checked})}/>
            <Heading text="Manage Project" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span> <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"125px"}}>
            <Checkbox checked={projectPermissions.createProject} onChange={(e) => setProjectPermissions({...projectPermissions, createProject: e.target.checked})}/>
            <Heading text="Create Project" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span> <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"309px"}}>
            <Checkbox checked={projectPermissions.updateProject} onChange={(e) => setProjectPermissions({...projectPermissions, updateProject: e.target.checked})}/>
            <Heading text="Update Project" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
      
          </div>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"22px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox checked={projectPermissions.manageMapUser} onChange={(e) => setProjectPermissions({...projectPermissions, manageMapUser: e.target.checked})}/>
            <Heading text="Manage/Map User" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"108px"}}>
            <Checkbox checked={projectPermissions.createProjectUserMap} onChange={(e) => setProjectPermissions({...projectPermissions, createProjectUserMap: e.target.checked})}/>
            <Heading text="Create Project User Map" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"228px"}}>
            <Checkbox checked={projectPermissions.updateProjectUserMap} onChange={(e) => setProjectPermissions({...projectPermissions, updateProjectUserMap: e.target.checked})}/>
            <Heading text="Update Project User Map" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
           
          </div>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"32px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox checked={projectPermissions.manageMapTask} onChange={(e) => setProjectPermissions({...projectPermissions, manageMapTask: e.target.checked})}/>
            <Heading text="Manage/Map Task" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"110px"}}>
            <Checkbox checked={projectPermissions.createProjectTaskMap} onChange={(e) => setProjectPermissions({...projectPermissions, createProjectTaskMap: e.target.checked})}/>
            <Heading text="Create Project Task Map" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"230px"}}>
            <Checkbox checked={projectPermissions.updateProjectTaskMap} onChange={(e) => setProjectPermissions({...projectPermissions, updateProjectTaskMap: e.target.checked})}/>
            <Heading text="Update Project Task Map" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          </div>
        </div>
        
        <div style={{position:"relative", top:"165px", left:"2px"}}>
        
          <span style={{display:"flex", flexDirection:"row"}}>
            <Checkbox
              checked={reportPermissions.ticketsByMonitors && reportPermissions.dailyLeanerHangerActivity && reportPermissions.ticketsByTrucks && reportPermissions.ticketsByDisposalSite && reportPermissions.dropPins && reportPermissions.tickets && reportPermissions.pdfTickets && reportPermissions.pdfTrucks && reportPermissions.trucksRanToday && reportPermissions.trucksCertifiedToday && reportPermissions.ticketsByFEMADates && reportPermissions.dailySummary && reportPermissions.ticketsByTrucksDetails && reportPermissions.reconciliation && reportPermissions.dailyDisposal} 
              onChange={(e) => setReportPermissions(
                {
                  ticketsByMonitors: e.target.checked,
                  dailyLeanerHangerActivity: e.target.checked,
                  ticketsByTrucks: e.target.checked,
                  ticketsByDisposalSite: e.target.checked,
                  dropPins: e.target.checked,
                  tickets: e.target.checked,
                  pdfTickets: e.target.checked,
                  pdfTrucks: e.target.checked,
                  trucksRanToday: e.target.checked,
                  trucksCertifiedToday: e.target.checked,
                  ticketsByFEMADates: e.target.checked,
                  dailySummary: e.target.checked,
                  ticketsByTrucksDetails: e.target.checked,
                  reconciliation: e.target.checked,
                  dailyDisposal: e.target.checked,
                }
              )}
            />
            <Heading text="Reports" margin="2px 0px 0px 5px" fontFamily="Manrope" fontWeight={600} fontSize="1.125rem" color="#111827" />
          </span>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"14px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox checked={reportPermissions.ticketsByMonitors} onChange={(e) => setReportPermissions({...reportPermissions, ticketsByMonitors: e.target.checked})}/>
            <Heading text="Tickets By Monitors" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"100px"}}>
            <Checkbox checked={reportPermissions.dailyLeanerHangerActivity} onChange={(e) => setReportPermissions({...reportPermissions, dailyLeanerHangerActivity: e.target.checked})}/>
            <Heading text="Daily Leaner/Hanger Activity" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"200px"}}>
            <Checkbox checked={reportPermissions.ticketsByTrucks} onChange={(e) => setReportPermissions({...reportPermissions, ticketsByTrucks: e.target.checked})}/>
            <Heading text="Tickets By Trucks" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
           
          </div>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"25px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox checked={reportPermissions.ticketsByDisposalSite} onChange={(e) => setReportPermissions({...reportPermissions, ticketsByDisposalSite: e.target.checked})}/>
            <Heading text="Tickets By Disposal Site" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"72px"}}>
            <Checkbox checked={reportPermissions.dropPins} onChange={(e) => setReportPermissions({...reportPermissions, dropPins: e.target.checked})}/>
            <Heading text="Drop Pins" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"287px"}}>
            <Checkbox checked={reportPermissions.tickets} onChange={(e) => setReportPermissions({...reportPermissions, tickets: e.target.checked})}/>
            <Heading text="Tickets" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          
          </div>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"35px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox checked={reportPermissions.pdfTickets} onChange={(e) => setReportPermissions({...reportPermissions, pdfTickets: e.target.checked})}/>
            <Heading text="PDF Tickets" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"147px"}}>
            <Checkbox checked={reportPermissions.pdfTrucks} onChange={(e) => setReportPermissions({...reportPermissions, pdfTrucks: e.target.checked})}/>
            <Heading text="PDF Trucks" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"349px"}}>
            <Checkbox checked={reportPermissions.trucksRanToday} onChange={(e) => setReportPermissions({...reportPermissions, trucksRanToday: e.target.checked})}/>
            <Heading text="Trucks Ran Today" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
           
          </div>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"45px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox checked={reportPermissions.trucksCertifiedToday} onChange={(e) => setReportPermissions({...reportPermissions, trucksCertifiedToday: e.target.checked})}/>
            <Heading text="Trucks Certified Today" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"83px"}}>
            <Checkbox checked={reportPermissions.ticketsByFEMADates} onChange={(e) => setReportPermissions({...reportPermissions, ticketsByFEMADates: e.target.checked})}/>
            <Heading text="Tickets By FEMA Dates" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"214px"}}>
            <Checkbox checked={reportPermissions.dailySummary} onChange={(e) => setReportPermissions({...reportPermissions, dailySummary: e.target.checked})}/>
            <Heading text="Daily Summary" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
           
          </div>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"55px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox checked={reportPermissions.ticketsByTrucksDetails} onChange={(e) => setReportPermissions({...reportPermissions, ticketsByTrucksDetails: e.target.checked})}/>
            <Heading text="Tickets By Trucks Details" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"66px"}}>
            <Checkbox checked={reportPermissions.reconciliation} onChange={(e) => setReportPermissions({...reportPermissions, reconciliation: e.target.checked})}/>
            <Heading text="Reconciliation" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"257px"}}>
            <Checkbox checked={reportPermissions.dailyDisposal} onChange={(e) => setReportPermissions({...reportPermissions, dailyDisposal: e.target.checked})}/>
            <Heading text="Daily Disposal" margin="2px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
            
          </div>
         
        </div>
        <Divider style={{width:"103.9%", position:"relative", top:"238px", right:"24px",borderTop:"1px solid #DEE2E6"}}/>
        <div className="d-flex justify-content-center" style={{width:"20%", position:"relative", top:"234px", left:"460px"}}>
          <CustomButton
            btnText={"Reset"}
            color={"#EE3E41"}
            width={"150px"}
            margin="0px 5px"
            noBackground
            hideIcon={true}
            onClick={handleResetPermissions}
          />
          <CustomButton btnText={"Save Changes"} color={"white"} width={"150px"} type="button" hideIcon={true} onClick={handleSubmitPermissions} />
        </div>
    </CustomCard>
   
  )
}


const Heading = ({ text = "", margin, fontFamily, fontSize = "0.75rem", fontWeight, color = "#3B3B3B" }) => {
  return <HeadingComponent text={text} fontFamily={fontFamily} fontSize={fontSize} color={color} fontWeight={fontWeight ? fontWeight : 700} margin={margin} />;
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