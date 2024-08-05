import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Divider, Form, Input, InputNumber, Select, Switch } from "antd";
import { CustomModal, FormWrapper } from '../../customModal/customModal';
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
    const [active, setActive] = useState(editUserValues?.status || true);
    const [userRole, setUserRole] = useState();
    const [positionType, setPositionType] = useState(null);
    const [roleType, setRoleType] = useState(null);
    const [positionList, setPositionList] = useState([]);
    const [query, setQuery] = useState("");
    const [primeContractorList, setPrimeContractorList] = useState([]);
    const [primeContractor, setPrimeContractor] = useState();
    const [windowSize, setWindowSize] = useState({ height: window.innerHeight, width: window.innerWidth });
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
        const primeContractorValues = positions
        ?.filter((position) => position.label === "Prime Contractor")
        .map((position) => position.value);
      
      
        let fullQuery = query;
        if (primeContractorValues && primeContractorValues.length > 0) {
          fullQuery += `&position=${primeContractorValues[0]}`;
        }
        
        setQuery(fullQuery);
        setPositionList(positions);
      }).catch((error) => {
        pushNotification(error, "error");
      });
    
    }
    
    const fetchPrimeContractor = async ( page = 1,) => {
      main_api.get(`${adminAPIsEndPoints.LIST_USER}?page=${page}&${query}`)
      .then((response) => {
        const result = response.data.results;
        const primeContractors = result?.map((primeContractor) => ({
          label: primeContractor.name,
          value: primeContractor.id,
        }));
        
        setPrimeContractorList(primeContractors);
      }).catch((error) => {
        pushNotification(error, "error");
      });
    
    }

    useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    useEffect(() => {
      setUserRole(form.getFieldValue("userRole"));
    }, [form]);


    useEffect(() => {
      fetchData();
    }, [userRole]);

   

    useEffect(() => {
        if (editUserValues) {
          
          
          form.setFieldsValue({
            name: editUserValues.name,
            email: editUserValues?.email,
            telephone_number: editUserValues?.phone_number,
            is_active: editUserValues.status,
            password: editUserValues?.password,
            confirm_password: editUserValues?.password,
            role: editUserValues?.roleData?.id,
            position: editUserValues?.positionData?.id,
            prime_contractor: editUserValues?.prime_contractor,
            company_name: editUserValues?.company_name,
            prefix: editUserValues?.prefix,
        });
        }
    }, [editUserValues]);

   

    const handleSwitchChange = (checked) => {
      setActive(checked);
      form.setFieldsValue({ is_active: checked }); 
      
    };

    const handleRoleChange = (value,option) => {
      setUserRole(value);
      const type = rolesState.filter((role) => role.name === option.label).map((role) => role.type);
      setRoleType(type[0]);
      
    }

    const handlePositionChange = (value,option) => {
      if (option.label === "Sub Contractor") {
        setQuery(`role=${userRole}`);
      }
      if (option.label === "Sub Contractor" || option.label === "Prime Contractor") {
        setPositionType(option.label);  
      }else{
      setPositionType(null);
      }
    };

    const handlePrimeContractorChange = (value,option) => {
      setPrimeContractor(value);
    };

    const updateData = (values) =>{
      
      onFinish(values, roleType, positionType)
    }

  return (

    <CustomModal  
  open={isModalOpen}
  title={title}
  width="1000px"
  heigth="600px"
  onCancel={() => {
    setModalOpen(false);
    form.resetFields();
  }}
  
  footer={null}
  maskClosable={false}
  // isScrollable={true}
>
  <Divider style={{width:"104.9%", position:"relative", top:"0px", right:"24px",borderTop:"1px solid #DEE2E6"}}/>

  <Form name="updateUserForm" onFinish={updateData} form={form} layout="vertical" >
    <FormWrapper windowSize={windowSize}>
    <div style={{display:"flex", flexDirection:"row", marginRight:"4px"}}>

    <FormItem 
      name="role" 
      label="User Role" 
      rules={[
        {
          required: true,
          message: "Please select a user role",
        },
      ]}
    >
      <Select placeholder="Select" options={roles} style={{width:"260px"}} onChange={handleRoleChange}/>
    </FormItem>
    <FormItem 
      name="position" 
      label="Position Name"
      rules={[
        {
          required: true,
          message: "Please select a position name",
        },
      ]} 
      style={{position:"relative", top:"0px",right:positionType !== "Sub Contractor" ? "167px" : "6px"}}
    >
      <PaginatedSelect fetchData={fetchData} placeholder="Select" options={positionList} onChange={handlePositionChange} style={{width:"260px"}}/>
    </FormItem>
    {
      roleType === "contractor" && positionType === "Sub Contractor" ? 
    
      (
        <>
        <FormItem 
          name="prime_contractor" 
          label="Prime Contractor"
          rules={[
            {
              required: true,
              message: "Please select your prime contractor",
            },
          ]} 
          style={{position:"relative", top:"0px",right:"14px"}} 
        >
        <PaginatedSelect fetchData={fetchPrimeContractor} placeholder="Select" options={primeContractorList} onChange={handlePrimeContractorChange} style={{width:"260px"}}/>

        </FormItem>
        </>
      )
      :
      null
    }
    </div>


<div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
    <FormItem 
      name="telephone_number"
      label="Telephone Number"
      rules={[
        {
          required: false,
          message: "Please enter your phone number",
        },
      ]}
    >
      <Input placeholder='Enter Telephone Number' style={{width:"260px"}}/>
    </FormItem>
    {
      roleType === "contractor" ? 
      (
        <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
          <FormItem name="company_name" label="Company Name" style={{position:"relative", top:"0px",right:"50px"}} required={true}>
              <Input placeholder="Enter Company Name" style={{width:"260px"}}/>
          </FormItem>
          <FormItem name="prefix" label="Prefix" style={{position:"relative", top:"0px",right:"5px"}}>
              <Input placeholder="Enter Prefix" style={{width:"320px"}}/>
          </FormItem>
        </div>
      )
      
      : null
    }
</div>
    <div style={{display:"flex", flexDirection:"row", alignItems:"center", marginRight:"8px"}}>
      <FormItem name="name" label="Name"
        rules={[
          {
            required: true,
            message: "Please enter your name",
          },
        ]} 
      >
          <Input placeholder="Enter Name" autoComplete='new-password' style={{width:"260px"}}/>
      </FormItem>
      <FormItem name="email" label="Email"
       rules={[
        {
          required: true,
          type: "email",
          message: "Please enter a valid email address",
        },
      ]}
      style={{position:"relative", top:"0px",right:"122px"}}>
          <Input placeholder="Enter Email" style={{width:"260px"}}/>
      </FormItem>
      <div  style={{display:"flex", flexDirection:"column",}}>

   
    <FormItem name="is_active" label="Status" style={{ position: "relative", top: "0px", right: "244px" }}>
      <CustomSwitch value={active} onChange={handleSwitchChange} />
    </FormItem>

      </div>
    </div>
    <div style={{display:"flex", flexDirection:"row", alignItems:"center", marginRight:"8px"}}>
     {!editUserValues && (<>
     
      <FormItem name="password" label="Password"
        rules={[
          {
            required: true,
            message: "Please enter your password",
          },
          {
            min: 8,
            message: "Password must be at least 8 characters long",
          },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
            message: "Password must contain uppercase, lowercase, and a number",
          },
        ]}
      >
          <Input.Password placeholder="Enter Password"  style={{width:"260px"}}/>
      </FormItem>
      <FormItem name="confirm_password" 
        rules={[
          {
            required: true,
            message: "Please confirm your password",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match"));
            },
          }),
        ]}
        label="Confirm Password" style={{position:"relative", top:"0px",right:"0px"}}>
          <Input.Password placeholder="Confirm Password" style={{width:"260px"}}/>
      </FormItem>
     </>)}
      <div  style={{display:"flex", flexDirection:"column",}}>

    <span style={{marginRight:"8px"}}>

    <LocationSelector
        address={address}
        setAddress={setAddress}
        setAddressLatAndLong={setAddressLatAndLong}
        form={form}
        checked={false}
        label='Address'
        style={{width:"320px"}}
        formItemStyles={{position:"relative", top:"0px",right:"5px"}}
      />
    </span>
      </div>
    </div>

    
    
    

    <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
      <FormItem name="latitude" label="Latitude">
          <Input disabled={true} style={{width:"450px"}}/>
      </FormItem>
      <FormItem name="longitude" label="Longitude">
          <Input disabled={true} style={{width:"460px"}}/>
      </FormItem>
    </div>

      </FormWrapper>
    <Divider />
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

