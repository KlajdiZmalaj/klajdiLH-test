//
import { Select } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { foodItemPropTypes, menuPropTypes, orderPropTypes, restaurantPropTypes } from "../../fakeData/data.types";
import { IRootState } from "../../redux-store/store";
import InputComponent from "../InputComponent";
import { isCurrentTimeBetween } from "../TableComponent/TableCustomCell";

export default () => {
  const foodItems = useSelector<IRootState, foodItemPropTypes[]>((s) => s.main.restaurantServices.foodItems) || [];
  const restaurants = useSelector<IRootState, restaurantPropTypes[]>((s) => s.main.restaurants) || [];
  const menus = useSelector<IRootState, menuPropTypes[]>((s) => s.main.restaurantServices.menus) || [];

  const [formData, setData] = useState<orderPropTypes>({});
  const currentRestaurant = restaurants.find((restaurant) => restaurant.id === formData.ordered_in) || {};
  return (
    <div className="createOrder">
      <InputComponent
        options={restaurants}
        label="Select restaurant"
        name="ordered_in"
        formData={formData}
        setData={setData}
        type="select"
      />
      {formData.ordered_in && (
        <>
          <div className="label">Select Menu (You can select only active menus*)</div>
          <div className="activeMenus">
            {(currentRestaurant.menus || [])?.map((menuId) => {
              const currentMenuObj = menus.find((m) => m.id === menuId);
              return (
                <div
                  onClick={() => {
                    if (isCurrentTimeBetween(currentMenuObj?.active_time || "")) setData({ ...formData, menu_id: menuId });
                  }}
                  className={"menu" + (formData["menu_id"] === menuId ? " active" : "")}
                >
                  <span>{currentMenuObj?.name}</span>
                  <span> {isCurrentTimeBetween(currentMenuObj?.active_time || "") ? "Active Menu" : "Inactive Menu"}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
      {formData.menu_id && (
        <>
          <div className="label">Select menu items</div>
          <div className="menuItems"></div>
        </>
      )}
    </div>
  );
};
