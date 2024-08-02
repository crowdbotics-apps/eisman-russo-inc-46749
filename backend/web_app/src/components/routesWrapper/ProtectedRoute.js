import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userHasValidToken } from "../../api/auth";

import SidebarNav from "../../components/navbar/sidebarNav/sidebarNav";
// import HeaderNav from "../../containers/layout/HeaderNav";
import { adminSidebarNavData } from "../../constants/sidebarNavData/SidebarNavData";
import { useSelector } from "react-redux";
import HeaderNav from "../navbar/headerNav/headerNav";



const ProtectedRoute = ({ Page }) => {
  const hasValidToken = userHasValidToken();

  const [isExpanded, setIsExpanded] = useState(true);
  let navigate = useNavigate();
  let pathName = useLocation().pathname;


  const sidebarToggle = false;
  const permissionManagment = {
    role: {
      type: "admin",
    }
  };
  const [adminUser, setAdminUser] = useState(false);

  useEffect(() => {
    if (!hasValidToken) {
      navigate("/signin");
    }
  }, []);

  useEffect(() => {
    if (permissionManagment && permissionManagment.role) {
      if (permissionManagment.role.type === "admin") {
        setAdminUser(true);
      }
    }
  }, [permissionManagment]);
  return hasValidToken && adminUser ? (
    <>
      
        <Container>
          <SidebarNav navItems={adminSidebarNavData}  setIsExpanded={setIsExpanded}/>
          <Body expanded={isExpanded}>
            <HeaderNav expanded={isExpanded}/>
            <Container>
              <Content
                toggle={sidebarToggle}
              >
                <Page />
              </Content>
            </Container>
          </Body>
        </Container>
      
    </>
  ) : (
    <></>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  overflow-y: auto;
`;

const Body = styled.div`
  flex: 1;
  /* width: calc(100vw - ${(props) => (props.expanded ? "200px" : "80px")}); */
  overflow: auto;
`;

// const Content = styled.div`
//   height: ${(props) => (props.height ? props.height : "auto")};
//   ${"" /* margin-top: ${props => props.marginTop ? props.marginTop : "20px"}; */}
//   padding: ${(props) => (props.padding ? props.padding : "17px 25px")};
//   flex: 1;
//   overflow: auto;
//   margin-left: ${(props) => (props.toggle ? "240px" : "80px")};
//   margin-top: 60px;
// `;

const Content = styled.div`
  flex: 1;
  overflow: auto;
  height: calc(100vh - 60px);
  margin-top: 60px;
  padding: 1rem;
  background-color: #F5F5F5;

  

  @media (max-width: 480px) {
    padding: 0.5rem;
  }
`;

export default ProtectedRoute;
