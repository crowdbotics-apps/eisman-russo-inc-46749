import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Divider, Form, Input, InputNumber, Select } from "antd";
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



const selectBefore = (
    <Select
      defaultValue={countryCodes[0].value}
      options={countryCodes}
      style={{
        width: "70px",
      }}
    />
  );

export default function UpdateUser({
    isModalOpen,
    title,
    setModalOpen,
    onFinish,
    editUserValues,
    padding = "20px",
}) {


    const [address, setAddress] = useState("");
    const [addressLatAndLong, setAddressLatAndLong] = useState([null,null]);
    const [active, setActive] = useState(true);
    const [userRole, setUserRole] = useState();
    const [positionType, setPositionType] = useState(null);
    const [positionList, setPositionList] = useState([]);
    const rolesState = useSelector((state) => state.roles.roles);

    const roles = rolesState.map((role) => ({
      label: role.name,
      value: role.id,
    }));


    const [form] = Form.useForm();
    
    const fetchData = async ( page = 1,) => {
     if (userRole === undefined) {
       return;
     }
    const query = `role=${userRole}`;
      main_api.get(`${adminAPIsEndPoints.LIST_POSITION(query)}&page=${page}`)
      .then((response) => {
        const result = response.data.results;
        const positions = result?.map((position) => ({
          label: position.name,
          value: position.id,
        }));
        setPositionList(positions);
      }).catch((error) => {
        pushNotification(error, "error");
      });
    
    }
    useEffect(() => {
      setUserRole(form.getFieldValue("userRole"));
    }, [form]);


    useEffect(() => {
      fetchData();
    }, [userRole]);

    useEffect(() => { 
      form.setFieldsValue({ is_active: active });
    }, [active]);

    useEffect(() => {
        if (editUserValues) {
          form.setFieldsValue({
            name: editUserValues.name,
            email: editUserValues?.email,
            telephone_number: editUserValues?.telephone_number,
            is_active: editUserValues.status,
            password: editUserValues?.password,
            confirm_password: editUserValues?.password,
            role: editUserValues?.roleId,
            position: editUserValues?.position,
            prime_contractor: editUserValues?.prime_contractor,
            company_name: editUserValues?.company_name,
            prefix: editUserValues?.prefix,
        });
        }
    }, [editUserValues]);


    const handleSwitchChange = (checked) => {
        setActive(checked);
      };

    const handleRoleChange = (value) => {
      setUserRole(value);
    }

    const handlePositionChange = (value,option) => {
      console.log("option",option);
      if (option.label === "Sub Contractor" || option.label === "Prime Contractor") {
        setPositionType(option.label);  
      }else{
      setPositionType(null);
      }
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
    // isScrollable={true}
  >
    <Divider style={{width:"100%", borderTop:"1px solid #DEE2E6"}}/>
    <Form name="updateUserForm" onFinish={onFinish} form={form} layout="vertical" >
      <FormWrapper>
      <div style={{display:"flex", flexDirection:"row", marginRight:"4px"}}>

      <FormItem name="role" label="User Role">
        <Select placeholder="Select" options={roles} style={{width:"260px"}} onChange={handleRoleChange}/>
      </FormItem>
      <FormItem name="position" label="Position Name">
        <PaginatedSelect fetchData={fetchData} placeholder="Select" options={positionList} onChange={handlePositionChange} style={{width:"280px"}}/>
      </FormItem>
      </div>

     {positionType === "Prime Contractor" ? (
        <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
          <FormItem name="company_name" label="Company Name" required={true}>
              <Input placeholder="Enter Company Name" style={{width:"260px"}}/>
          </FormItem>
          <FormItem name="prefix" label="Prefix">
              <Input placeholder="Enter Prefix" style={{width:"280px"}}/>
          </FormItem>
        </div>
      ) :
      positionType === "Sub Contractor" ? (
        <>
        
        <FormItem name="prime_contractor" label="Prime Contractor" >
          <Select placeholder="Select" options={roles} style={{width:"552px", marginRight:"8px"}} />
        </FormItem>
        <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
          <FormItem name="company_name" label="Company Name">
              <Input placeholder="Enter Company Name" style={{width:"260px"}}/>
          </FormItem>
          <FormItem name="prefix" label="Prefix">
              <Input placeholder="Enter Prefix" style={{width:"280px"}}/>
          </FormItem>
        </div>
        </>
      ) : null
    }
      <FormItem name="telephone_number" label="Telephone Number">
        <Input placeholder='Enter Telephone Number' style={{width:"552px"}}/>
      </FormItem>
      <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
        <FormItem name="name" label="Name">
            <Input placeholder="Enter Name" autoComplete='new-password' style={{width:"260px"}}/>
        </FormItem>
        <FormItem name="email" label="Email">
            <Input placeholder="Enter Email" style={{width:"280px"}}/>
        </FormItem>
      </div>
      <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
        <FormItem name="password" label="Password">
            <Input.Password placeholder="Enter Password"  style={{width:"260px"}}/>
        </FormItem>
        <FormItem name="confirm_password" label="Confirm Password">
            <Input.Password placeholder="Confirm Password" style={{width:"280px"}}/>
        </FormItem>
      </div>

      <Heading text="Status" fontSize="0.875rem" fontWeight={700} />
      <FormItem name="is_active">
        <CustomSwitch initialStatus={active} onChange={handleSwitchChange} />
      </FormItem>
      
      <Heading text="Address" fontSize="0.875rem" fontWeight={700} margin={"15px 0px 4px 0px"}/>
      <span style={{marginRight:"8px"}}>

      <LocationSelector
          address={address}
          setAddress={setAddress}
          setAddressLatAndLong={setAddressLatAndLong}
          form={form}
          checked={false}
          style={{width:"552px"}}
        />
      </span>

      <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
        <FormItem name="latitude" label="Latitude">
            <Input disabled={true} style={{width:"260px"}}/>
        </FormItem>
        <FormItem name="longitude" label="Longitude">
            <Input disabled={true} style={{width:"280px"}}/>
        </FormItem>
      </div>

        </FormWrapper>
      <Divider style={{borderTop:"1px solid #DEE2E6"}}/>
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
  width: 575px;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 0px;
  }
`;

const SaveContainer = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 593px;
  border-top: 1px solid #E0E0E0;
  background-color: white;
  padding: 10px 20px;
`;




