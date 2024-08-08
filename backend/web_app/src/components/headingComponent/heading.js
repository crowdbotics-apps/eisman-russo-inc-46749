import React from "react";
import styled from "styled-components";

const HeadingComponent = ({ fontFamily, fontSize, text, color = "black", fontWeight = 500, margin, ...props }) => {
  return (
    <Heading fontFamily={fontFamily} fontSize={fontSize} color={color} fontWeight={fontWeight} margin={margin} {...props}>
      {text}
    </Heading>
  );
};

export default HeadingComponent;

const Heading = styled.h2`
  font-family: ${(props) => props.fontFamily} "Poppins", sans-serif;
  font-size: ${(props) => props.fontSize};
  font-weight: ${(props) => props.fontWeight};
  color: ${(props) => props.color};
  margin: ${(props) => props.margin ?? "unset"};
`;
