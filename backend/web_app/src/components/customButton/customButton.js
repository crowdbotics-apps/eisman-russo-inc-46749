import React from "react";
import styled from "styled-components";
import { ReactComponent as PlusIcon } from "../../assets//rawSvg/plusSign.svg";
const CustomButton = ({ btnText, disabled, color, hideIcon = false, className = "", onClick, ...props }) => {
  return (
    <div className={className}>
      <AddClientBtn {...props} color={color} disabled={disabled} onClick={onClick}>
        {!hideIcon && <PlusIcon />}
        <span>{btnText}</span>
      </AddClientBtn>
    </div>
  );
};

export default CustomButton;
// rgb(251 207 52 / 64%)
const AddClientBtn = styled.button`
  color: ${(props) => props.color ?? "#000000"};
  width: ${(props) => props.width};
  background: ${(props) => (props.noBackground ? "rgb(224 224 224 / 12%)" : " #3669AE")};
  height: 40px;
  margin: ${(props) => props.margin};
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  justify-content: space-evenly;
  gap: 5px;
  font-size: 14px;
  font-weight: 500;
  padding: ${(props) => props.padding ?? "11px 16px 11px 16px"};
  border-radius: 8px;
  opacity: ${(props) => (props.disabled ? 0.7 : 1)};
  & > span {
    margin-right: 5px;
  }
`;