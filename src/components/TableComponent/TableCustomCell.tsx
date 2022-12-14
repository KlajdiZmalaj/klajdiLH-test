import React from "react";
import { useSelector } from "react-redux";
import { orderTypes, restaurantPropTypes, restaurantServicesPropTypes, userPropTypes } from "../../fakeData/data.types";
import { IRootState } from "../../redux-store/store";
import { Tooltip } from "antd";
import { orderStatuses } from "../../fakeData";

interface customColPropTypes {
  type: string;
  col: string;
  value: any;
}
//this comp renders everything based on value not just the value of the object :)
const CustomCol = ({ type, col, value }: customColPropTypes) => {
  const users = useSelector<IRootState, userPropTypes[]>((s) => s.main.users);
  const restaurants = useSelector<IRootState, restaurantPropTypes[]>((s) => s.main.restaurants);
  const restaurantServices = useSelector<IRootState, restaurantServicesPropTypes>((s) => s.main.restaurantServices);

  return (
    <div className="custumCol">
      {/*ASSigned MANGERS on restauran cell */}
      {type === "restaurant" &&
        col === "assigned_managers" &&
        (value || ([] as [])).map((userId: number) => (
          <div key={userId} className="managers">
            {users.find((u) => u.id === userId)?.full_name}
          </div>
        ))}
      {/*ASSigned foods on menu cell */}
      {type === "menu" &&
        col === "items" &&
        (value || ([] as [])).map((foodId: number) => {
          const foodFound = restaurantServices.foodItems.find((f) => f.id === foodId);
          return (
            <div key={foodId} className="foods">
              {foodFound?.name} {foodFound?.price + "$"}
            </div>
          );
        })}
      {/*MENU time cell */}
      {type === "menu" && col === "active_time" && (
        <Tooltip title={isCurrentTimeBetween(value) ? "Menu is active right now" : "Menu not active"}>
          <div className="time">
            {value} <div className={"acTime " + (isCurrentTimeBetween(value) ? "active" : "")} />
          </div>
        </Tooltip>
      )}
      {/* Food item image cell */}
      {type === "menu_item" && col === "image" && (
        <div className="image">
          <img src={value || "https://via.placeholder.com/30"} alt="" />
        </div>
      )}
      {/* Order status */}
      {type === "order" && col === "status" && (
        <div className="orderStatus">
          {(orderStatuses as orderTypes)[value]} {+value === 1 && <div>New order!</div>}
        </div>
      )}
      {/* Order by user  */}
      {type === "order" && col === "ordered_by" && <div> {users.find((u) => u.id === value)?.full_name}</div>}
      {/* Order in wich resttaurnat */}
      {type === "order" && col === "ordered_in" && <div> {restaurants.find((r) => r.id === value)?.name}</div>}
      {type === "order" && col === "date" && <div> {new Date(value).toLocaleString("it")}</div>}
    </div>
  );
};
export const isCurrentTimeBetween = (hourString: string) => {
  let [start, end] = hourString.split("-");
  let startDate = new Date();
  startDate.setHours(+start.split(":")[0]);
  startDate.setMinutes(+start.split(":")[1]);

  let endDate = new Date();
  endDate.setHours(+end.split(":")[0]);
  endDate.setMinutes(+end.split(":")[1]);

  let currentDate = new Date();
  // console.log("isCurrentTimeBetween", hourString, startDate, endDate, currentDate);

  let toReturn;
  if (currentDate.getTime() <= endDate.getTime() && currentDate.getTime() >= startDate.getTime()) {
    toReturn = true;
  } else toReturn = false;
  return toReturn;
};

export default CustomCol;
