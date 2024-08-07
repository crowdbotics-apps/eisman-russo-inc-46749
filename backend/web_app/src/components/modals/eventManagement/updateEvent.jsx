import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import moment from "moment";
import { Button, DatePicker, Divider, Form, Input, InputNumber, Select, Switch } from "antd";
import { CustomModal } from '../../customModal/customModal';
import CustomButton from '../../customButton/customButton';
import { countryCodes } from '../../../util/dropdownData';
import CustomSwitch from '../../customSwitch/customSwitch';
import HeadingComponent from '../../headingComponent/heading';
import LocationSelector from '../../customAddressInput/locationSelector';
import { useSelector } from 'react-redux';
import { getUserPositionList } from '../../../util/dataService';
import { main_api } from '../../../api/axiosHelper';
import { adminAPIsEndPoints } from '../../../constants/apiEndPoints';
import PaginatedSelect from '../../customSelect/paginatedSelect';
import { pushNotification } from '../../../util/notification';
import TextArea from 'antd/es/input/TextArea';
import { ReactComponent as PlusIcon } from "../../../assets/rawSvg/Plus.svg";
import { ReactComponent as CrossIcon } from "../../../assets/rawSvg/Cross.svg";

export default function UpdateEvent({
    isModalOpen,
    title,
    setModalOpen,
    onFinish,
    editEventValues,
    padding = "20px",
}) {


    const [active, setActive] = useState(editEventValues?.is_active || true);
    const [showRemoveButton, setShowRemoveButton] = useState(false);
    const [form] = Form.useForm(); 
   

    useEffect(() => {
        if (editEventValues) {
          console.log("editEventValues", editEventValues);
                  
          form.setFieldsValue({
            name: editEventValues.name,
            event_date: moment(editEventValues?.event_date),
            declaration_date: moment(editEventValues?.declaration_date),
            is_active: editEventValues.is_active,
            notes: editEventValues.notes,
            fema_dates:editEventValues.fema_dates.map((fema_date) => ({
              ...fema_date,
              start_date: moment(fema_date.start_date), 
              end_date: moment(fema_date.end_date), 
            })) || [{}],
          });
        } else {
          form.setFieldsValue({fema_dates: [{
            start_date: null,
            end_date: null,
            percentage: null,
          }]});
        }
    }, [editEventValues]);

   

    const handleSwitchChange = (checked) => {
      setActive(checked);
      form.setFieldsValue({ is_active: checked }); 
      
    };

   

    const handleAddMoreFields = () => {
      form.setFieldsValue({
        fema_dates: [
          ...form.getFieldsValue("fema_dates"),
          {
            start_date: null,
            end_date: null,
            percentage: null,
          },
        ],
      });
    }
    

  return (

<CustomModal  
  open={isModalOpen}
  title={title}
  width="630px"
  heigth="580px"
  onCancel={() => {
    setModalOpen(false);
    form.resetFields();
  }}
  
  footer={null}
  maskClosable={false}
  // isScrollable={true}
>
<Divider style={{width:"107.9%", position:"relative", top:"0px", right:"24px",borderTop:"1px solid #DEE2E6"}}/>
  <Form name="updateEventForm" onFinish={onFinish} form={form} layout="vertical" >
    <FormWrapper>
    <div style={{display:"flex", flexDirection:"row", marginRight:"15px"}}>

      <FormItem 
        name="name"
        label="Event Name"
        rules={[
          {
            required: true,
            message: "Please enter event name",
          },
          {
            min: 3,
            max: 50,
            message: "Event name should be between 3 to 50 characters",
          }
        ]}
      >
        <Input placeholder="Enter event name" style={{width:"280px"}}/>
      </FormItem>
      <FormItem 
        name="event_date" 
        label="Event Date"
        rules={[
          {
            required: true,
            message: "Please select an event date",
          },
          {
            type: "object",
            message: "The input is not a valid date",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || value.isAfter(new Date(), 'day')) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("The event date must be in the future"));
            },
          }),
        ]}
      >
        <DatePicker placeholder="Select event date" style={{marginLeft:"5px" ,width:"273px"}}/>
      </FormItem>
    </div>
    <FormItem 
      name="declaration_date" 
      label="Declaration Date"
      rules={[
        {
          required: true,
          message: "Please select a declaration date",
        },
        {
          type: "object",
          message: "The input is not a valid date",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || !value.isAfter(new Date(), 'day')) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("The declaration date cannot be in the future"));
          },
        }),
      ]}
    >
      <DatePicker placeholder='Enter declaration date' style={{width:"570px"}}/>
    </FormItem>
    <FormItem name="is_active" label="Status">
      <CustomSwitch initialStatus={active} onChange={handleSwitchChange} />
    </FormItem>
    <FormItem name="notes" label="Notes">
      <TextArea placeholder='Enter any additional notes' style={{width:"570px"}} />
    </FormItem>
    
    <Heading text="FEMA Dates" fontSize="0.875rem" fontWeight={700} margin={"15px 0px 4px 0px"}/>
    <Form.List name="fema_dates">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", marginBottom: "8px", marginRight:"4px", width:"570px" }}>
                    <FormItem
                      {...restField}
                      name={[name, "start_date"]}
                      label="Start Date"
                      style={{ marginRight: "8px" }}
                    >
                      <DatePicker placeholder="MM/DD/YYYY" />
                    </FormItem>
                    <FormItem
                      {...restField}
                      name={[name, "end_date"]}
                      label="End Date"
                      style={{ marginRight: "8px" }}
                    >
                      <DatePicker placeholder="MM/DD/YYYY" />
                    </FormItem>
                    <FormItem
                      {...restField}
                      name={[name, "percentage"]}
                      label="Percentage"
                      style={{ marginRight: "8px" }}
                    >
                      <Input placeholder="Enter percentage" />
                    </FormItem>
                    { showRemoveButton === true && (

                        <Button
                          type="button"
                          onClick={() => remove(name)}
                          icon={<CrossIcon />}
                          style={{
                            background: "#FCE0E0",  
                            marginLeft: "8px",
                            padding: "0 8px",
                            cursor: "pointer",
                            width: "15%", 
                            marginTop: "5px" 
                          }}
                        />
                    )}
                    
                  </div>
                ))}
                <div
                  onClick={() => {
                    add();
                    setShowRemoveButton(true);
                  }}
                  style={{
                    color: "#3669AE",
                    cursor: "pointer",
                    position: "relative",
                    top: "0px",
                    right: "0px",
                    fontSize: "0.875rem",
                    fontWeight: 700,
                    margin: "15px 0px 4px 0px",
                  }}
                >
                  <PlusIcon />
                  <span
                    style={{
                      borderBottom: "1px solid #3669AE",
                    }}
                  >
                    Add More
                  </span>
                </div>
              </>
            )}
    </Form.List>


   

      </FormWrapper>
      <Divider/>
    <SaveContainer className="d-flex justify-content-end">
      <CustomButton
        btnText={"Cancel"}
        margin="0px 5px"
        noBackground
        hideIcon={true}
        onClick={() => setModalOpen(false)}
      />
      <CustomButton btnText={"Save Changes"} color={"white"} type="submit" hideIcon={true} />
    </SaveContainer>
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

const FormWrapper = styled.div`
  height: 585px;
  width:  600px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const SaveContainer = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 625px;
  border-top: 1px solid #E0E0E0;
  background-color: white;
  padding: 10px 20px;
`;














