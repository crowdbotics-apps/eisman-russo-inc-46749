

import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Checkbox, Divider, Form, Input, Select } from "antd";
import CustomButton from "../../../customButton/customButton";
import HeadingComponent from "../../../headingComponent/heading";
import { CustomModal } from '../../../customModal/customModal';
import { accessPermission } from '../../../../util/dropdownData';
import { useSelector } from 'react-redux';
import CustomSwitch from '../../../customSwitch/customSwitch';
import TextArea from 'antd/es/input/TextArea';

export default function UpdateTruckType({
    isModalOpen,
    title,
    setModalOpen,
    onFinish,
    editTruckTypeValues,
    padding = "20px",
}) {
  
  //----------------------- State Management -----------------------//

  const [active, setActive] = useState(editTruckTypeValues?.is_active || true);


  //----------------------- Form Initialization -----------------------//

  const [form] = Form.useForm();


  //----------------------- Use Effect -----------------------//

  useEffect(() => {
    if (editTruckTypeValues) {
      
      form.setFieldsValue({
        type: editTruckTypeValues?.type,
        description: editTruckTypeValues?.description,
        is_active: editTruckTypeValues?.is_active ,
      });
    }
  }, [editTruckTypeValues]);


  //----------------------- Event Handlers -----------------------//


  const handleSwitchChange = (checked) => {
    setActive(checked);
    form.setFieldsValue({ is_active: checked }); 
    
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
      <Divider style={{width:"108.5%", position:"relative", top:"0px", right:"24px", borderTop:"1px solid #DEE2E6"}}/>
      <Form name="updateTruckTypeForm" onFinish={onFinish} form={form} layout="vertical">
        
          <FormItem 
            name="type" 
            label="Truck Type" 
            rules={[
              {
                required: true,
                min: 3,
                max: 50,
                message: "Please enter a truck type",
              },
            ]}
          >
             <Input placeholder="Enter Truck Type Here" />
          </FormItem>
          <FormItem 
            name="description" 
            label="Truck Type Description" 
            rules={[
              {
                required: false,
                min: 3,
                max: 300,
                message: "Please enter a description",
              },
            ]}
          >
             <TextArea placeholder="Enter Description Here" />
          </FormItem>

          <FormItem name="is_active" label="Status" style={{ position: "relative", top: "0px", right: "1px" }}>
            <CustomSwitch value={active} onChange={handleSwitchChange} />
          </FormItem>
          

        <Divider style={{width:"108.5%", position:"relative", top:"0px", right:"24px",borderTop:"1px solid #DEE2E6"}}/>
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
