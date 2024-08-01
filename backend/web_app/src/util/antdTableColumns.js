//-------------------- Import Components --------------------//

import { Tag, Space } from "antd";
import styled from "styled-components";
import { ReactComponent as EditIcon } from "../assets/rawSvg/editIcon.svg";

//-------------------- Dashboard Projects Table Columns --------------------//


export const dashboardProjectsColumns = [
    { title: 'PO Number', dataIndex: 'poNumber', key: 'poNumber' },
    { title: 'Project Name', dataIndex: 'projectName', key: 'projectName' },
    { title: 'Event Name', dataIndex: 'eventName', key: 'eventName' },
    { title: 'Client Name', dataIndex: 'clientName', key: 'clientName' },
    { title: 'City', dataIndex: 'city', key: 'city' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: status => {
        let color;
        switch(status) {
          case 'Completed': color = 'green'; break;
          case 'Cancelled': color = 'red'; break;
          case 'unassigned': color = 'orange'; break;
          case 'scheduled': color = 'blue'; break;
          default: color = 'grey';
        }
        return <span style={{ color }}>{status}</span>;
      } 
    },
  ];


//-------------------- User Roles Table Columns --------------------//

export const userRolesColumns =  [
        { title: 'Role Name', dataIndex: 'name', key: 'name' },
      ];


//-------------------- User Positions Table Columns --------------------//

export const userPositionsColumns = ({handleEditRow}) => {
  let columns = [
      { title: 'User Type', dataIndex: 'userType', key: 'userType' },
      { title: 'Position Name', dataIndex: 'name', key: 'name' },
      { title: 'Access Permission', dataIndex: 'platform_type', key: 'platform_type' },
      {
          title: "Actions",
          key: "action",
          render: (_, record) => (
            <Space size="middle" className="d-flex">
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  handleEditRow(record);
                }}
              >
                <EditIcon />
              </Button>
            </Space>
          ),
        },
    ];

  return columns;
};



//-------------------- User Management Table Columns --------------------//

export const userManagementColumns = ({handleEditRow}) => {
  let columns = [
      { title: 'Name', dataIndex: 'name', key: 'name' },
      { title: 'Role', dataIndex: 'role', key: 'role' },
      { title: 'Position', dataIndex: 'position', key: 'position' },
      { title: 'Email', dataIndex: 'email', key: 'email' },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (_, record) =>
          record.status === true ? (
            <Tag bordered={false} color="green" style={{borderRadius:"12px"}}>
              Active
            </Tag>
          ) : (
            <Tag bordered={false} color="red" style={{borderRadius:"12px"}}>
              InActive
            </Tag>
          ),
      },
      {
          title: "Actions",
          key: "action",
          render: (_, record) => (
            <Space size="middle" className="d-flex">
              <Button
                onClick={(event) => {
                  event.stopPropagation();
                  handleEditRow(record);
                }}
              >
                <EditIcon />
              </Button>
            </Space>
          ),
        },
    ];
  
  return columns;
};
  


//-------------------- Styled Button Component --------------------//
const Button = styled.button`
border: none;
background: none;
`;