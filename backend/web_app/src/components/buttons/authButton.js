import React from "react";
import styled from "styled-components";

const AuthButton = ({ btnText, disabled, ...props }) => {
  return (
    <SubmitButton {...props} disabled={disabled}>
      {btnText}
    </SubmitButton>
  );
};

export default AuthButton;

const SubmitButton = styled.button`
  height: ${(props) => props.height ?? "44px"};
  width: ${(props) => props.width ?? "100%"};
  background: ${(props) => props.background ?? "#3669AE"};
  border-radius: 8px;
  border-color: ${(props) => props.borderColor ?? "#3669AE"};
  margin: ${(props) => props.margin ?? "10px 0px 0px 0px"};
  cursor: pointer;
  font-family:
    Helvetica Neue,
    Arial;
  font-style: normal;
  font-weight: 500;
  font-size: ${(props) => props.fontSize ?? "0.875rem"};
  line-height: 32px;
  color: ${(props) => props.color ?? "#FFFFFF"};
  border: ${(props) => props.border ?? "1px solid #D0D5DD"};
  line-height: 43px;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
`;
