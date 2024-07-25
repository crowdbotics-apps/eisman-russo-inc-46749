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
const { Sider } = Layout;

function getItem(label, key, icon, children, navigateTo) {
  return {
    key,
    icon,
    children,
    label,
    navigateTo,
  };
}

const generateMenuItems = (data) => {
  return data
    .map((menu, index) =>
      menu.itemList.map((item, subIndex) =>
        getItem(
          item.itemName,
          `${index}-${subIndex}`,
          item.itemIcon,
          item.children?.map((child, childIndex) =>
            getItem(
              child.itemName,
              `${index}-${subIndex}-${childIndex}`,
              null,
              null,
              child.navigateTo
            )
          ),
          item.navigateTo
        )
      )
    )
    .flat();
};

const flattenMenuItems = (menuItems) => {
  let flatItems = [];

  menuItems.forEach(item => {
    flatItems.push(item);
    if (item.children) {
      flatItems = flatItems.concat(flattenMenuItems(item.children));
    }
  });

  return flatItems;
};

const items = generateMenuItems(adminSidebarNavData);
const flatItems = flattenMenuItems(items);
console.log("items", items);
console.log("flatItems", flatItems);


export default function Sidebar({ setIsExpanded}) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    const selectedItem = flatItems.find(item => item.key === e.key);
    console.log("selectedItem", selectedItem);
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

