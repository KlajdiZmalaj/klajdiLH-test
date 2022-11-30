import { Form, Input, Select, Slider } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderStatuses } from "../../fakeData";
import { foodItemPropTypes, orderPropTypes, restaurantServicesPropTypes } from "../../fakeData/data.types";
import { MainActions } from "../../redux-store/models";
import { IRootState } from "../../redux-store/store";
import CreateOrder from "./CreateOrder";
import { getSum } from "../../utils";

export interface formPropTypes {
  modalData?: orderPropTypes;
  setModalData?: Function;
  isCreating: boolean;
}
export default ({ modalData = {}, setModalData = () => {}, isCreating }: formPropTypes) => {
  const dispatch = useDispatch();
  const currentOrder =
    (useSelector<IRootState, orderPropTypes[]>((s) => s.main.orders) || []).find((o) => o.id === modalData.id) || {};
  const [form] = Form.useForm();
  const foodItems = useSelector<IRootState, foodItemPropTypes[]>((s) => s.main.restaurantServices.foodItems) || [];
  return isCreating ? (
    <CreateOrder />
  ) : (
    <Form form={form} initialValues={modalData} layout="vertical" className="orderForm form">
      <h3>Order {modalData.id}</h3>
      <Slider
        onChange={(status) => {
          dispatch(MainActions.updateOrder({ id: currentOrder.id, status }));
        }}
        marks={orderStatuses}
        step={null}
        defaultValue={currentOrder.status}
        max={6}
        min={1}
      />
      {currentOrder.status === 1 && (
        <div className="acceptOder">
          <h5>Accept this order ?</h5>
          <div className="buttons">
            <button
              onClick={() => {
                //aprovced status id
                dispatch(MainActions.updateOrder({ id: currentOrder.id, status: 2 }));
              }}
            >
              Yes
            </button>
            <button
              onClick={() => {
                //rejected status id
                dispatch(MainActions.updateOrder({ id: currentOrder.id, status: 6 }));
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
      <hr />
      <h3>Order receipt</h3>
      <div className="orderItems">
        {(currentOrder.items || [])?.map((itemId) => {
          const foodFound = foodItems.find((food) => food.id === itemId);
          return (
            <div key={itemId}>
              {foodFound?.name} <span>{foodFound?.price}$</span>
            </div>
          );
        })}

        <div className="totalOrder">
          <hr />
          <span></span>
          <span>
            Total :
            {getSum(
              (currentOrder.items || [])?.map((itemId) => +(foodItems.find((food) => food.id === itemId)?.price || 0)) as [],
            )}
            $
          </span>
        </div>
      </div>
    </Form>
  );
};
