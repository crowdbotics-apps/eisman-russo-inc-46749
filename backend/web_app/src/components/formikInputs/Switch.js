import React from "react";
import "./FormikInputFloating.css";
import { FloatingLabel, Form } from "react-bootstrap";
import { useField } from "formik";
import styled from "styled-components";
import { Switch } from "antd";

const FormikSwitch = ({
  icon,
  label,
  className,
  placeHolder,
  onChange,
  options = [],
  defaultValue,
  width,
  height = "40px",
  disabled,
  checked,
  value,

  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const error = meta.touched && meta.error ? true : false;

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  function getStyles() {
    return {
      border: "1px solid red",
      padding: "5px",
    };
  }

  return (
    <div className={className}>
      <InputTextLabel>{label}</InputTextLabel>
      <FloatingLabel controlId={props.Id} className={props.className} name={props.name}>
        <>
          <div>
            <Switch
              disabled={disabled}
              {...props}
              {...field}
              placeholder={placeHolder}
              onBlur={handleBlur}
              onChange={onChange}
              value={value}
              defaultValue={defaultValue}
            />
          </div>
        </>
      </FloatingLabel>
      {meta?.touched && meta?.error ? <InputError>{meta?.error}</InputError> : null}
    </div>
  );
};

export default FormikSwitch;

const InputTextLabel = styled.span`
  font-size: 12px;
  color: #424242;
  font-weight: 500;
  line-height: 18px;
  width: 100%;
`;

const InputError = styled.div`
  color: #ff6565;
  font-size: 12px;
  position: absolute;
  bottom: -20px; // Adjust this value as needed
  left: 0;
`;
