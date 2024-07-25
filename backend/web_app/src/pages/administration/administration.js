import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Card, Input, Divider, DatePicker, Menu } from 'antd';
import styled from 'styled-components';
import HeadingComponent from '../../components/headingComponent/heading';
import { administrationMenuData } from '../../constants/menuData/menuData';
import { flattenMenuItems, generateMenuItems } from '../../util/generateMenuItems';
import CustomMenu from '../../components/customMenu/customMenu';
import DebrisType from '../../components/administrationComponents/debrisType';
import TruckDescription from '../../components/administrationComponents/truckDescription';
import TicketType from '../../components/administrationComponents/ticketType';
import SubActivity from '../../components/administrationComponents/subActivity';
import Hazard from '../../components/administrationComponents/hazard';
import UserRole from '../../components/administrationComponents/userRole';
import Position from '../../components/administrationComponents/position';
import MenuSetup from '../../components/administrationComponents/menuSetup';
import EditUserRole from '../../components/modals/administration/userRoles/editUserRole';


export default function Administration() {

  const menuItems = generateMenuItems(administrationMenuData);
  // const flattenedMenuItems = flattenMenuItems(menuItems);

  //------------------State Management of Modals---------------------//
  const [editUserRoleNameModal, setEditUserRoleNameModal] = useState(false);


  //------------------State Management of Components---------------------//
  const [activeComponent, setActiveComponent] = useState('Debris Type');
  
  //---------------------- Components ----------------------//
const COMPONENTS = {
  'Debris Type': DebrisType,
  'Truck Description': TruckDescription,
  'Ticket Type': TicketType,
  'Sub-Activity': SubActivity,
  'Hazard': Hazard,
  'User Role': UserRole,
  'Position': Position,
  'Menu Setup': MenuSetup,
};

//---------------------- Props Mapping ----------------------//

const propsMapping = {
  'Debris Type': {  },
  'Truck Description': {  },
  'Ticket Type': {  },
  'Sub-Activity': { },
  'Hazard': {  },
  'User Role': { editUserRoleNameModal, setEditUserRoleNameModal, },
  'Position': { },
  'Menu Setup': {  },
};

  //------------------ Function to Handle Menu Select ---------------------//
  const handleMenuSelect = (item) => {
    setActiveComponent(item.label);
  };

  //------------------ Assignment to Render Component ---------------------//

  const ActiveComponent = COMPONENTS[activeComponent];
  const activeComponentProps = propsMapping[activeComponent] || {};




  return (
    <div style={{ marginTop: '20px' }}>
      <Row gutter={16} style={{ marginBottom: '16px', marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          
              <CustomCard style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                <CustomMenu menuItems={menuItems} handleMenuSelect={handleMenuSelect} />
              </CustomCard>
        
            </div>
            <Col span={6}>
               <ActiveComponent {...activeComponentProps} />
            </Col>
      </Row>
      {editUserRoleNameModal && <EditUserRole isModalOpen={editUserRoleNameModal} title="Edit User Role" setModalOpen={setEditUserRoleNameModal} />}
    </div>
  )
}

const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B" }) => {
  return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
};


const CustomCard = styled(Card)`
  width: 290px;
  height: 760px;
  margin-right: 10px;
  margin-left: 20px;
  background-color: white;
`;