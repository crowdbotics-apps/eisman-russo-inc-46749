import React from 'react'
import { Modal } from "antd";
import CustomButton from "../../customButton/customButton";
import HeadingComponent from "../../headingComponent/heading";

export default function PermissionModal({
    onclose,
    openModal,
    padding = "20px",
  }) {
  return (
    <Modal open={openModal} onCancel={onclose} footer={null} centered>
      <div
        style={{
          padding: padding,
          height: "300px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <HeadingComponent
          text="You don't have access to perform this action."
          fontSize="0.875rem"
          fontWeight={400}
          margin="25px auto 15px auto"
        />
        <div className="d-flex justify-content-center">
          <CustomButton btnText={"Got It"} padding="10px 30px" hideIcon margin="10px" onClick={onclose} />
        </div>
      </div>
    </Modal>
  )
}
