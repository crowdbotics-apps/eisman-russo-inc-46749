import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowRightIcon } from '../../assets/rawSvg/greaterThanIcon.svg';


const CustomMenu = ({ menuItems, handleMenuSelect }) => {
  const [selectedKey, setSelectedKey] = useState('0-0'); // Set default selected key to '1'

  const onItemClick = (item) => {
    setSelectedKey(item.key);
    handleMenuSelect(item);
  };

  return (
    <Sider>
      {menuItems.map((item) => (
        <MenuItem
          key={item.key}
          isSelected={selectedKey === item.key}
          onClick={() => onItemClick(item)}
        >
          <span>{item.label}</span>
          <ArrowRightIcon />
        </MenuItem>
      ))}
    </Sider>
  );
};



const Sider = styled.div`
  height: 60vh;
  width: 250px;
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  cursor: pointer;
  height: 50px;
  border-radius: 0 8px 8px 0;
  border-left: ${({ isSelected }) => (isSelected ? '4px solid #3669AE' : 'none')};

  &:hover {
    background: #EBF0F7;
  }

  span {
    color: ${({ isSelected }) => (isSelected ? '#000000' : 'rgba(0, 0, 0, 0.65)')};
  }
`;

export default CustomMenu;
