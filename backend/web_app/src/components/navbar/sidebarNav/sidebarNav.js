
import React, { useEffect, useState } from "react";
import { Layout, Menu, theme } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const items = generateMenuItems(adminSidebarNavData);
  const flatItems = flattenMenuItems(items);
  const initialSelectedKey = flatItems.find(item => item.navigateTo === location.pathname)?.key;
  const [selectedKey, setSelectedKey] = useState(initialSelectedKey);

  const handleMenuClick = (e) => {
    const selectedItem = flatItems.find(item => item.key === e.key);
    if (selectedItem && selectedItem.navigateTo) {
      navigate(selectedItem.navigateTo);
    }
  };

  useEffect(() => {
    
    const selectedItem = flatItems.find(item => item.navigateTo === location.pathname);
    
    setSelectedKey(selectedItem?.key);
  }, [location.pathname, flatItems]);


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
        selectedKeys={[selectedKey]}
      />
      
    </Sider>
  );
}

