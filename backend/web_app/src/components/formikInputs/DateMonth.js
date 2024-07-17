import React from "react";
import "./FormikInputFloating.css";
import { FloatingLabel, Form } from "react-bootstrap";
import { useField } from "formik";
import styled from "styled-components";

import dayjs from "dayjs";
import { DatePicker } from "antd";
//
const FormikDateMonthInput = ({
  icon,
  label,
  className,
  placeHolder,
  onChange,
  options = [],
  value,
  defaultValue,
  width = "100%",
  height = "40px",
  format,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const error = meta?.touched && meta?.error ? true : false;

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
      <FloatingLabel controlId={props?.Id} className={props?.className} name={props?.name}>
        <>
          {onChange ? (
            <DatePicker
              defaultValue={defaultValue}
              format={format}
              {...props}
              {...field}
              onChange={(e, dateString) => onChange(e, dateString)}
              style={{ ...(error ? getStyles() : ""), height: "40px", width: width }}
              onBlur={handleBlur}
              value={value}
              status={meta.error ? "error" : ""}
            />
          ) : (
            <DatePicker
              defaultValue={defaultValue}
              format={format}
              {...props}
              {...field}
              style={{ ...(error ? getStyles() : ""), height: "40px", width: width }}
              onBlur={handleBlur}
              value={value}
              status={meta.error ? "error" : ""}
            />
          )}

          {meta?.error ? <div className="input-error-style">{meta?.error}</div> : null}
        </>
      </FloatingLabel>
    </div>
  );
};

export default FormikDateMonthInput;

const InputTextLabel = styled.span`
  font-size: 12px;
  color: #424242;
  font-weight: 500;
  line-height: 18px;
  width: 100%;
`;
