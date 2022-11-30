import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Table } from "../../components";
import { orderPropTypes, restaurantPropTypes, restaurantServicesPropTypes, userPropTypes } from "../../fakeData/data.types";
import { IRootState } from "../../redux-store/store";
import "./styles.scss";
import { menuItemColumns, menusColumns, ordersColumns, restaurantsColumns, usersColumns } from "./tableCols";

export default () => {
  const users = useSelector<IRootState, userPropTypes[]>((s) => s.main.users);
  const restaurants = useSelector<IRootState, restaurantPropTypes[]>((s) => s.main.restaurants);
  const restaurantServices = useSelector<IRootState, restaurantServicesPropTypes>((s) => s.main.restaurantServices) || {};
  const orders = useSelector<IRootState, orderPropTypes[]>((s) => s.main.orders);
  const isLoading = useSelector<IRootState>((s) => s.main.loading) as boolean;

  return (
    <div className="page">
      {isLoading && (
        <div className="loading">
          <Spin /> Loading...
        </div>
      )}
      <Navbar area="Admin Dashboard" />
      <Table
        isLoading={isLoading}
        type="user"
        filterKey="role"
        title="Users"
        dataSource={users.filter((u) => /*Remove other admin users */ u.role !== "admin")}
        columns={usersColumns}
      />
      <Table type="restaurant" title="Restaurants" dataSource={restaurants} columns={restaurantsColumns} />
      <Table type="menu" title="Menus" dataSource={restaurantServices.menus} columns={menusColumns} />
      <Table type="menu_item" title="Menu Items" dataSource={restaurantServices.foodItems} columns={menuItemColumns} />
      <Table type="order" title="Orders" dataSource={orders} columns={ordersColumns} />
    </div>
  );
};
