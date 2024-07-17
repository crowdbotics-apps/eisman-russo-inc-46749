import React from "react";
import "./FormikInputFloating.css";
import { FloatingLabel, Form } from "react-bootstrap";
import { useField } from "formik";
import styled from "styled-components";
import { Input } from "antd";
const { TextArea } = Input;

const FormikTextArea = ({
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
  minRows = 2,
  maxRows = 6,
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
            <TextArea
              disabled={disabled}
              {...props}
              {...field}
              placeholder={placeHolder}
              onBlur={handleBlur}
              autoSize={{
                minRows: minRows,
                maxRows: maxRows,
              }}
            />
          </div>
        </>
      </FloatingLabel>
      {meta.touched && meta.error ? <div className="input-error-style">{meta.error}</div> : null}
    </div>
  );
};

export default FormikTextArea;

const StyledTextArea = styled(TextArea)`
  // Add any additional styling if needed
`;

const InputTextLabel = styled.span`
  font-size: 12px;
  color: #3b3b3b;
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
