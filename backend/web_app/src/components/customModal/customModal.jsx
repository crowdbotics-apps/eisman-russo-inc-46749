// import { Modal } from "antd";
// import styled, { css } from "styled-components";

// export const CustomModal = styled(Modal)`
//   .ant-modal-header .ant-modal-title {
//     font-weight: 700;
//     font-size: 20px;
//     line-height: 28px;
//   }
//   .ant-form-item .ant-form-item-label label {
//     font-size: 12px;
//     font-weight: 500;
//     color: #3b3b3b;
//   }
//   .ant-form-vertical .ant-form-item-label {
//     padding: 0 0 2px;
//   }

//   .welcome-message-checkbox .ant-form-item-row {
//     flex-direction: row;
//     gap: 10px;
//     align-items: baseline;
//   }
//   .welcome-message-checkbox .ant-form-item-control {
//     width: auto;
//     order: -1;
//     flex: 0;
//   }
//   .mark-active-switch .ant-form-item-row {
//     flex-direction: row;
//     align-items: baseline;
//   }
//   .mark-active-switch .ant-form-item-control {
//     width: auto;
//   }
//   .ant-modal-close-x svg {
//     color: black;
//   }
//   .ant-modal-content {
//     ${({ isScrollable }) =>
//       isScrollable &&
//       css`
//         max-height: 70vh;
//         overflow-y: auto;
//       `}
//   }
// `;




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

export const FormWrapper = styled.div`
  .form-row {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    margin-right: 8px;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  }

  .adjusted-position {
    position: relative;
    top: 0px;
    right: 167px;
  }

  .prime-contractor {
    position: relative;
    top: 0px;
    right: 14px;
  }

  .company-name {
    position: relative;
    top: 0px;
    right: 50px;
  }

  .prefix {
    position: relative;
    top: 0px;
    right: 5px;
  }

  .email-field {
    position: relative;
    top: 0px;
    right: 122px;
  }

  .status-switch {
    position: relative;
    top: 0px;
    right: 244px;
  }

  .confirm-password {
    position: relative;
    top: 0px;
    right: 0px;
  }
`;
