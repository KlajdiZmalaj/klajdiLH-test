//
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { foodItemPropTypes, menuPropTypes, orderPropTypes, restaurantPropTypes, userPropTypes } from "../../fakeData/data.types";
import { MainActions } from "../../redux-store/models";
import { IRootState } from "../../redux-store/store";
import InputComponent from "../InputComponent";
import { isCurrentTimeBetween } from "../TableComponent/TableCustomCell";

export default () => {
  const dispatch = useDispatch();
  //
  const foodItems = useSelector<IRootState, foodItemPropTypes[]>((s) => s.main.restaurantServices.foodItems) || [];
  const restaurants = useSelector<IRootState, restaurantPropTypes[]>((s) => s.main.restaurants) || [];
  const menus = useSelector<IRootState, menuPropTypes[]>((s) => s.main.restaurantServices.menus) || [];
  const loggedUser = useSelector<IRootState, userPropTypes>((s) => s.auth.loggedUser);
  //
  const [formData, setData] = useState<orderPropTypes>({});
  const currentRestaurant = restaurants.find((restaurant) => restaurant.id === formData.ordered_in) || {};
  const currentMenu = menus.find((menu) => menu.id === formData.menu_id) || {};

  //
  useEffect(() => {
    //when user changes menu all ites set to other menu are resett
    setData({ ...formData, items: [] });
  }, [formData.menu_id]);
  console.log("formdata", formData);

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
      {formData.menu_id ? (
        <>
          <div className="label">Select menu items</div>
          <div className="menuItems">
            {(currentMenu.items || []).map((foodItemId) => {
              const foodItemFound = foodItems.find((food) => food.id === foodItemId) || {};
              return <AddFoodITem formData={formData} setData={setData} foodItem={foodItemFound} />;
            })}
          </div>
        </>
      ) : (
        false
      )}

      {formData.items?.length ? (
        <button
          onClick={() => {
            dispatch(
              MainActions.createOrder(
                {
                  data: { ...formData, status: 1, ordered_by: loggedUser.id, date: `${new Date()}` },
                },
                () => {
                  //remove selectedmenu id so he can place another order in the restaurant
                  setData({ ...formData, menu_id: 0 });
                },
              ),
            );
          }}
          className="placeOrderBtn"
        >
          Place Order!
        </button>
      ) : (
        false
      )}
    </div>
  );
};
type AddFoodITemTypes = {
  foodItem: foodItemPropTypes;
  setData: Function;
  formData: menuPropTypes;
};
const AddFoodITem = ({ foodItem, setData, formData }: AddFoodITemTypes) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div className="item">
        <span>{foodItem.name}</span> <span>{foodItem.price}$</span>
      </div>
      <div className="count">
        <button
          onClick={() => {
            if (count > 0) {
              let toSplice = [...(formData.items || [])];
              toSplice.splice(toSplice.indexOf(foodItem.id || 0), 1);
              setData({ ...formData, items: toSplice });
              setCount(count - 1);
            }
          }}
        >
          -
        </button>{" "}
        <span>{count}</span>
        <button
          onClick={() => {
            setData({ ...formData, items: [...(formData.items || []), foodItem.id] });
            setCount(count + 1);
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};
