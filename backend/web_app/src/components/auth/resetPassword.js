// import React, { useEffect, useState } from "react";
// import styled from "styled-components";
// import { Button, Col, Image, Row } from "antd";
// import AuthPromotionScreen from "../authPromotionScreen/authPromotionScreen";
// import companyLogo from "../../assets/rawSvg/companyLogo.svg";
// import arrowBack from "../../assets/rawSvg/arrow-back.svg";
// import successIcon from "../../assets/rawSvg/successIcon.svg";
// import { useSpring } from "react-spring";
// import { adminAPIsEndPoints } from "../../constants/apiEndPoints";
// import { useLocation, useNavigate } from "react-router-dom";
// import axiosInstance from "../../util/axiosConfig";
// import { pushNotification } from "../../util/notification";
// import AuthButton from "../buttons/authButton";
// import FormikInputFloating from "../formikInputs/TextInput";
// import { Formik } from "formik";
// import { resetPasswordSchema } from "../../constants/authFormFieldsSchema/formSchema";

// export default function ResetPassword(props) {
//   let navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsloading] = useState(false);
//   const [redirect, setRedirect] = useState(false);
//   const [animate, setAnimate] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     function deleteAllCookies() {
//       var cookies = document.cookie.split(";");

//       for (var i = 0; i < cookies.length; i++) {
//         var cookie = cookies[i];
//         var eqPos = cookie.indexOf("=");
//         var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
//         document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
//       }
//     }

//     deleteAllCookies();
//     setTimeout(() => setAnimate(true), 1000);
//   }, []);

//   const handleResetPassword = async (formValues) => {
//     setIsloading(true);

//     const searchParams = new URLSearchParams(location.search);
//     const uid = searchParams.get("uid");
//     const token = searchParams.get("token");

//     const reqObject = {
//       uid: uid,
//       token: token,
//       ...formValues,
//     };

//     console.log("reqObject", reqObject);
//     if (reqObject) {
//         setRedirect(true);
//     }
//     // try {
//     //   const { data } = await axiosInstance.post(adminAPIsEndPoints.RESET_PASSWORD, reqObject);
//     //   if (data.success) {
//     //     pushNotification("Password Reset Successfully!");
//     //     navigate("/signin");
//     //   }
//     //   setIsloading(false);
//     // } catch (error) {
//     //   setIsloading(false);
//     //   if (error) {
//     //     pushNotification("Something went wrong please try again", "error");
//     //   }
//     // }
//   };

//   return (
//     <Row style={{ height: "100vh", background: "#F9F9F9" }}>
//     <Col md={12} style={{ position: "relative" }}>
//       <AuthPromotionScreen />
//     </Col>
//     <Col md={12} style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", position: "relative" }}>
    
//        {redirect? (
//        <div style={{
//         display: "flex",
//         flexDirection: "column",
//         width: "386px",
//         height: "300px",
//         boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.08)"
//       }}>
//         <SuccessIcon src={successIcon} alt="Success Icon" />
//         <FormList>
//           <div style={{
//             height: "100%",
//             width: "100%",
//             display: "flex",
//             alignItems: "center",
//             flexDirection: "column"
//           }}>
//             <FormHeader>Password Successfully Reset</FormHeader>
//             <FormSupportingText>Login to your account</FormSupportingText>
//             <P20 />
//             <Button
//               type="primary"
//               onClick={() => navigate("/signin")}
//               style={{
//                 width: "90%",
//                 height: "40px",
//                 borderRadius: "8px",
//                 background: "#3669AE",
//                 border: "none"
//               }}
//             >
//               Log in now
//             </Button>
//           </div>
//         </FormList>
//       </div>
      
//         ) : (
//             <FormContainer>
         

