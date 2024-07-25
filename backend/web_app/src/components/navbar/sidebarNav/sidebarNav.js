// import React, { useEffect, useState } from "react";
// import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import NavItem from "../navItem";
// import { ReactComponent as CompanyBrandIcon } from "../../../assets/rawSvg/companyLogo.svg";
// import { Tooltip } from "antd";

// export default function SidebarNav({ toggleSidebar, sidebarToggle, navItems }) {
//     const [isHover, setIsHover] = useState(sidebarToggle || false);
//     const expanded = true;
//     const [selectedHasExtra, setSelectedHasExtra] = useState(false);
  
//     useEffect(() => {
//       if (selectedHasExtra) {
//         setIsHover(false);
//       }
//     }, [selectedHasExtra]);
  
  

//   return (
//     <Container isExpaned={expanded}>
//       <LogoContainer>
//         <CompanyBrandIcon width={100} style={{ position: "absolute", left: "56px" }} />
//       </LogoContainer>
//       <SideMainContainer>
//         <NavContainer>
//           <NavList>
//             {navItems?.map((items, index) => {
//               return (
//                 <div key={index}>
//                   <SidebarTypesHeading style={{ color: "black" }}>
    
//                   </SidebarTypesHeading>
//                   {items?.itemList?.map((subItems, subIndex) => {
//                     return (
//                       <div key={subIndex}>
                      
//                           <>
//                             <NavListItem>
//                               <NavItem
//                                 extraCallback={setSelectedHasExtra}
//                                 text={subItems.itemName}
//                                 icon={subItems.itemIcon}
//                                 to={subItems.navigateTo}
//                                 active={subItems.active}
//                               />
//                             </NavListItem>
//                           </>
                    
//                       </div>
//                     );
//                   })}
//                 </div>
//               );
//             })}
//           </NavList>
//         </NavContainer>
//       </SideMainContainer>
//     </Container>
//   )
// }

// const Container = styled.div`
//   width: 80px;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
//   min-width: ${(props) => (props.isExpaned ? "240px" : "")};
//   position: fixed;
//   z-index: 1000;
// `;
// const LogoContainer = styled.div`
//   width: 100%;
//   height: 120px;
//   display: flex;

//   align-items: center;
//   border-right: 1px solid #e4e7ec;
//   padding: 5px 20px;
// `;
// const SideMainContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   height: 100vh;
//   border-right: 1px solid #e4eaf0;
//   background-color: white;
// `;
// const Logo = styled.img`
//   height: 55.52220916748047px;
//   width: 165.99986267089844px;
//   object-fit: contain;
// `;

// const NavContainer = styled.nav`
//   width: 100%;
//   &::-webkit-scrollbar {
//     display: none; /* Safari and Chrome */
//   }
// `;

// const NavList = styled.ul`
//   width: 100%;
//   margin: 0;
//   padding: 0;
//   height: calc(100vh - 60px);
//   padding: 10px 0;
//   overflow-y: auto;

//   ::-webkit-scrollbar {
//     width: 0px;
//   }
// `;

// const NavListItem = styled.li`
//   list-style-type: none;
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

// const LogoutContainer = styled.div`
//   width: 100%;
//   margin-bottom: 50px;
//   display: flex;
//   align-items: flex-start;

//   margin-left: 12px;
// `;
// const SidebarTypesHeading = styled.h2`
//   font-size: 0.875rem;
//   color: rgba(0, 0, 0, 38%);
//   font-weight: 700;
//   margin-left: 12px;
// `;



//------------------------------------------

import React, { useState } from "react";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { adminSidebarNavData } from "../../../constants/sidebarNavData/SidebarNavData";
import { ReactComponent as CompanyBrandIcon } from "../../../assets/rawSvg/sidebarNavIcons/logoSmall.svg";
import { ReactComponent as ArrowLeftIcon } from "../../../assets/rawSvg/arrowLeft.svg";
import { ReactComponent as ArrowRightIcon } from "../../../assets/rawSvg/arrowRight.svg";
import './sidebar.css';
import { flattenMenuItems, generateMenuItems } from "../../../util/generateMenuItems";
const { Sider } = Layout;




