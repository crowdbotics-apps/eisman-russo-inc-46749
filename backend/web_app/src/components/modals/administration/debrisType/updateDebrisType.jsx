

import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import { Checkbox, Divider, Form, Input, Select } from "antd";
import CustomButton from "../../../customButton/customButton";
import HeadingComponent from "../../../headingComponent/heading";
import { CustomModal } from '../../../customModal/customModal';
import { accessPermission } from '../../../../util/dropdownData';
import { useSelector } from 'react-redux';
import CustomSwitch from '../../../customSwitch/customSwitch';

export default function UpdateDebrisType({
    isModalOpen,
    title,
    setModalOpen,
    onFinish,
    editDebrisTypeValues,
    padding = "20px",
}) {
  
  //----------------------- State Management -----------------------//

  const [active, setActive] = useState(editDebrisTypeValues?.is_active || true);


  //----------------------- Form Initialization -----------------------//

  const [form] = Form.useForm();


  //----------------------- Use Effect -----------------------//

  useEffect(() => {
    if (editDebrisTypeValues) {
      
      form.setFieldsValue({
        name: editDebrisTypeValues?.name,
        is_active: editDebrisTypeValues?.is_active ,
        mileage: editDebrisTypeValues?.rate_matrix_fields?.mileage ,
        diameter: editDebrisTypeValues?.rate_matrix_fields?.diameter ,
        unit: editDebrisTypeValues?.rate_matrix_fields?.unit ,
        weight: editDebrisTypeValues?.rate_matrix_fields?.weight ,
        reduction_rate: editDebrisTypeValues?.rate_matrix_fields?.reduction_rate,
      });
    }
  }, [editDebrisTypeValues]);


  //----------------------- Event Handlers -----------------------//

  const handleMileageCheckboxChange = (e) => {
  
    form.setFieldsValue({ mileage: e.target.checked });
  };

  const handleDiameterCheckboxChange = (e) => {
  
    form.setFieldsValue({ diameter: e.target.checked });
  };

  const handleUnitCheckboxChange = (e) => {

    form.setFieldsValue({ unit: e.target.checked });
  };

  const handleWeightCheckboxChange = (e) => {

    form.setFieldsValue({ weight: e.target.checked });
  };

  const handleReductionRateCheckboxChange = (e) => {

    form.setFieldsValue({ reduction_rate: e.target.checked });
  };

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
      <Form name="updateDebrisTypeForm" onFinish={onFinish} form={form} layout="vertical">
        
          <FormItem 
            name="name" 
            label="Debris Name" 
            rules={[
              {
                required: true,
                min: 3,
                max: 50,
                message: "Please enter a debris name",
              },
            ]}
          >
             <Input placeholder="Enter Here" />
          </FormItem>
          <FormItem name="is_active" label="Status" style={{ position: "relative", top: "0px", right: "1px" }}>
            <CustomSwitch value={active} onChange={handleSwitchChange} />
          </FormItem>
          <Heading text="Define rate matrix fields." margin="20px 0px 0px 2px" fontSize="0.75rem" color="grey" />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <FormItem 
              name="mileage" 
              valuePropName="checked" 
              rules={[
                {
                  required: false,
                  message: "Please mark the mileage field",
                },
              ]} 
              
            >
              <span style={{ display: "flex", flexDirection: "row", margin: "20px 0px 0px 0px" }}>


              <Checkbox defaultChecked={editDebrisTypeValues?.rate_matrix_fields?.mileage} onChange={handleMileageCheckboxChange}/>
               <Heading text="Mileage" margin="4px 0px 0px 8px" fontSize="0.75rem" color="grey" />
              </span>
            </FormItem>
            <FormItem
              name="diameter"
              valuePropName="checked" 
              rules={[
                {
                  required: false,
                  message: "Please mark the diameter field",
                },
              ]}
            >
              <span style={{ display: "flex", flexDirection: "row", margin: "20px 0px 0px 0px" }}>
              <Checkbox defaultChecked={editDebrisTypeValues?.rate_matrix_fields?.diameter} onChange={handleDiameterCheckboxChange}/>
              <Heading text="Diameter" margin="4px 0px 0px 8px" fontSize="0.75rem" color="grey" />
              </span>
            </FormItem>
            <FormItem
              name="unit"
              valuePropName="checked" 
              rules={[
                {
                  required: false,
                  message: "Please mark the unit field",
                },
              ]}
            >
              <span style={{display: "flex", flexDirection: "row", margin: "20px 0px 0px 0px"}}>
              <Checkbox defaultChecked={editDebrisTypeValues?.rate_matrix_fields?.unit} onChange={handleUnitCheckboxChange}/>
              <Heading text="Unit" margin="4px 0px 0px 8px" fontSize="0.75rem" color="grey" />
              </span>
            </FormItem>
            <FormItem
              name="weight"
              valuePropName="checked" 
              rules={[
                {
                  required: false,
                  message: "Please mark the weight field",
                },
              ]}
            >
              <span  style={{display: "flex", flexDirection: "row", margin: "20px 0px 0px 0px"}}>
              <Checkbox defaultChecked={editDebrisTypeValues?.rate_matrix_fields?.weight} onChange={handleWeightCheckboxChange}/>
              <Heading text="Weight" margin="4px 0px 0px 8px" fontSize="0.75rem" color="grey" />
              </span>
            </FormItem>

          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
          
            <FormItem
              name="reduction_rate"
              valuePropName="checked" 
              rules={[
                {
                  required: false,
                  message: "Please mark the reduction rate field",
                },
              ]}
            >
              <span  style={{display: "flex", flexDirection: "row", margin: "2px 0px 0px 0px"}}>
              <Checkbox defaultChecked={editDebrisTypeValues?.rate_matrix_fields?.reduction_rate} onChange={handleReductionRateCheckboxChange}/>
              <Heading text="Reduction Rate" margin="4px 0px 0px 8px" fontSize="0.75rem" color="grey" />
              </span>
            </FormItem>
          </div>

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