//         <h4 onClick={() => navigate("/signin")} className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
//         <BackIcon src={arrowBack} alt="Arrow Down Icon" /> 
//         </h4>
//                 <FormList>
//                 <Formik
//                     initialValues={{
//                     new_password1: "",
//                     new_password2: "",
//                     }}
//                     validationSchema={resetPasswordSchema}
//                     onSubmit={(values) => {
//                     handleResetPassword(values);
//                     }}
//                     enableReinitialize
//                 >
//                     {({ handleSubmit, error, values }) => (
//                     <Form onSubmit={handleSubmit}>
//                         <FormHeader>Create New Password</FormHeader>
//                         <FormSupportingText>Your new password must be different from previously used password</FormSupportingText>
//                         <P20 />

//                         <FormikInputFloating
//                         label="New Password"
//                         name="new_password1"
//                         type="password"
//                         className="w-100"
//                         passwordField={true}
//                         />
//                         <FormikInputFloating
//                         label="Confirm New Password"
//                         name="new_password2"
//                         type="password"
//                         className="w-100 mt-2"
//                         passwordField={true}
//                         />

//                         <AuthButton btnText={"Create"} type="submit" margin="20px 0px 0px 0px" disabled={isLoading} />
//                     </Form>
//                     )}
//                 </Formik>
//                 </FormList>
            
//         </FormContainer>
//             )
//         }
    
//       <LogoContainer>
//         <Image src={companyLogo} preview={false} />
//       </LogoContainer>
//     </Col>
//   </Row>
//   )
// }

// const SuccessIcon = styled.img`
//     width: 70px;
//     height: 87px;
//     position: relative;
//     top: 10px;
//     left: 153px;
//     cursor: pointer;
// `;
// const BackIcon = styled.img`
//   width: 20px;
//   height: 14px;
//   position: relative;
//   bottom: 156px;
//   left: 10px;
//   cursor: pointer;
// `;


// const FormContainer = styled.div`
//   width: 448px;
//   filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.08));
//   background: #ffffff;
//   border-radius: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   padding: 36px 24px;
// `;


// const FormList = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   position: relative;
// `;


// const P20 = styled.div`
//   height: 20px;
// `;

// const FormHeader = styled.h1`
//   font-family: Helvetica Neue, Arial;
//   font-style: normal;
//   font-weight: 700;
//   font-size: 24px;
//   line-height: 32px;
//   color: #000000;
//   margin-top: 24px;
// `;

// const FormDescriptionText = styled.p`
//   font-family: "Helvetica Neue", Arial;
//   font-size: 14px;
//   font-weight: 400;
//   line-height: 20px;
//   letter-spacing: 0em;
//   text-align: left;
//   color: #212121;
// `;

// const FormSupportingText = styled.p`
//   font-family: Helvetica Neue, Arial;
//   font-size: 12px;
//   font-weight: 500;
//   line-height: 18px;
//   color: #424242;
//   letter-spacing: 0em;
//   text-align: center;
// `;

// const Form = styled.form`
//   height: 100%;
//   width: 100%;
//   display: flex;
//   align-items: left;
//   flex-direction: column;
// `;

// // const LogoContainer = styled.div`
// //   position: relative;
// //   top: 25px;
// //   left: 250px;
// // `;

// const LogoContainer = styled.div`
//   position: relative;
//   bottom: 570px;
//   right: 170px;
// `;





/////////////////////////////////////////////////////////////////////





import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Col, Image, Row } from "antd";
import AuthPromotionScreen from "../authPromotionScreen/authPromotionScreen";
import companyLogo from "../../assets/rawSvg/companyLogo.svg";
import arrowBack from "../../assets/rawSvg/arrow-back.svg";
import successIcon from "../../assets/rawSvg/successIcon.svg";
import { useSpring } from "react-spring";
import { adminAPIsEndPoints } from "../../constants/apiEndPoints";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../util/axiosConfig";
import { pushNotification } from "../../util/notification";
import AuthButton from "../buttons/authButton";
import FormikInputFloating from "../formikInputs/TextInput";
import { Formik } from "formik";
import { resetPasswordSchema } from "../../constants/authFormFieldsSchema/formSchema";
import { CustomModal } from "../customModal/customModal";
import { main_api } from "../../api/axiosHelper";

