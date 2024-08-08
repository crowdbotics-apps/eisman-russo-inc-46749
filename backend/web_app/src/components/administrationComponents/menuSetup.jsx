import React, { useState } from 'react'
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
  const [statusSelected, setStatusSelected] = useState(null);

  const rolesState = useSelector((state) => state.roles.roles);
  const roles = rolesState.map((role) => ({
    label: role.name,
    value: role.id,
  }));

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
          onFilter2Change={(e) => setStatusSelected(e)}
          onResetFiltersClick={() => {
            setRoleSelected(null);
            setStatusSelected(null);
          }}
          filter1Style={{marginLeft:"0px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
          filter2Style={{marginLeft:"20px", marginBottom: "20px", position:"relative", top:"12px", left:"6px", width:"260px", height:"40px"}}
          resetFiltersStyle={{cursor:"pointer",color:"#EE3E41",marginLeft:"15px", marginBottom: "20px", position:"relative", top:"20px", left:"6px", width:"260px", height:"40px"}}
        />
        <div style={{position:"relative", top:"24px", left:"2px"}}>
          <span style={{display:"flex", flexDirection:"row"}}>
            <Checkbox/>
            <Heading text="Client" margin="0px 0px 0px 5px" fontFamily="Manrope" fontSize="1.125rem" fontWeight={600} color="#111827" />
          </span>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"14px", left:"0px"}}>
            <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
              <Checkbox/>
              <Heading text="Search Client" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
            </span>
            <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"140px"}}>
              <Checkbox/>
              <Heading text="Create Client" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
            </span>
            <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"331px"}}>
              <Checkbox/>
              <Heading text="Update Client" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
            </span>
       
          </div>
        </div>
        <div style={{position:"relative", top:"90px", left:"2px"}}>
      
          <span style={{display:"flex", flexDirection:"row"}}>
            <Checkbox/>
            <Heading text="Project" margin="0px 0px 0px 5px" fontFamily="Manrope" fontSize="1.125rem" fontWeight={600} color="#111827" />
          </span>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"14px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox/>
            <Heading text="Manage Project" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span> <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"125px"}}>
            <Checkbox/>
            <Heading text="Create Project" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span> <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"309px"}}>
            <Checkbox/>
            <Heading text="Update Project" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
      
          </div>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"22px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox/>
            <Heading text="Manage/Map User" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"108px"}}>
            <Checkbox/>
            <Heading text="Create Project User Map" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"228px"}}>
            <Checkbox/>
            <Heading text="Update Project User Map" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
           
          </div>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"32px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox/>
            <Heading text="Manage/Map Task" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"110px"}}>
            <Checkbox/>
            <Heading text="Create Project Task Map" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"230px"}}>
            <Checkbox/>
            <Heading text="Update Project Task Map" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          </div>
        </div>
        
        <div style={{position:"relative", top:"165px", left:"2px"}}>
        
          <span style={{display:"flex", flexDirection:"row"}}>
            <Checkbox/>
            <Heading text="Reports" margin="0px 0px 0px 5px" fontFamily="Manrope" fontWeight={600} fontSize="1.125rem" color="#111827" />
          </span>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"14px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox/>
            <Heading text="Tickets By Monitors" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"100px"}}>
            <Checkbox/>
            <Heading text="Daily Leaner/Hanger Activity" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"200px"}}>
            <Checkbox/>
            <Heading text="Tickets By Trucks" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
           
          </div>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"25px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox/>
            <Heading text="Tickets By Disposal Site" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"72px"}}>
            <Checkbox/>
            <Heading text="Drop Pins" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"287px"}}>
            <Checkbox/>
            <Heading text="Tickets" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          
          </div>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"35px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox/>
            <Heading text="PDF Tickets" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"147px"}}>
            <Checkbox/>
            <Heading text="PDF Trucks" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"349px"}}>
            <Checkbox/>
            <Heading text="Trucks Ran Today" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
           
          </div>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"45px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox/>
            <Heading text="Trucks Certified Today" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"83px"}}>
            <Checkbox/>
            <Heading text="Tickets By FEMA Dates" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"214px"}}>
            <Checkbox/>
            <Heading text="Daily Summary" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
           
          </div>
          <div style={{display:"flex", flexDirection:"row", position:"relative", top:"55px", left:"0px"}}>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"4px"}}>
            <Checkbox/>
            <Heading text="Tickets By Trucks Details" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"66px"}}>
            <Checkbox/>
            <Heading text="Reconciliation" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
          <span style={{display:"flex", flexDirection:"row", position:"relative", top:"4px", left:"257px"}}>
            <Checkbox/>
            <Heading text="Daily Disposal" margin="0px 0px 0px 5px" fontFamily="Ubuntu" fontSize="0.875rem" fontWeight={400} color="#344054" />
          </span>
            
          </div>
         
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