export default function Sidebar({ setIsExpanded}) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const items = generateMenuItems(adminSidebarNavData);
  const flatItems = flattenMenuItems(items);
  const [selectedKey, setSelectedKey] = useState('1'); // Set default selected key to '1'
  

  const handleMenuClick = (e) => {
    const selectedItem = flatItems.find(item => item.key === e.key);
    if (selectedItem && selectedItem.navigateTo) {
      navigate(selectedItem.navigateTo);
    }
  };

  const toggleCollapse = () => {
    setIsExpanded(collapsed);
    setCollapsed(!collapsed);
  };

  return (
    <Sider width={240} collapsible collapsed={collapsed} trigger={null} onCollapse={toggleCollapse}>
      <div style={{ display: "flex", flexDirection:"column", alignItems: "center", padding: 20 , borderRight:" 1px solid #e4eaf0"}}>
        <CompanyBrandIcon width={100}/>
        <div
          style={{
            marginLeft: "auto",
            cursor: "pointer",
            color: "#000",
            zIndex: "200",
          }}
          onClick={toggleCollapse}
        >
          {collapsed ? 
          <ArrowRightIcon 
            style={{
              position: "relative",
              bottom: "55px",
              left: "33px",
            }}
          /> 
          : 
          <ArrowLeftIcon 
            style={{
              position:"relative",
              bottom:"55px",
              left:"35px",
            }}
          />}
        </div>
      </div>
      <Menu
        theme="light"
        defaultSelectedKeys={["0-0"]}
        mode="inline"
        items={items}
        onClick={handleMenuClick}
        style={{ background: "#fff" }}
      />
      
    </Sider>
  );
}




/////////////////////////////

// import React, { useState, useEffect } from "react";
// import { Layout, Menu } from "antd";
// import { useNavigate } from "react-router-dom";
// import { adminSidebarNavData } from "../../../constants/sidebarNavData/SidebarNavData";
// import { ReactComponent as CompanyBrandIcon } from "../../../assets/rawSvg/sidebarNavIcons/logoSmall.svg";
// import { ReactComponent as ArrowLeftIcon } from "../../../assets/rawSvg/arrowLeft.svg";
// import { ReactComponent as ArrowRightIcon } from "../../../assets/rawSvg/arrowRight.svg";
// import { flattenMenuItems, generateMenuItems } from "../../../util/generateMenuItems";
// import "./sidebar.css";  // Import the custom CSS file

// const { Sider } = Layout;

// export default function Sidebar({ setIsExpanded }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [selectedKey, setSelectedKey] = useState('1'); // Set default selected key to '1'
//   const navigate = useNavigate();
  
//   const items = generateMenuItems(adminSidebarNavData);
//   const flatItems = flattenMenuItems(items);

//   useEffect(() => {
//     const currentPath = window.location.pathname;
//     const matchedItem = flatItems.find(item => item.navigateTo === currentPath);
//     if (matchedItem) {
//       setSelectedKey(matchedItem.key);
//     }
//   }, [flatItems]);

//   const handleMenuClick = (e) => {
//     const selectedItem = flatItems.find(item => item.key === e.key);
//     if (selectedItem && selectedItem.navigateTo) {
//       navigate(selectedItem.navigateTo);
//       setSelectedKey(e.key);
//     }
//   };

//   const toggleCollapse = () => {
//     setIsExpanded(!collapsed);
//     setCollapsed(!collapsed);
//   };

//   return (
//     <Sider width={240} collapsible collapsed={collapsed} trigger={null} onCollapse={toggleCollapse}>
//       <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 20, borderRight: "1px solid #e4eaf0" }}>
//         <CompanyBrandIcon width={100} />
//         <div
//           style={{
//             marginLeft: "auto",
//             cursor: "pointer",
//             color: "#000",
//             zIndex: "200",
//           }}
//           onClick={toggleCollapse}
//         >
//           {collapsed ? 
//             <ArrowRightIcon 
//               style={{
//                 position: "relative",
//                 bottom: "55px",
//                 left: "33px",
//               }}
//             /> 
//             : 
//             <ArrowLeftIcon 
//               style={{
//                 position: "relative",
//                 bottom: "55px",
//                 left: "35px",
//               }}
//             />}
//         </div>
//       </div>
//       <Menu
//         theme="light"
//         mode="inline"
//         selectedKeys={[selectedKey]}
//         onClick={handleMenuClick}
//         style={{ color: 'rgba(0, 0, 0, 0.85)', background: "#fff" }}
//       >
//         {items.map((item) => (
//           <Menu.Item
//             key={item.key}
//             className={selectedKey === item.key ? 'selected-menu-item' : ''}
//             style={{
//               position: 'relative',
//             }}
//           >
//             <span
//               style={{
//                 position: 'relative',
//                 color: selectedKey === item.key ? '#000000' : 'rgba(0, 0, 0, 0.65)',
//                 paddingLeft: selectedKey === item.key ? '10px' : '0', // Optional: to avoid text overlapping with the border
//               }}
//             >
//               {item.label}
//             </span>
//             {selectedKey === item.key && (
//               <span
//                 style={{
//                   content: '""',
//                   position: 'absolute',
//                   left: 0,
//                   top: '10px', // Adjust top offset to control vertical positioning
//                   height: '50%', // Set desired height for the border
//                   width: '4px', // Set width for the border
//                   borderRadius: '0 5px 5px 0', // Optional: round the corners
//                   backgroundColor: '#3669AE', // Set color for the border
//                 }}
//               ></span>
//             )}
//           </Menu.Item>
//         ))}
//       </Menu>
//     </Sider>
//   );
// }
