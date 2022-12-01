import { Form, Input, Select } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuPropTypes, restaurantPropTypes, userPropTypes } from "../../fakeData/data.types";
import { MainActions } from "../../redux-store/models";
import { IRootState } from "../../redux-store/store";
import CheckPermissions from "../CheckPermissions";
export interface formPropTypes {
  modalData?: restaurantPropTypes;
  setModalData?: Function;
  isCreating: boolean;
}
export default ({ modalData = {}, setModalData = () => {}, isCreating }: formPropTypes) => {
  const dispatch = useDispatch();
  const users = useSelector<IRootState>((s) => s.main.users);
  const menus = useSelector<IRootState>((s) => s.main.restaurantServices?.menus) || [];
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
            MainActions.createRestaurant({ ...values }, () => {
              setModalData({});
              form.resetFields();
            }),
          );
        } else {
          //update api
          dispatch(MainActions.updateRestaurant({ ...values, id: modalData.id }));
        }
      }}
      className="restaurantForm form"
    >
      <Form.Item name="name" label="Restaurant name" rules={[{ required: isCreating }]}>
        <Input />
      </Form.Item>
      <Form.Item name="location" label="Location Address" rules={[{ required: isCreating }]}>
        <Input />
      </Form.Item>
      <CheckPermissions allowed={[`restaurant.assigned_managers`]}>
        <Form.Item name="assigned_managers" label="Assign multiple managers" rules={[{ required: isCreating }]}>
          <Select mode="tags">
            {(users as [])
              .filter((user: userPropTypes) => user.role === "manager")
              .map((user: userPropTypes) => {
                return (
                  <Select.Option key={user.id} value={user.id}>
                    {user.full_name}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>
      </CheckPermissions>
      <CheckPermissions allowed={[`restaurant.update_menus`]}>
        <Form.Item name="menus" label="Assign multiple menus" rules={[{ required: isCreating }]}>
          <Select mode="tags">
            {(menus as []).map((menu: menuPropTypes) => {
              return (
                <Select.Option key={menu.id} value={menu.id}>
                  {menu.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </CheckPermissions>

      <CheckPermissions allowed={[`restaurant.update`, "restaurant.update_menus"]}>
        <Form.Item>
          <button type="submit">
            Save <i className="fa fa-paper-plane" aria-hidden="true"></i>
          </button>
        </Form.Item>
      </CheckPermissions>
    </Form>
  );
};
