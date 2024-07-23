import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import { Badge } from "antd";

export default function NavItem({
        text,
        icon,
        to = "",
        pathsToMatch,
        hasExtras,
        isExtraHover,
        isHover,
        extraCallback,
        extras = [],
        fontFamily,
        unreadCounts,
      }) {
        let navigate = useNavigate();
        const permissionManagement = {
            permissions: {
                view_dashboard: true,
            },
        };
        const [permissionPopUp, setPermissionPopUp] = useState(false);
      
        const { pathname } = useLocation();
        const [is_active, setIsActive] = useState(pathname == to || pathname.includes(to));
        useEffect(() => {
          is_active && extraCallback(hasExtras);
        }, []);
      
        useEffect(() => {
          setIsActive(pathname == to || pathname?.includes(to));
        }, [pathname]);
      
       
        const handleItemClick = () => {
          if (to === "/dashboard") {
            if (permissionManagement.permissions, "view_dashboard") {
              navigate(to);
            } else {
              setPermissionPopUp(true);
            }
          } else {
            navigate(to);
          }
        };    
        return (
            <>
            <Container
              onClick={() => handleItemClick()}
              isExpanded={!isHover}
              active={pathname === to}
              type="button"
            >
                <LogoContainer isHover={isHover}>
                  <Logo active={is_active}>{icon}</Logo>
                </LogoContainer>
                <LogoText fontFamily={fontFamily} active={pathname === to}>
                   {text}
                </LogoText>
            </Container>
            {hasExtras && is_active && (
              <ExtraContent>
                {extras.map((e, i) => (
                  <ExtraButton key={i} onClick={() => navigate(to + e.link)} active={pathname.replace(to, "") == e.link}>
                    {e.name}
                  </ExtraButton>
                ))}
              </ExtraContent>
            )}
           </>
        )
}

const Container = styled.button`
  position: relative;
  width: ${(props) => (props.isExpanded ? "215px" : "200px")};
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  overflow: hidden;

  background: ${(props) => (props.active ? "#EBF0F7" : "none")};
  display: flex;
  align-items: baseline;

  &:hover {
    background: ${(props) => (props.active && !props.disabled ? "lightblue" : "none")};
  }

  ${(props) =>
    props.active &&
    css`
      &::before {
        content: "";
        position: absolute;
        top: 28%;
        left: 0;
        height: 16px;
        width: 5px;
        background-color: #3669AE;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
      }
    `}
`;
const LogoContainer = styled.div`
  height: 24px;
  width: 24px;
  margin-right: 3px;
`;
const ExtraContainer = styled.div`
  height: 24px;
  width: 24px;
  margin-left: auto;
`;

const Logo = styled.svg`
  height: 100%;
  width: 100%;
  object-fit: contain;
  stroke: ${(props) => (props.active ? "#fff" : "#8B8698")};
  fill: transparent;
`;

const LogoText = styled.span`
  font-weight: ${(props) => (props.active ? 500 : 400)};
  text-wrap: nowrap;
  font-size: 0.875rem;
  text-align: left;
  color: ${(props) => (props.active ? "#000000" : "#424242")};
  font-family: ${(props) => props.fontFamily};
`;

const ExtraContent = styled.div`
  padding-top: 50px;
  width: 140px;
  height: 100%;
  position: absolute;
  left: 77px;
  // left: 100px;
  top: 75px;
  border-left: 1px solid #e4eaf0;
  padding-left: 18px;
`;
const ExtraButton = styled.button`
  width: 135px;
  height: 29px;
  background: ${(props) => (props.active ? "#FFF6E8" : "transparent")};
  border-radius: 5px;
  border: none;
  color: ${(props) => (props.active ? "#fff" : "#8B8698")};
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  margin-top: 10px;
  cursor: pointer;
  &:hover {
    background: lightblue;
  }
`;