// const FormWrapper = styled.div`
//   height: 585px;
//   width: ${(props) => props?.windowSize?.width >= 1200 ?  "955px" : "575px"};
//   overflow: auto;

//   ::-webkit-scrollbar {
//     width: 0px;
//   }
// `;

const SaveContainer = styled.div`
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 995px;
  border-top: 1px solid #E0E0E0;
  background-color: white;
  padding: 10px 20px;
`;




















//////////////////////////////////////////////


//     <>
    
//  {windowSize?.width >= 1200 ?
 
//  (<CustomModal  
//   open={isModalOpen}
//   title={title}
//   width="1000px"
//   heigth="600px"
//   onCancel={() => {
//     setModalOpen(false);
//     form.resetFields();
//   }}
  
//   footer={null}
//   maskClosable={false}
//   // isScrollable={true}
// >
//   <Divider style={{width:"100%", borderTop:"1px solid #DEE2E6"}}/>
//   <Form name="updateUserForm" onFinish={updateData} form={form} layout="vertical" >
//     <FormWrapper windowSize={windowSize}>
//     <div style={{display:"flex", flexDirection:"row", marginRight:"4px"}}>

//     <FormItem 
//       name="role" 
//       label="User Role" 
//       rules={[
//         {
//           required: true,
//           message: "Please select a user role",
//         },
//       ]}
//     >
//       <Select placeholder="Select" options={roles} style={{width:"260px"}} onChange={handleRoleChange}/>
//     </FormItem>
//     <FormItem 
//       name="position" 
//       label="Position Name"
//       rules={[
//         {
//           required: true,
//           message: "Please select a position name",
//         },
//       ]} 
//       style={{position:"relative", top:"0px",right:positionType !== "Sub Contractor" ? "167px" : "6px"}}
//     >
//       <PaginatedSelect fetchData={fetchData} placeholder="Select" options={positionList} onChange={handlePositionChange} style={{width:"260px"}}/>
//     </FormItem>
//     {
//       positionType === "Sub Contractor" ? 
    
