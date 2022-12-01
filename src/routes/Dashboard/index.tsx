import { Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckPermissions, Navbar, Table } from "../../components";
import { orderPropTypes, restaurantPropTypes, restaurantServicesPropTypes, userPropTypes } from "../../fakeData/data.types";
import { MainActions } from "../../redux-store/models";
import { IRootState } from "../../redux-store/store";
import "./styles.scss";
import { menuItemColumns, menusColumns, ordersColumns, restaurantsColumns, usersColumns } from "./tableCols";

export default () => {
  const dispatch = useDispatch();
  //
  const users = useSelector<IRootState, userPropTypes[]>((s) => s.main.users);
  const restaurants = useSelector<IRootState, restaurantPropTypes[]>((s) => s.main.restaurants);
  const restaurantServices = useSelector<IRootState, restaurantServicesPropTypes>((s) => s.main.restaurantServices) || {};
  const orders = useSelector<IRootState, orderPropTypes[]>((s) => s.main.orders);
  const isLoading = useSelector<IRootState>((s) => s.main.loading) as boolean;
  const loggedUser = useSelector<IRootState, userPropTypes>((s) => s.auth.loggedUser) || {};

  //
  useEffect(() => {
    dispatch(MainActions.getUsers());
  }, []);
  return (
    <div className="page">
      {isLoading && (
        <div className="loading">
          <Spin /> Loading...
        </div>
      )}
      <Navbar area="Admin Dashboard" />
      <CheckPermissions allowed={["user.view"]}>
        <Table
          isLoading={isLoading}
          type="user"
          filterKey="role"
          title="Users"
          dataSource={users.filter((u) => /*Remove other admin users */ u.role !== "admin")}
          columns={usersColumns}
        />
      </CheckPermissions>

      <CheckPermissions allowed={["restaurant.view"]}>
        <Table
          type="restaurant"
          title="Restaurants"
          dataSource={restaurants.filter((restaurant: restaurantPropTypes) =>
            loggedUser.role !== "admin" ? restaurant?.assigned_managers?.includes(loggedUser?.uid || "") : true,
          )}
          columns={restaurantsColumns}
        />
      </CheckPermissions>

      <CheckPermissions allowed={["menu.view"]}>
        <Table type="menu" title="Menus" dataSource={restaurantServices.menus} columns={menusColumns} />
      </CheckPermissions>
      <CheckPermissions allowed={["menu.view"]}>
        <Table type="menu_item" title="Menu Items" dataSource={restaurantServices.foodItems} columns={menuItemColumns} />
      </CheckPermissions>
      <CheckPermissions allowed={["order.view"]}>
        <Table filterKey="status" type="order" title="Orders" dataSource={orders} columns={ordersColumns} />
      </CheckPermissions>
    </div>
  );
};
