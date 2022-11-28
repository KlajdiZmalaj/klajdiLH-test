import { Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Table } from "../../components";
import { restaurantPropTypes, restaurantServicesPropTypes, userPropTypes } from "../../fakeData/data.types";
import { IRootState } from "../../redux-store/store";
import "./styles.scss";
import { menuItemColumns, menusColumns, restaurantsColumns, usersColumns } from "./tableCols";

export default () => {
  const users = useSelector<IRootState>((s) => s.main.users) as userPropTypes[];
  const restaurants = useSelector<IRootState>((s) => s.main.restaurants) as restaurantPropTypes[];
  const restaurantServices =
    (useSelector<IRootState>((s) => s.main.restaurantServices) as restaurantServicesPropTypes) || {};

  const isLoading = useSelector<IRootState>((s) => s.main.loading) as boolean;
  console.log("restaurantServices", restaurantServices);

  return (
    <div className="page">
      {isLoading && (
        <div className="loading">
          <Spin /> Loading...
        </div>
      )}
      <Navbar />
      <Table
        isLoading={isLoading}
        type="user"
        filterKey="role"
        title="Users"
        dataSource={users.filter((u) => /*Remove other admin users */ u.role !== "admin")}
        columns={usersColumns}
      />
      <Table type="restaurant" title="Restaurants" dataSource={restaurants} columns={restaurantsColumns} />
      <Table type="menu" title="Menus" dataSource={restaurantServices.menus || []} columns={menusColumns} />
      <Table
        type="menu_item"
        title="Menu Items"
        dataSource={restaurantServices.foodItems || []}
        columns={menuItemColumns}
      />
      <Table type="order" title="Orders" dataSource={[]} columns={[]} />
    </div>
  );
};