//       (
//         <>
//         <FormItem 
//           name="prime_contractor" 
//           label="Prime Contractor"
//           rules={[
//             {
//               required: true,
//               message: "Please select your prime contractor",
//             },
//           ]} 
//           style={{position:"relative", top:"0px",right:"14px"}} 
//         >
//         <PaginatedSelect fetchData={fetchPrimeContractor} placeholder="Select" options={primeContractorList} onChange={handlePrimeContractorChange} style={{width:"260px"}}/>

//           {/* <Select placeholder="Select" options={roles} style={{width:"320px", marginRight:"4px"}} /> */}
//         </FormItem>
//         </>
//       )
//       :
//       null
//     }
//     </div>


// <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
//     <FormItem 
//       name="telephone_number"
//       label="Telephone Number"
//       rules={[
//         {
//           required: false,
//           message: "Please enter your phone number",
//         },
//       ]}
//     >
//       <Input placeholder='Enter Telephone Number' style={{width:"260px"}}/>
//     </FormItem>
//     {
//       positionType === "Prime Contractor" || "Sub Contractor" && roleType === "Contractor" ? 
//       (
//         <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
//           <FormItem name="company_name" label="Company Name" style={{position:"relative", top:"0px",right:"50px"}} required={true}>
//               <Input placeholder="Enter Company Name" style={{width:"260px"}}/>
//           </FormItem>
//           <FormItem name="prefix" label="Prefix" style={{position:"relative", top:"0px",right:"5px"}}>
//               <Input placeholder="Enter Prefix" style={{width:"320px"}}/>
//           </FormItem>
//         </div>
//       )
      
