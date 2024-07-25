
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";
import FormikInputFloating from "../../components/formikInputs/TextInput";
import AuthButton from "../../components/buttons/authButton";
import axiosInstance from "../../util/axiosConfig";
import { adminAPIsEndPoints } from "../../constants/apiEndPoints";
import { pushNotification } from "../../util/notification";
import { loginFormSchema } from "../../constants/authFormFieldsSchema/formSchema";

export default function SignIn(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInData, setLoggedInData] = useState(undefined);
  const [loader, setLoginLoader] = useState(false);

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

  const signin = async (values) => {
    console.log("values", values);
  };

  const handleForgotPasswordClick = () => {
    console.log("forgot password");
    props.setIsAnimating(true);
    props.onForgotPasswordClick();
  };

  return (
   
          <FormList>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                signin(values);
              }}
              validationSchema={loginFormSchema}
              enableReinitialize
              validateOnChange={false}
            >
              {({ handleSubmit, error, values }) => (
                <Form onSubmit={handleSubmit} autoComplete="new-password">
                  {!loggedInData && (
                    <>
                      <FormHeader>Login</FormHeader>
                      <FormDescriptionText>Welcome Back! Please enter your credentials.</FormDescriptionText>
                      <P20 />
                      <FormikInputFloating
                        label="Email"
                        name="email"
                        type="text"
                        className="w-100 mb-2"
                        autoComplete="new-password"
                      />
                      <FormikInputFloating
                        label="Password"
                        name="password"
                        type="password"
                        className="w-100"
                        autoComplete="off"
                        passwordField={true}
                      />
                      <FormSupportingText
                        onClick={handleForgotPasswordClick}
                        style={{ marginLeft: "auto", marginTop: "10px", cursor: "pointer" }}
                      >
                        Forgot password?
                      </FormSupportingText>
                      <Flex flexDirection={"column"}>
                        <FlexedInput>
                          <AuthButton btnText={"Login"} type="submit" disabled={loader} />
                        </FlexedInput>
                      </Flex>
                    </>
                  )}
                </Form>
              )}
            </Formik>
          </FormList>
      
   
  );
}

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

const LogoContainer = styled.div`
  position: absolute;
  top: 25px;
  left: 125px;
`;
