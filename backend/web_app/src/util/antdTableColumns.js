//-------------------- Import Components --------------------//

import { Tag, Space, Dropdown } from "antd";
import styled from "styled-components";
import { ReactComponent as EditIcon } from "../assets/rawSvg/editIcon.svg";
import { ReactComponent as DropDownDots } from "../assets/rawSvg/dropdownDots.svg";
import { ReactComponent as ChangePassword } from "../assets/rawSvg/lock.svg";


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
      { title: 'User Role', dataIndex: 'userType', key: 'userType' },
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

export const userManagementColumns = ({handleEditRow,handleChangePassword}) => {
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
      // {
      //     title: "Actions",
      //     key: "action",
      //     render: (_, record) => (
      //       <Space size="middle" className="d-flex">
      //         <Button
      //           onClick={(event) => {
      //             event.stopPropagation();
      //             handleEditRow(record);
      //           }}
      //         >
      //           <EditIcon />
      //         </Button>
      //       </Space>
      //     ),
      //   },
      {
        title: "Actions",
        key: "action",
        align: "center",
        render: (_, record) => (
          <>
            <Dropdown
              menu={{
                items: [
                  {
                    label: (
                      <div
                        style={{ width: "180px", padding: "2px 8px" }}
                        onClick={(e) => {
                          handleEditRow(record);
                          
                        }}
                      >
                        <span className="me-3">
                          <EditIcon />
                        </span>
                        Edit
                      </div>
                    ),
                    key: "0",
                  },
                  {
                    label: (
                      <div
                        style={{ width: "180px", padding: "2px 2px" }}
                        className="d-flex justify-content-evenly"
                        onClick={(e) => {
                          
                            handleChangePassword(record);
                
                        }}
                      >
                        <span className="me-2"><ChangePassword/></span>
                        Change Password
                      </div>
                    ),
                    key: "1",
                  },
                ],
              }}
              trigger={["click"]}
            >
              <a
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Space size="middle" className="cursorPointer" style={{ transform: "rotate(270deg)" }}>
                  <DropDownDots />
                </Space>
              </a>
            </Dropdown>
            
          </>
        ),
      },
    ];
  
  return columns;
};
  

//-------------------- Debris Type Table Columns --------------------//

//-------------------- User Positions Table Columns --------------------//

export const debrisTypeColumns = ({handleEditRow}) => {
  let columns = [
      { title: 'Debris Name', dataIndex: 'name', key: 'name' },
      {
        title: "Status",
        dataIndex: "is_active",
        key: "is_active",
        render: (_, record) =>
          record.is_active === true ? (
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


//-------------------- Truck Description Table Columns --------------------//

export const truckDescriptionColumns = ({handleEditRow}) => {
  let columns = [
      { title: 'Truck Type', dataIndex: 'truckType', key: 'truckType' },
      { title: 'Description', dataIndex: 'description', key: 'description' },
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


//-------------------- Sub Activity Table Columns --------------------//


export const subActivityColumns = ({handleEditRow}) => {
  let columns = [
      { title: 'Sub-Activity Name', dataIndex: 'subActivityName', key: 'subActivityName' },
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


//-------------------- Hazard Management Table Columns --------------------//


export const hazardManagementColumns = ({isHazardNameTable,handleEditRow}) => {
  let columns = [
      { title: 'Hazard Type', dataIndex: 'hazardType', key: 'hazardType' },
      isHazardNameTable && { title: 'Hazard Name', dataIndex: 'hazardName', key: 'hazardName' },
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