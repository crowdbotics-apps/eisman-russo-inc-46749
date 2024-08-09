import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

import { ReactComponent as HeaderBellIcon } from "../../../assets/rawSvg/headerNavIcons/headerBellIcon.svg";
import { ReactComponent as LogoutIcon } from "../../../assets/rawSvg/logouticon.svg";
import { ReactComponent as SettingsIcon } from "../../../assets/rawSvg/sidebarNavIcons/settingsIcon.svg";
import { ReactComponent as GreaterIcon } from "../../../assets/rawSvg/greaterIcon.svg";

import { Badge } from "antd";
import Avatar from "react-avatar";

import HeadingComponent from "../../headingComponent/heading";

import { logOut } from "../../../util/commonUtil";
import { pushNotification } from "../../../util/notification";
import Notifications from "../../notifications/notifications";
import { current } from "@reduxjs/toolkit";

export default function HeaderNav({expanded}) {
  let navigate = useNavigate();
  const dropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  let pathName = useLocation().pathname;
  const [showNotification, setShowNotification] = useState(false);
  const notificationManagement = {
    unreadCount: 2,
  };
 


  const profileMenus = [
    {
      icon: <SettingsIcon />,
      name: "Profile",
      NavTo: "",
      // onClick: () => setIsAccountSettingsModalOpen(true),
    },
    // {
    //   icon: <LegalAgreeIcon />,
    //   name: "Legal Agreement",
    //   NavTo: "",
    //   // onClick: () => setIsLegalAgreementModalOpen(true),
    // },
  ];
  const closeModal = () => {
    // setIsOnboardingModalVisible(false);
  };

//   useEffect(() => {
//     if (
//       auth?.loginResponse?.selectedRoleType === "company_type" ||
//       auth?.loginResponse?.selectedRoleType === "company_user_type"
//     ) {
//       const companyId = auth?.loginResponse?.selectCompany?.[0]?.company_id;
//       main_api
//         .get(companyAPIsEndPoints.ONBOARDING_STATUS(companyId))
//         .then(({ data }) => {
//           setIsOnboardingModalVisible(!data.result.is_seen);
//           setOnboardingData(data.result);
//         })
//         .catch((error) => {
//           pushNotification("Something went wrong!", "error");
//           // console.log(error);
//         });
//     }
//   }, []);
  const handleDropdownItemClick = (event) => {
    event.preventDefault();
    if (dropdownRef.current) {
      dropdownRef.current.blur();
    }
  };

  const onToggle = (toggle) => {
    setShowNotification(toggle);
  };

  useEffect(() => {
    // Add event listener to handle outside clicks
    const handleClickOutside = (event) => {
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        // Clicked outside of the notification dropdown, close the notification
        setShowNotification(false);
      }
    };

    // Attach the event listener when the component mounts
    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const convertToTitle = (path) => {
    const segments = path.split('/').filter(Boolean);
  
    if (segments.length < 1) return '';
  
    const lastSegment = segments.pop();
    const middleSegment = segments.pop();
   
    let formattedMiddleSegment = '';
    let formattedLastSegment = '';
    if (middleSegment){

      formattedMiddleSegment = middleSegment
       .split('-')
       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
       .join(' ');
    };

    if (lastSegment){

      formattedLastSegment = lastSegment
       .split('-')
       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
       .join(' ');
    };
  
    return (
      <>
        {middleSegment && <span>{formattedMiddleSegment}</span>}
        {middleSegment && lastSegment ? <span> {<GreaterIcon />} </span>: null}
        {lastSegment && <span style={{ color: middleSegment ? '#667085' : '#3669AE' }}>{formattedLastSegment}</span>}
      </>
    );
  };
  

  const currentUser = localStorage.getItem('username');

  return (
    <>
    <HeaderContainer expanded={expanded} >
      

      <PageTitle>
        {convertToTitle(pathName)}
      </PageTitle>
      <HeaderRightContainer>
        {/* <Dropdown ref={notificationDropdownRef} onToggle={onToggle}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic-1"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              marginRight: "-12px",
              outline: "none",
              position: "relative",
            }}
          >
            <Badge count={notificationManagement.unreadCount} offset={[-5, 10]}>
              <HeaderBellIcon />
            </Badge>
          </Dropdown.Toggle>
          <div
            style={{
              border: "1px solid #E0E0E0",
              borderRadius: "10px",
              boxShadow: "rgb(0 0 0 / 41%) 1px 1px 7px -3px",
              position: "absolute",
              right: "0",
              backgroundColor: "white",
            }}
          >
            {showNotification && <Notifications />}
          </div>
        </Dropdown>
       
       <span style={{borderRight:"1px solid #e4eaf0"}}/> */}

        <Dropdown ref={dropdownRef}>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
            style={{ background: "none", border: "none", padding: 0, marginRight: "-12px", outline: "none" }}
          >
            {/* <UserAvatar src={require("../assets/avatar/avatar-1.png")} alt="User Avatar" /> */}
            <Avatar
              name={currentUser || "B A"}
              round={true}
              size="33"
              textSizeRatio={1.5}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu
            style={{
              border: "1px solid #E0E0E0",
              borderRadius: "10px",
              boxShadow: "rgb(0 0 0 / 41%) 1px 1px 7px -3px",
              position: "fixed",
              background: "white",
            }}
          >
            {profileMenus?.map((items, index) => {
              const isAccountSettings = items.name === "Account Settings";
              return (
                <div
                  onClick={(event) => {
                    handleDropdownItemClick(event);
                    items.onClick && items.onClick();
                  }}
                  style={{
                    margin: isAccountSettings ? "13px -2px" : "13px 0px",
                    minWidth: "220px",
                    display: "flex",
                    alignItems: "center",
                    padding: "0px 12px",
                    cursor: "pointer",
                  }}
                  key={index}
                >
                  <HeadingComponent
                    text={
                      <>
                        {items.icon}
                        &nbsp;&nbsp;
                        {items.name}
                      </>
                    }
                    fontSize="14px"
                    fontWeight={400}
                    color={"black"}
                  />
                </div>
              );
            })}

            <div
              style={{ borderTop: "1px solid #E0E0E0", padding: "10px 12px 0px 12px", cursor: "pointer" }}
              onClick={() => {
                logOut();
                navigate("/signin");
                // window.location.reload();
              }}
            >
              <HeadingComponent
                text={
                  <>
                    <LogoutIcon style={{ color: "red" }} />
                    &nbsp;&nbsp; Logout
                  </>
                }
                color="red"
                fontSize="14px"
                margin={"3px 0px 3px 0px"}
                fontWeight={400}
              />
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </HeaderRightContainer>
    </HeaderContainer>
  </>
  )
}




const HeaderContainer = styled.div`
  width: ${(props) => (props.expanded ? 'calc(100% - 240px)' : 'calc(100% - 80px)')};
  height: 60px;
  padding: 5px 32px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  position: fixed;
  z-index: 100;

  @media (max-width: 768px) {
    width: ${(props) => (props.expanded ? 'calc(100% - 240px)' : 'calc(100% - 80px)')};
    padding: 5px 16px;
  }

  @media (max-width: 480px) {
    width: ${(props) => (props.expanded ? 'calc(100% - 240px)' : 'calc(100% - 80px)')};
    padding: 5px 8px;
  }
`;




const HeaderRightContainer = styled.div`
  display: flex;
  height: 44px;

  align-items: center;
`;

const NotificationContainer = styled.div`
  height: 100%;
  width: 48px;
  border-radius: 8px;
  box-sizing: border-box;
  margin-right: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const PageTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
  color: #3669AE;
`;