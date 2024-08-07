import React from 'react'
import { Divider, Modal } from "antd";
import CustomButton from "../../customButton/customButton";
import HeadingComponent from "../../headingComponent/heading";
import { ReactComponent as DangerIcon } from "../../../assets/rawSvg/danger.svg";
import { CustomModal } from '../../customModal/customModal';

export default function PermissionModal({
  isModalOpen,
  title,
  setModalOpen,
  onDelete,
  editSubActivityValues,
  padding = "20px",
}) {
  return (
    <CustomModal  
    open={isModalOpen}
    title={title}
    width="610px"
    height="300px"
    onCancel={() => {
      setModalOpen(false);
    }}
    centered={true}
    footer={null}
    maskClosable={false}
  >
    <Heading text="Delete Event" margin="0px 0px 30px 0px" fontSize="1.3rem" color="#1D2939" position={"relative"} bottom={"5px"} left={"30px"} />
    <DangerIcon style={{position:"relative", bottom:"60px", right:"5px"}}/>
    <Heading text="Are you sure you want to delete this event? this action cannot be undone" margin="0px 0px 50px 5px" fontSize="1rem" color="#667085" />

   
    <div className="d-flex justify-content-end">
      <CustomButton
        btnText={"Cancel"}
        margin="0px 5px"
        noBackground
        hideIcon={true}
        onClick={() => setModalOpen(false)}
      />
      <CustomButton 
        btnText={"Delete"} 
        color={"white"} 
        background={"#F04438"} 
        hideIcon={true}
        onClick={onDelete}  
      />
    </div>
  </CustomModal>
    
  )
}

const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B", position, top, bottom, right, left }) => {
  return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} position={position} top={top} bottom={bottom} right={right} left={left} />;
};
