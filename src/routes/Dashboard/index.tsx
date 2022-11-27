import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Table } from "../../components";
import { restaurantPropTypes, userPropTypes } from "../../fakeData/data.types";
import { IRootState } from "../../redux-store/store";
export interface columnPropTypes {
  title: string;
  dataIndex: string;
  key: string;
}
const usersColumns = [
  { title: "Name", dataIndex: "full_name", key: "full_name" },
  { title: "Username", dataIndex: "username", key: "username" },
  { title: "Role", dataIndex: "role", key: "username" },
] as columnPropTypes[];

const restaurantsColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Managers", dataIndex: "assigned_managers", key: "assigned_managers" },
  { title: "Location", dataIndex: "location", key: "location" },
] as columnPropTypes[];

export default () => {
  const users = useSelector<IRootState>((s) => s.main.users) as userPropTypes[];
  const restaurants = useSelector<IRootState>((s) => s.main.restaurants) as restaurantPropTypes[];
  return (
    <div className="page">
      <Navbar />
      <Table
        type="user"
        filterKey="role"
        title="Users"
        dataSource={users.filter((u) => /*Remove other admin users */ u.role !== "admin")}
        columns={usersColumns}
      />
      <Table type="restaurant" title="Restaurants" dataSource={restaurants} columns={restaurantsColumns} />
      <Table type="menu" title="Menus" dataSource={[]} columns={[]} />
      <Table type="menu_menu" title="Menu Items" dataSource={[]} columns={[]} />
      <Table type="order" title="Orders" dataSource={[]} columns={[]} />
    </div>
  );
};
