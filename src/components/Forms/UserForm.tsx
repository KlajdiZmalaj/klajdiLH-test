import { Form, Input, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userPropTypes } from "../../fakeData/data.types";
import { AuthActions, MainActions } from "../../redux-store/models";
import { IRootState } from "../../redux-store/store";
import { getWithOldValues } from "../../utils";
import CheckPermissions from "../CheckPermissions";
export interface formPropTypes {
  modalData?: userPropTypes;
  setModalData?: Function;
  isCreating: boolean;
}
export default ({ modalData = {}, setModalData = () => {}, isCreating }: formPropTypes) => {
  const dispatch = useDispatch();
  const roles = useSelector<IRootState>((s) => s.main.permissions);
  const [form] = Form.useForm();
  return (
    <Form
      form={form}
      initialValues={modalData}
      layout="vertical"
      onFinish={(values: any) => {
        if (isCreating) {
          //create api
          dispatch(
            AuthActions.register({ ...values }, () => {
              setModalData({});
              form.resetFields();
            }),
          );
        } else {
          //update api
          const finalObj = getWithOldValues(values, modalData);
          console.log("update finalObj", modalData, values, finalObj);
          dispatch(MainActions.updateUser({ ...finalObj, id: modalData.id }));
        }
      }}
      className="userForm form"
    >
      <Form.Item name="full_name" label="Full name" rules={[{ required: isCreating }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="E-mail" rules={[{ required: isCreating, type: "email" }]}>
        <Input disabled={!isCreating} />
      </Form.Item>
      <Form.Item name="password" label="Password" rules={[{ required: isCreating }]}>
        <Input.Password visibilityToggle={{ visible: true }} disabled={!isCreating} />
      </Form.Item>
      <Form.Item name="role" label="Select role" rules={[{ required: isCreating }]}>
        <Select>
          {Object.keys(roles as []).map((o) => {
            return (
              <Select.Option key={o} value={o}>
                {o}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <CheckPermissions allowed={[`user.update`]}>
        <Form.Item>
          <button type="submit">
            Save <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </Form.Item>
      </CheckPermissions>
    </Form>
  );
};
