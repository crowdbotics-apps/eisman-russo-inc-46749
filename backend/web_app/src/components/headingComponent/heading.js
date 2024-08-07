import React from "react";
import styled from "styled-components";

const HeadingComponent = ({ fontSize, text, color = "black", fontWeight = 500, margin, ...props }) => {
  return (
    <Heading fontSize={fontSize} color={color} fontWeight={fontWeight} margin={margin} {...props}>
      {text}
    </Heading>
  );
};

export default HeadingComponent;

const Heading = styled.h2`
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin ?? "unset"};
  position: ${(props) => props.position ?? "unset"};
  top: ${(props) => props.top ?? "unset"};
  bottom: ${(props) => props.bottom ?? "unset"};
  left: ${(props) => props.left ?? "unset"};
  right: ${(props) => props.right ?? "unset"};
`;
