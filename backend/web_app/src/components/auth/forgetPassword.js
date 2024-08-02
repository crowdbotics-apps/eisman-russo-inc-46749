import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { forgotPasswordFormSchema } from '../../constants/authFormFieldsSchema/formSchema';
import { Formik } from 'formik';
import FormikInputFloating from "../../components/formikInputs/TextInput";
import AuthButton from "../../components/buttons/authButton";
import arrowBack from "../../assets/rawSvg/arrow-back.svg";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword(props) {
//   let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  // const [isAnimating, setIsAnimating] = useState(false);

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
  }, []);

  const forgetPassword = async (values) => {
    // setIsloading(true);
    // try {
    //   const { data } = await axiosInstance.put(adminAPIsEndPoints.FORGOT_PASSWORD, values);
    //   if (data.success) {
    //     pushNotification("Password Recovery Email Sent", "success");
    //   }
    //   setIsloading(false);
    // } catch (error) {
    //   setIsloading(false);
    //   // console.log("error? >>", error);
    //   if (error) {
    //     pushNotification(error?.error, "error");
    //   }
    // }
  };

  const handleBackToLoginClick = () => {
    props.onBackToLoginClick();
  };
  return (
    <>
    
    <h4 onClick={handleBackToLoginClick} className="d-flex align-items-center gap-2" style={{ cursor: "pointer" }}>
      <BackIcon src={arrowBack} alt="Arrow Down Icon" /> 
    </h4>
   
  
      <FormList>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            forgetPassword(values);
          }}
          validationSchema={forgotPasswordFormSchema}
          enableReinitialize
          validateOnChange={false}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <FormHeader>Reset password</FormHeader>
              <FormSupportingText>Input your email ID to receive a reset link</FormSupportingText>
              <P20 />
              <FormikInputFloating label="Email ID" name="email" type="email" className="w-100" />
              <AuthButton btnText={" Send link"} margin="15px 0px 0px 0px" disabled={isLoading} />
            </Form>
          )}
        </Formik>
      </FormList>
  
    </>

  )
}

const BackIcon = styled.img`
  width: 20px;
  height: 14px;
  position: relative;
  bottom: 122px;
  left: 18px;
  cursor: pointer;
`;

const FormList = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: ${(props) => props.flexDirection ?? "row"};
  justify-content: space-between;
  width: 100%;
`;

const FlexedInput = styled.div`
  width: 100%;
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
  text-align: left;
`;

const FormDescriptionText = styled.p`
  font-family: "Helvetica Neue", Arial;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0em;
  text-align: center;
  color: #212121;
`;

const FormSupportingText = styled.p`
  font-family: Helvetica Neue, Arial;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #424242;
  letter-spacing: 0em;
  text-align: left;
`;

const Form = styled.form`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: left;
  flex-direction: column;
`;
