import React, { useEffect, useState } from 'react';
import { Switch } from 'antd';
import { ReactComponent as CheckIcon } from "../../assets/rawSvg/check.svg";
import { ReactComponent as MinusIcon } from "../../assets/rawSvg/minus.svg";

export default function CustomSwitch({ value = true, onChange }) {
  const [status, setStatus] = useState(value);


  useEffect(() => {
    setStatus(value);
  }, [value]);

  const handleChange = (newValue) => {
    onChange(newValue);
  };

  return (
    <Switch
      style={{ backgroundColor: status ? "#3669AE" : "#BAC4CF", width: "80px", height: "22.5px", borderRadius: "15px", marginTop: "8px" }}
      checkedChildren={
        <span>
          {status && <CheckIcon style={{ position: "relative", bottom: "1px", left: "36px" }} />}
          <span style={{ position: "relative", bottom: "21px", right: "1px" }}>
            Active
          </span>
        </span>
      }
      unCheckedChildren={
        <span>
          {!status && <MinusIcon style={{ position: "relative", bottom: "1px", right: "37px" }} />}
          <span style={{ color: "#667085", position: "relative", left: "1px", bottom: "21px" }}>
            Inactive
          </span>
        </span>
      }
      checked={status}
      onChange={handleChange}
    />
  );
}
