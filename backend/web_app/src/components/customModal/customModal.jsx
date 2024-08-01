import { Modal } from "antd";
import styled, { css } from "styled-components";

export const CustomModal = styled(Modal)`
  .ant-modal-header .ant-modal-title {
    font-weight: 700;
    font-size: 20px;
    line-height: 28px;
  }
  .ant-form-item .ant-form-item-label label {
    font-size: 12px;
    font-weight: 500;
    color: #3b3b3b;
  }
  .ant-form-vertical .ant-form-item-label {
    padding: 0 0 2px;
  }

  .welcome-message-checkbox .ant-form-item-row {
    flex-direction: row;
    gap: 10px;
    align-items: baseline;
  }
  .welcome-message-checkbox .ant-form-item-control {
    width: auto;
    order: -1;
    flex: 0;
  }
  .mark-active-switch .ant-form-item-row {
    flex-direction: row;
    align-items: baseline;
  }
  .mark-active-switch .ant-form-item-control {
    width: auto;
  }
  .ant-modal-close-x svg {
    color: black;
  }
  .ant-modal-content {
    ${({ isScrollable }) =>
      isScrollable &&
      css`
        max-height: 70vh;
        overflow-y: auto;
      `}
  }
`;

