import { DatePicker, Form, Input, Select, TimePicker } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { menuPropTypes, restaurantServicesPropTypes } from "../../fakeData/data.types";
import { MainActions } from "../../redux-store/models";
import { IRootState } from "../../redux-store/store";

export interface formPropTypes {
  modalData?: menuPropTypes;
  setModalData?: Function;
  isCreating: boolean;
}
export default ({ modalData = {}, setModalData = () => {}, isCreating }: formPropTypes) => {
  const dispatch = useDispatch();
  const restaurantServices = useSelector<IRootState, restaurantServicesPropTypes>((s) => s.main.restaurantServices);
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
            MainActions.createRestaurantServices({ ...values, createOn: "menus" }, () => {
              setModalData({});
              form.resetFields();
            }),
          );
        } else {
          //update api
          dispatch(MainActions.updateRestaurantServices({ ...values, updateOn: "menus", id: modalData.id }));
        }
      }}
      className="restaurantForm form"
    >
      <Form.Item name="name" label="Menu name" rules={[{ required: isCreating, message: "Name required!" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="items" label="Menu items" rules={[{ required: isCreating, message: "Items are required!" }]}>
        <Select mode="tags">
          {restaurantServices.foodItems.map((food) => {
            return (
              <Select.Option value={food.id} key={food.id}>
                {food.name} {food.price} <img src={food.image} alt="" />
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
      <Form.Item
        name="active_time"
        label="Time for menu (HH:mm - HH:mm)"
        rules={[
          { required: isCreating, message: "Time is required!" },
          {
            validator: (rule, value, callback) => {
              if (value.includes(" - ") && value.includes(":")) {
                callback();
              } else {
                callback("Time should have start and end, example : 09:00 - 14:00");
              }
            },
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <button type="submit">
          Save <i className="fa fa-paper-plane" aria-hidden="true"></i>
        </button>
      </Form.Item>
    </Form>
  );
};
