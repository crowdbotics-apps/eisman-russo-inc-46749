import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as ArrowRightIconRaw } from '../../assets/rawSvg/greaterThanIcon.svg';
import { Card } from 'antd';


const CustomMenu = ({ menuItems, handleMenuSelect }) => {
  const [selectedKey, setSelectedKey] = useState('0-0'); // Set default selected key to '1'

  const onItemClick = (item) => {
    setSelectedKey(item.key);
    handleMenuSelect(item);
  };

  return (
    <CustomCard style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>

    <Sider>
      {menuItems.map((item) => (
        <MenuItem
          key={item.key}
          isSelected={selectedKey === item.key}
          onClick={() => onItemClick(item)}
        >
          <span>{item.label}</span>
          <ArrowRightIcon isSelected={selectedKey === item.key} />
        </MenuItem>
      ))}
    </Sider>
    </CustomCard>
  );
};


const CustomCard = styled(Card)`
  width: 260px;
  height: 912px;
  margin-right: 10px;
  margin-left: 20px;
  border-radius: 16px;
  background-color: white;
`;

const Sider = styled.div`
  height: 60vh;
  width: 260px;
  background: #fff;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  right: 25px;
`;



const ArrowRightIcon = styled(ArrowRightIconRaw)`
  width: 10px;
  height: 10px;
  color: ${({ isSelected }) => (isSelected ? '#3669AE' : 'inherit')};
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  cursor: pointer;
  height: 50px;
  position: relative; 

  &:hover {
    background: #EBF0F7;
    color: #3669AE;

    span {
      color: #3669AE;
    }

    svg {
      color: #3669AE;
    }
  }

  span {
    color: ${({ isSelected }) => (isSelected ? '#3669AE' : '#000000')};
    font-weight: ${({ isSelected }) => (isSelected ? 'bold' : 'normal')};
  }

  svg {
    color: ${({ isSelected }) => (isSelected ? '#3669AE' : 'inherit')};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 4px;
    background: #3669AE;
    border-radius: 0 4px 4px 0; 
    display: ${({ isSelected }) => (isSelected ? 'block' : 'none')};
  }
`;


export default CustomMenu;
