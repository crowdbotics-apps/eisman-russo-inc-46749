import React, { useState } from 'react'
import styled from "styled-components";
import { Divider, Form, Modal, Select, Switch } from "antd";
import CustomButton from "../../../customButton/customButton";
import HeadingComponent from "../../../headingComponent/heading";
import { CustomModal } from '../../../customModal/customModal';
import CustomSwitch from '../../../customSwitch/customSwitch';
import { useSelector } from 'react-redux';

export default function EditUserRole({
    isModalOpen,
    title,
    setModalOpen,
    padding = "20px",
  }) {

    
    const [form] = Form.useForm();
    const editRoleNameValue = "Client";
    const [active, setActive] = useState(true);
    const rolesState = useSelector((state) => state.roles.roles);

    const roles = rolesState.map((role) => {
      return {
        label: role.name,
        value: role.id,
      };
    });
    form.setFieldsValue({roleName: editRoleNameValue});


    const handleSwitchChange = (checked) => {
      setActive(checked);
    };
    const handleSubmit = (values) => {
      values = { ...values, status: active };
      console.log("Values: ", values);
    };
    
  return (
    <CustomModal  
    open={isModalOpen}
    title={title}
    width="600px"
    heigth="614px"
    onCancel={() => {
      setModalOpen(false);
      form.resetFields();
    }}
    footer={null}
    maskClosable={false}
  >
    <Divider style={{width:"100%", borderTop:"1px solid #DEE2E6"}}/>
    <Form name="editUserRoleForm" onFinish={handleSubmit} form={form} layout="vertical">
      <FormItem name="roleName" label="Role Name">
        <Select  placeholder="Select role" options={roles} />
      </FormItem>
      
      <Heading text="Status" fontSize="0.875rem" fontWeight={700} />
      <CustomSwitch initialStatus={true} onChange={handleSwitchChange} />
    
      <Divider style={{borderTop:"1px solid #DEE2E6"}}/>
      <div className="d-flex justify-content-end">
        <CustomButton
          btnText={"Cancel"}
          margin="0px 5px"
          noBackground
          hideIcon={true}
          onClick={() => setModalOpen(false)}
        />
        <CustomButton btnText={"Save Changes"} color={"white"} type="submit" hideIcon={true} />
      </div>
    </Form>
  </CustomModal>
  )
}

const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B" }) => {
    return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
};

const FormItem = styled(Form.Item)`
  width: 100%;
`;
