import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Col, Image, Row } from "antd";
import ForgetPassword from "./forgetPassword";
import SignIn from "./signIn";
import AuthPromotionScreen from "../authPromotionScreen/authPromotionScreen";
import companyLogo from "../../assets/rawSvg/companyLogo.svg";
import arrowBack from "../../assets/rawSvg/arrow-back.svg";
import { useSpring } from "react-spring";

export default function Authentication(props) {

    const [showLogin, setShowLogin] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const fade = useSpring({
    opacity: showLogin ? 0 : 1,
    onRest: () => setIsAnimating(false),
  });

  const height = useSpring({
    height: showLogin ? 667 : 404,
    onRest: () => setIsAnimating(false),
  });


  return (

    <Row style={{ height: "100vh", background: "#F9F9F9" }}>
    <Col md={12} style={{ position: "relative" }}>
      <AuthPromotionScreen />
    </Col>
    <Col md={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", position: "relative" }}>

      <FormContainer>
      {showLogin ? (
        <SignIn
          onForgotPasswordClick={() => setShowLogin(false)}
          setIsAnimating={setIsAnimating}
          loginUser={props.loginUser}
          loginUserSlice={props.loginResponse}
          error={props.error}
          isLoading={props.isLoading}
        />
      ) : (
        <ForgetPassword
          onBackToLoginClick={() => setShowLogin(true)}
          height={height}
          fade={fade}
          setIsAnimating={setIsAnimating}
        />
      )}
      </FormContainer>
 
      <LogoContainer>
        <Image src={companyLogo} preview={false} />
      </LogoContainer>
    </Col>
  </Row>

  )
}

const BackIcon = styled.img`
  width: 20px;
  height: 16px;
  cursor: pointer;
`;

const FormContainer = styled.div`
  width: 448px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.08));
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px 24px;
`;

// const LogoContainer = styled.div`
//   position: relative;
//   top: 25px;
//   left: 250px;
// `;

const LogoContainer = styled.div`
  position: relative;
  bottom: 570px;
  right: 170px;
`;