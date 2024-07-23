import React from "react";
import "./FormikInputFloating.css";
import { FloatingLabel } from "react-bootstrap";
import { useField } from "formik";
import styled from "styled-components";
import { ReactComponent as DropDownIcon } from "../../assets/rawSvgs/selectDropDownIcon.svg";
import { Select } from "antd";

const FormikSelectInput = ({
  icon,
  label,
  className,
  placeholder,
  onChange,
  options = [],
  defaultValue,
  width,
  noBr,
  height = "40px",
  selectClassName,
  allowClear,
  ...props
}) => {
  const [field, meta, helpers] = useField(props);
  const error = meta.touched && meta.error ? true : false;

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  return (
    <div className={className}>
      <InputTextLabel>{label}</InputTextLabel>
      {!label && !noBr && <br />}
      <FloatingLabel controlId={props.Id} className={props.className} name={props.name}>
        <>
          <div>
            <Select
              style={{ width: width, minHeight: height, height: height }}
              suffixIcon={<DropDownIcon />}
              onChange={onChange}
              options={options}
              showSearch
              placeholder={placeholder}
              defaultValue={defaultValue}
              {...props}
              className={selectClassName}
              status={meta.error ? "error" : ""}
              {...(allowClear
                ? {
                    allowClear: allowClear,
                  }
                : {})}
            />
          </div>

          {meta.error ? <div className="input-error-style">{meta.error}</div> : null}
        </>
      </FloatingLabel>
    </div>
  );
};

export default FormikSelectInput;

const InputTextLabel = styled.span`
  font-size: 12px;
  color: #424242;
  font-weight: 500;
  line-height: 18px;
  width: 100%;
  margin-bottom: 20px;
`;
