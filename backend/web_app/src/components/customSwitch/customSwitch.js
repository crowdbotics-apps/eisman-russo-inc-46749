import React, { useState } from 'react';
import { Switch } from 'antd';
import { ReactComponent as CheckIcon } from "../../assets/rawSvg/check.svg";
import { ReactComponent as MinusIcon } from "../../assets/rawSvg/minus.svg";
import HeadingComponent from '../headingComponent/heading';


export default function CustomSwitch({ initialStatus = true, onChange }) {
    const [status, setStatus] = useState(initialStatus);
    const handleChange = (checked) => {
        setStatus(checked);
        if (onChange) {
          onChange(checked);
        }
    };

    return (
        <Switch
            style={{ backgroundColor: status ? "#3669AE" : "#BAC4CF", width: "80px", height: "25px", borderRadius: "15px" , marginTop:"8px"}}
            checkedChildren={
                <span >
                {status && <CheckIcon style={{ position: "relative", bottom: "1px", left: "36px" }} />}
                <span style={{position:"relative", bottom:"21px", right:"1px"}}>
                    Active
                </span>
                </span>
            }
            unCheckedChildren={
                <span>
                {!status && <MinusIcon style={{ position: "relative", bottom: "1px", right: "37px   " }} />}
                <span style={{color:"#667085", position:"relative", left:"1px", bottom:"21px"}}>
                    Inactive
                </span>
                </span>
            }
            checked={status}
            onChange={handleChange}
         />
    )
}

const Heading = ({ text = "", margin, fontSize = "0.75rem", color = "#3B3B3B" }) => {
    return <HeadingComponent text={text} fontSize={fontSize} color={color} fontWeight={700} margin={margin} />;
};