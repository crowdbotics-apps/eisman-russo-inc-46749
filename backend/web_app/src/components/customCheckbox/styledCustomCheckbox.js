import React from 'react';
import styled from 'styled-components';
import { Checkbox } from 'antd';

// CustomCheckbox with proper Ant Design integration
const CustomCheckbox = ({ children, ...props }) => (
  <Checkbox {...props} className="custom-checkbox">
    {children}
  </Checkbox>
);

const StyledCustomCheckbox = styled(CustomCheckbox)`
  .ant-checkbox-inner {
    width: 20px;
    height: 20px;
    border-radius: 4px;
    border: 1px solid #a2c4d4;
    transition: border-color 0.3s, background-color 0.3s;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #3669AE !important;
    border-color: #3669AE !important;
  }

  .ant-checkbox-inner::after {
    border-color: #fff;
  }

  &:hover .ant-checkbox-inner {
    border-color: #3669AE !important;
  }

  .ant-checkbox-checked:hover .ant-checkbox-inner {
    background-color: #3669AE !important;
    border-color: #3669AE !important;
  }
`;

export default StyledCustomCheckbox;
