import styled from "styled-components";

const RoundedButton = styled.button`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid #EAEAEE;
  background-color: #ffffff; 
  color: #fff; 
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: ${(props) => props.position};
  top: ${(props) => props.top};
  right: ${(props) => props.right};
  left: ${(props) => props.left};
  margin:${(props) => props.margin};
  box-shadow:width: 36px;
    cursor: pointer;
    box-shadow:rgb(0 0 0 / 11%) 0px 2px 4px; ;
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const PaginationRightHeading = styled.h2`
  font-size: 12px;
  margin-right: 10px;
  font-weight: 400;
  color: #595959;
`;

const CustomPaginationContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  position: relative;
  top: 50px;
  right: 0px;
`;
// 12px
// #595959
// 400
export { RoundedButton, PaginationRightHeading, CustomPaginationContainer };
