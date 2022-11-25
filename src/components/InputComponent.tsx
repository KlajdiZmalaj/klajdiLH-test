import { Select } from "antd";
import React from "react";

interface optionProps {
  id: number;
  color: string;
  name: string;
}
interface propTypes {
  name: string;
  label: string;
  setData: Function;
  formData: any;
  type: string;
  style: object;
  options: optionProps[];
  withDotColor: boolean;
}

const InputComponent = ({
  name,
  label,
  setData,
  formData,
  type,
  style,
  options = [],
  withDotColor,
  ...rest
}: propTypes) => {
  return (
    <div className="inputComponent" style={style}>
      <div className="label">{label}</div>
      {type === "select" ? (
        <Select
          {...rest}
          value={formData[name]}
          onChange={(e) => {
            setData({ ...formData, [name]: e });
          }}
        >
          {options.map((o) => {
            return (
              <Select.Option
                style={!withDotColor ? { backgroundColor: o.color, color: "#fff" } : {}}
                key={o.id}
                value={o.id}
              >
                {withDotColor && <div className="dotColor" style={{ backgroundColor: o.color }}></div>} {o.name}
              </Select.Option>
            );
          })}
        </Select>
      ) : type === "area" ? (
        <textarea
          {...rest}
          value={formData[name] || ""}
          onChange={(e) => {
            setData({ ...formData, [name]: e.target.value });
          }}
        />
      ) : (
        <input
          {...rest}
          value={formData[name] || ""}
          onChange={(e) => {
            setData({ ...formData, [name]: e.target.value });
          }}
        />
      )}
    </div>
  );
};
export default InputComponent;
