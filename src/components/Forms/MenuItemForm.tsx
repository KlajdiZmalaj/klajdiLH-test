import { Form, Input, InputNumber, Select, TimePicker } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { foodItemPropTypes, menuPropTypes, restaurantServicesPropTypes } from "../../fakeData/data.types";
import { MainActions } from "../../redux-store/models";
import { IRootState } from "../../redux-store/store";

export interface formPropTypes {
  modalData?: foodItemPropTypes;
  setModalData?: Function;
  isCreating: boolean;
}
export default ({ modalData = {}, setModalData = () => {}, isCreating }: formPropTypes) => {
  const dispatch = useDispatch();
  const restaurantServices = useSelector<IRootState>((s) => s.main.restaurantServices) as restaurantServicesPropTypes;
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
            MainActions.createRestaurantServices({ ...values, createOn: "foodItems", id: Math.random() }, () => {
              setModalData({});
              form.resetFields();
            }),
          );
        } else {
          //update api
          dispatch(MainActions.updateRestaurantServices({ ...values, updateOn: "foodItems", id: modalData.id }));
        }
      }}
      className="restaurantForm form"
    >
      <Form.Item name="image" label="Image" rules={[{ required: isCreating, message: "Name required!" }]}>
        <Input />
      </Form.Item>
      <img className="foodImg" src={modalData.image} alt="" />
      <Form.Item name="name" label="Menu name" rules={[{ required: isCreating, message: "Name required!" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="price" label="Price" rules={[{ required: isCreating, message: "Price required!" }]}>
        <InputNumber addonAfter="$" />
      </Form.Item>
      <Form.Item name="description" label="Description">
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