export default function ResetPassword({
  isModalOpen,
  setModalOpen,
  selectedUser,
  padding = "20px",
}) {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [animate, setAnimate] = useState(false);
  const location = useLocation();

  useEffect(() => {
    function deleteAllCookies() {
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
    }

    deleteAllCookies();
    setTimeout(() => setAnimate(true), 1000);
  }, []);

  const handleResetPassword = async (formValues) => {
    setIsloading(true);

    
    const reqObject = {
      user_id: selectedUser.key,
      new_password: formValues.new_password1,
      confirm_new_password: formValues.new_password2,
    };

   
    try {
      const response = await main_api.post(adminAPIsEndPoints.CHANGE_PASSWORD, reqObject);
      if (response.status === 200) {
        pushNotification("Password Reset Successfully!");
        setModalOpen(false);
      }
      setIsloading(false);
    } catch (error) {
      setIsloading(false);
      if (error) {
        pushNotification("Something went wrong please try again", "error");
      }
    }
  };

  return (

    <CustomModal  
    open={isModalOpen}
    title={''}
    width="496px"
    heigth="614px"
    onCancel={() => {
      setModalOpen(false);
    }}
    
    footer={null}
    maskClosable={false}
    // isScrollable={true}
  >

   
   
     
            <FormContainer>
         

       
                <FormList>
                <Formik
                    initialValues={{
                    new_password1: "",
                    new_password2: "",
                    }}
                    validationSchema={resetPasswordSchema}
                    onSubmit={(values) => {
                    handleResetPassword(values);
                    }}
                    enableReinitialize
                >
                    {({ handleSubmit, error, values }) => (
                    <Form onSubmit={handleSubmit}>
                        <FormHeader>Create New Password</FormHeader>
                        <FormSupportingText>Your new password must be different from previously used password</FormSupportingText>
                        <P20 />

                        <FormikInputFloating
                        label="New Password"
                        name="new_password1"
                        type="password"
                        className="w-100"
                        passwordField={true}
                        />
                        <FormikInputFloating
                        label="Confirm New Password"
                        name="new_password2"
                        type="password"
                        className="w-100 mt-2"
                        passwordField={true}
                        />

                        <AuthButton btnText={"Create"} type="submit" margin="20px 0px 0px 0px" disabled={isLoading} />
                    </Form>
                    )}
                </Formik>
                </FormList>
            
        </FormContainer>
     
    
  
  </CustomModal>

  )
}

const SuccessIcon = styled.img`
    width: 70px;
    height: 87px;
    position: relative;
    top: 10px;
    left: 153px;
    cursor: pointer;
`;
const BackIcon = styled.img`
  width: 20px;
  height: 14px;
  position: relative;
  bottom: 156px;
  left: 10px;
  cursor: pointer;
`;


const FormContainer = styled.div`
  width: 448px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.08));
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 36px 24px;
`;


const FormList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;


const P20 = styled.div`
  height: 20px;
`;

const FormHeader = styled.h1`
  font-family: Helvetica Neue, Arial;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  color: #000000;
  margin-top: 24px;
`;

const FormDescriptionText = styled.p`
  font-family: "Helvetica Neue", Arial;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: left;
  color: #212121;
`;

const FormSupportingText = styled.p`
  font-family: Helvetica Neue, Arial;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #424242;
  letter-spacing: 0em;
  text-align: center;
`;

const Form = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: left;
  flex-direction: column;
`;

// const LogoContainer = styled.div`
//   position: relative;
//   top: 25px;
//   left: 250px;
// `;

const LogoContainer = styled.div`
  position: relative;
  bottom: 570px;
  right: 170px;
`;