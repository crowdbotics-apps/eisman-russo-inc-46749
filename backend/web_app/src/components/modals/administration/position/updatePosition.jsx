

import React, { useEffect } from 'react';
import styled from "styled-components";
import { Checkbox, Divider, Form, Input, Select } from "antd";
import CustomButton from "../../../customButton/customButton";
import HeadingComponent from "../../../headingComponent/heading";
import { CustomModal } from '../../../customModal/customModal';
import { accessPermission } from '../../../../util/dropdownData';
import { useSelector } from 'react-redux';

export default function UpdatePosition({
    isModalOpen,
    title,
    setModalOpen,
    onFinish,
    editPositionValues,
    padding = "20px",
}) {

  const rolesState = useSelector((state) => state.roles.roles);

  const roles = rolesState.map((role) => {
    return {
      label: role.name,
      value: role.id,
    };
  });

  const [form] = Form.useForm();

  useEffect(() => {
    if (editPositionValues) {
      form.setFieldsValue({
        role: editPositionValues.role.id,
        name: editPositionValues.name,
        platform_type: editPositionValues.platform_type,
        is_project_specific_position: editPositionValues.is_project_specific_position,
      });
    }
  }, [editPositionValues]);

  const handleCheckboxChange = (e) => {
    form.setFieldsValue({ is_project_specific_position: e.target.checked });
  };

  return (
    <CustomModal  
      open={isModalOpen}
      title={title}
      width="600px"
      height="614px"
      onCancel={() => {
        setModalOpen(false);
        form.resetFields();
      }}
      footer={null}
      maskClosable={false}
    >
      <Divider style={{width:"100%", borderTop:"1px solid #DEE2E6"}}/>
      <Form name="updateUserPositionForm" onFinish={onFinish} form={form} layout="vertical">
        <div style={{display:"flex", flexDirection:"row"}}>
          <FormItem 
            name="role" 
            label="User Type" 
            rules={[
              {
                required: true,
                message: "Please select a user type",
              },
            ]}
          >
            <Select placeholder="Select" options={roles} style={{width:"260px"}} />
          </FormItem>
          <FormItem 
            name="name" 
            label="Position Name" 
            rules={[
              {
                required: true,
                min: 3,
                max: 50,
                message: "Please enter a position name",
              },
            ]}
          >
            <Input placeholder="Enter Here" style={{width:"280px"}}/>
          </FormItem>
        </div>
        <FormItem 
          name="platform_type" 
          label="Access Permission" 
          rules={[
            {
              required: true,
              message: "Please select an access permission",
            },
          ]}
        >
          <Select placeholder="Select" options={accessPermission} />
        </FormItem>
        <FormItem 
          name="is_project_specific_position" 
          valuePropName="checked" // Bind the checkbox value to this prop
          rules={[
            {
              required: true,
              message: "Please mark if the position is project specific or not",
            },
          ]} 
        >
          <Checkbox onChange={handleCheckboxChange}>Is project specific</Checkbox>
        </FormItem>
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
  );
}

const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B" }) => {
  return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
};

const FormItem = styled(Form.Item)`
  width: 100%;
`;