//       : null
//     }
// </div>
//     <div style={{display:"flex", flexDirection:"row", alignItems:"center", marginRight:"8px"}}>
//       <FormItem name="name" label="Name"
//         rules={[
//           {
//             required: true,
//             message: "Please enter your name",
//           },
//         ]} 
//       >
//           <Input placeholder="Enter Name" autoComplete='new-password' style={{width:"260px"}}/>
//       </FormItem>
//       <FormItem name="email" label="Email"
//        rules={[
//         {
//           required: true,
//           type: "email",
//           message: "Please enter a valid email address",
//         },
//       ]}
//       style={{position:"relative", top:"0px",right:"122px"}}>
//           <Input placeholder="Enter Email" style={{width:"260px"}}/>
//       </FormItem>
//       <div  style={{display:"flex", flexDirection:"column",}}>

//       {/* <Heading text="Status" fontSize="0.875rem" fontWeight={700} /> */}
//     {/* <FormItem name="is_active" label="Status" style={{position:"relative", top:"0px",right:"244px"}}>
//       <CustomSwitch initialStatus={active} onChange={handleSwitchChange} />
//     </FormItem> */}
//     {/* <FormItem name="is_active" label="Status" style={{ position: "relative", top: "0px", right: "244px" }}>
//       <CustomSwitch value={form.getFieldValue('is_active')} onChange={checked => form.setFieldsValue({ is_active: checked })} />
//     </FormItem> */}
//     <CustomSwitch label='Status' form={form} value={active} onChange={handleSwitchChange} style={{ position: "relative", top: "0px", right: "244px" }} />

//       </div>
//     </div>
//     <div style={{display:"flex", flexDirection:"row", alignItems:"center", marginRight:"8px"}}>
//       <FormItem name="password" label="Password"
//         rules={[
//           {
//             required: true,
//             message: "Please enter your password",
//           },
//           {
//             min: 8,
//             message: "Password must be at least 8 characters long",
//           },
//           {
//             pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
//             message: "Password must contain uppercase, lowercase, and a number",
//           },
//         ]}
//       >
//           <Input.Password placeholder="Enter Password"  style={{width:"260px"}}/>
//       </FormItem>
//       <FormItem name="confirm_password" 
//         rules={[
//           {
//             required: true,
//             message: "Please confirm your password",
//           },
//           ({ getFieldValue }) => ({
//             validator(_, value) {
//               if (!value || getFieldValue('password') === value) {
//                 return Promise.resolve();
//               }
//               return Promise.reject(new Error("Passwords do not match"));
//             },
//           }),
//         ]}
//         label="Confirm Password" style={{position:"relative", top:"0px",right:"0px"}}>
//           <Input.Password placeholder="Confirm Password" style={{width:"260px"}}/>
//       </FormItem>
//       <div  style={{display:"flex", flexDirection:"column",}}>

//       {/* <Heading text="Address" fontSize="0.875rem" fontWeight={700} margin={"15px 0px 4px 0px"}/> */}
//     <span style={{marginRight:"8px"}}>

//     <LocationSelector
//         address={address}
//         setAddress={setAddress}
//         setAddressLatAndLong={setAddressLatAndLong}
//         form={form}
//         checked={false}
//         label='Address'
//         style={{width:"320px"}}
//         formItemStyles={{position:"relative", top:"0px",right:"5px"}}
//       />
//     </span>
//       </div>
//     </div>

    
    
    

//     <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
//       <FormItem name="latitude" label="Latitude">
//           <Input disabled={true} style={{width:"450px"}}/>
//       </FormItem>
//       <FormItem name="longitude" label="Longitude">
//           <Input disabled={true} style={{width:"460px"}}/>
//       </FormItem>
//     </div>

//       </FormWrapper>
//     <Divider style={{borderTop:"1px solid #DEE2E6"}}/>
//     <SaveContainer className="d-flex justify-content-end">
//       <CustomButton
//         btnText={"Cancel"}
//         margin="0px 5px"
//         noBackground
//         hideIcon={true}
//         onClick={() => setModalOpen(false)}
//       />
//       <CustomButton btnText={"Save Changes"} color={"white"} type="submit" hideIcon={true} />
//     </SaveContainer>
//   </Form>
// </CustomModal>)
// :
// (<CustomModal  
//   open={isModalOpen}
//   title={title}
//   width="600px"
//   heigth="614px"
//   onCancel={() => {
//     setModalOpen(false);
//     form.resetFields();
//   }}
  
