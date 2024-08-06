
import React, { useState } from 'react';
import { Row, Col, Card, Divider } from 'antd';
import styled from 'styled-components';
import HeadingComponent from '../../components/headingComponent/heading';
import { administrationMenuData } from '../../constants/menuData/menuData';
import { generateMenuItems } from '../../util/generateMenuItems';
import CustomMenu from '../../components/customMenu/customMenu';
import DebrisType from '../../components/administrationComponents/debrisType';
import TruckType from '../../components/administrationComponents/truckType';
import SubActivity from '../../components/administrationComponents/subActivity';
import Hazard from '../../components/administrationComponents/hazard';
import UserRole from '../../components/administrationComponents/userRole';
import Position from '../../components/administrationComponents/position';
import MenuSetup from '../../components/administrationComponents/menuSetup';
import EditUserRole from '../../components/modals/administration/userRoles/editUserRole';
import UpdatePosition from '../../components/modals/administration/position/updatePosition';
import { addUserPosition, updateUserPosition } from '../../util/dataService';

export default function Administration() {
  const menuItems = generateMenuItems(administrationMenuData);

  //------------------State Management of Modals---------------------//
  const [editUserRoleNameModal, setEditUserRoleNameModal] = useState(false);
  // const [updatePositionModal, setUpdatePositionModal] = useState(false);

  //------------------State Management of Edit User Role---------------------//

  //------------------State Management of Update Position---------------------//
  const [selectedPosition, setSelectedPosition] = useState(null);
  // const [editPositionValues, setEditPositionValues] = useState(null);


  //------------------State Management of Components---------------------//
  const [activeComponent, setActiveComponent] = useState('Debris Type');

  //---------------------- Components ----------------------//
  const COMPONENTS = {
    'Debris Type': DebrisType,
    'Truck Type': TruckType,
    'Sub-Activity': SubActivity,
    'Hazard': Hazard,
    'User Role': UserRole,
    'Position': Position,
    'Menu Setup': MenuSetup,
  };

  //---------------------- Props Mapping ----------------------//
  const propsMapping = {
    'Debris Type': {},
    'Truck Type': {},
    'Sub-Activity': {},
    'Hazard': {},
    'User Role': { editUserRoleNameModal, setEditUserRoleNameModal },
    'Position': {},
    'Menu Setup': {},
  };

  //------------------ Function to Handle Menu Select ---------------------//
  const handleMenuSelect = (item) => {
    setActiveComponent(item.label);
  };

  // //------------------ Functions to Handle Add and Edit User Position ---------------------//
  // const handleEditPosition = (values) => {
  //   console.log(`Edited Position: `, values);
  //   const id = editPositionValues.id;
  //   updateUserPosition(id,values);
  //   setUpdatePositionModal(false);
  // };

  // const handleAddPosition = (values) => {
  //   console.log("Added Position: ", values);
  //   addUserPosition(values);
  //   setUpdatePositionModal(false);
  // };

  //------------------ Assignment to Render Component ---------------------//
  const ActiveComponent = COMPONENTS[activeComponent];
  const activeComponentProps = propsMapping[activeComponent] || {};
  
  return (
    <div style={{ marginTop: '20px' }}>
      <Row gutter={16} style={{ marginBottom: '16px', marginTop: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CustomMenu menuItems={menuItems} handleMenuSelect={handleMenuSelect} />
        </div>
        <Col span={6}>
        {/* <UserRole editUserRoleNameModal={editUserRoleNameModal} setEditUserRoleNameModal={setEditUserRoleNameModal} /> */}
          <ActiveComponent {...activeComponentProps} />
        </Col>
      </Row>
      {editUserRoleNameModal && (
        <EditUserRole
          isModalOpen={editUserRoleNameModal}
          title="Edit User Role"
          setModalOpen={setEditUserRoleNameModal}
        />
      )}
      {/* {updatePositionModal && (
        <UpdatePosition
          isModalOpen={updatePositionModal}
          title={editPositionValues ? 'Edit Position' : 'Add Position'}
          onFinish={editPositionValues ? handleEditPosition : handleAddPosition}
          setModalOpen={setUpdatePositionModal}
          editPositionValues={editPositionValues}
        />
      )} */}
    </div>
  );
}

const CustomCard = styled(Card)`
  width: calc(100vw - 40px);
  max-width: 1274px;
  height: calc(100vh - 40px);
  max-height: 760px;
  margin: 20px;
  background-color: white;

  @media (max-width: 768px) {
    width: calc(100vw - 20px);
    height: calc(100vh - 20px);
    margin: 10px;
  }
`;
