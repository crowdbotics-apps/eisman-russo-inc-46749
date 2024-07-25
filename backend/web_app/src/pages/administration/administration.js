import React, { useEffect, useState } from 'react';
import { Table, Row, Col, Card, Input, Divider, DatePicker, Menu } from 'antd';
import styled from 'styled-components';
import HeadingComponent from '../../components/headingComponent/heading';
import { administrationMenuData } from '../../constants/menuData/menuData';
import CustomMenu from '../../components/customMenu/customMenu';

export default function Administration() {
  return (
    <div style={{ marginTop: '20px' }}>
    <h1>Administration</h1> 
    </div>
  )
}

const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B" }) => {
  return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
};