//   footer={null}
//   maskClosable={false}
//   // isScrollable={true}
// >
//   <Divider style={{width:"100%", borderTop:"1px solid #DEE2E6"}}/>
//   <Form name="updateUserForm" onFinish={onFinish} form={form} layout="vertical" >
//     <FormWrapper>
//     <div style={{display:"flex", flexDirection:"row", marginRight:"4px"}}>

//     <FormItem name="role" label="User Role">
//       <Select placeholder="Select" options={roles} style={{width:"260px"}} onChange={handleRoleChange}/>
//     </FormItem>
//     <FormItem name="position" label="Position Name">
//       <PaginatedSelect fetchData={fetchData} placeholder="Select" options={positionList} onChange={handlePositionChange} style={{width:"280px"}}/>
//     </FormItem>
//     </div>

//     {positionType === "Prime Contractor" ? (
//       <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
//         <FormItem name="company_name" label="Company Name" required={true}>
//             <Input placeholder="Enter Company Name" style={{width:"260px"}}/>
//         </FormItem>
//         <FormItem name="prefix" label="Prefix">
//             <Input placeholder="Enter Prefix" style={{width:"280px"}}/>
//         </FormItem>
//       </div>
//     ) :
//     positionType === "Sub Contractor" ? (
//       <>
      
//       <FormItem name="prime_contractor" label="Prime Contractor" >
//         <Select placeholder="Select" options={roles} style={{width:"565px", marginRight:"8px"}} />
//       </FormItem>
//       <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
//         <FormItem name="company_name" label="Company Name">
//             <Input placeholder="Enter Company Name" style={{width:"260px"}}/>
//         </FormItem>
//         <FormItem name="prefix" label="Prefix">
//             <Input placeholder="Enter Prefix" style={{width:"280px"}}/>
//         </FormItem>
//       </div>
//       </>
//     ) : null
//   }
//     <FormItem name="telephone_number" label="Telephone Number">
//       <Input placeholder='Enter Telephone Number' style={{width:"565px"}}/>
//     </FormItem>
//     <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
//       <FormItem name="name" label="Name">
//           <Input placeholder="Enter Name" autoComplete='new-password' style={{width:"260px"}}/>
//       </FormItem>
//       <FormItem name="email" label="Email">
//           <Input placeholder="Enter Email" style={{width:"280px"}}/>
//       </FormItem>
//     </div>
//     <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
//       <FormItem name="password" label="Password">
//           <Input.Password placeholder="Enter Password"  style={{width:"260px"}}/>
//       </FormItem>
//       <FormItem name="confirm_password" label="Confirm Password">
//           <Input.Password placeholder="Confirm Password" style={{width:"280px"}}/>
//       </FormItem>
//     </div>

//     <Heading text="Status" fontSize="0.875rem" fontWeight={700} />
//     <FormItem name="is_active">
//       <CustomSwitch initialStatus={active} onChange={handleSwitchChange} />
//     </FormItem>
    
//     <Heading text="Address" fontSize="0.875rem" fontWeight={700} margin={"15px 0px 4px 0px"}/>
//     <span style={{marginRight:"8px"}}>

//     <LocationSelector
//         address={address}
//         setAddress={setAddress}
//         setAddressLatAndLong={setAddressLatAndLong}
//         form={form}
//         checked={false}
//         style={{width:"552px"}}
//       />
//     </span>

//     <div style={{display:"flex", flexDirection:"row", marginRight:"8px"}}>
//       <FormItem name="latitude" label="Latitude">
//           <Input disabled={true} style={{width:"260px"}}/>
//       </FormItem>
//       <FormItem name="longitude" label="Longitude">
//           <Input disabled={true} style={{width:"280px"}}/>
//       </FormItem>
//     </div>

//       </FormWrapper>
//     <Divider style={{borderTop:"1px solid #DEE2E6"}}/>
//     <SaveContainer className="d-flex justify-content-end">
//       <CustomButton
//         btnText={"Cancel"}
//         margin="0px 5px"
//         noBackground
//         hideIcon={true}
//         onClick={() => setModalOpen(false)}
//       />
//       <CustomButton btnText={"Save Changes"} color={"white"} type="submit" hideIcon={true} />
//     </SaveContainer>
//   </Form>
// </CustomModal>)

// }
//     </>