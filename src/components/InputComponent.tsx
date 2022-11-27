import { Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

interface propTypes {
  name?: string;
  label?: string;
  setData?: Function;
  formData?: any;
  type?: string;
  style?: object;
  options?: string[];
}

const InputComponent = ({
  name,
  label,
  setData = () => {},
  formData = {},
  type,
  style,
  options = [],
  ...rest
}: propTypes) => {
  return (
    <div className="inputComponent" style={style}>
      <div className="label">{label}</div>
      {type === "select" ? (
        <Select
          {...rest}
          value={formData[name as keyof typeof formData]}
          onChange={(e) => {
            setData({ ...formData, [name as keyof typeof e]: e });
          }}
        >
          {options.map((o) => {
            return (
              <Select.Option key={o} value={o}>
                {o}
              </Select.Option>
            );
          })}
        </Select>
      ) : type === "area" ? (
        <TextArea
          {...rest}
          value={formData[name as keyof typeof formData] || ""}
          onChange={(e) => {
            setData({ ...formData, [name as keyof typeof e]: e.target.value });
          }}
        />
      ) : (
        <Input
          {...rest}
          value={formData[name as keyof typeof formData] || ""}
          onChange={(e) => {
            setData({ ...formData, [name as keyof typeof e]: e.target.value });
          }}
        />
      )}
    </div>
  );
};
export default InputComponent;
