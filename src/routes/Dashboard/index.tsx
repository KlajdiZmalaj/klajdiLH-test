import React from "react";
import { useSelector } from "react-redux";
import { Navbar, Table } from "../../components";
import { IRootState } from "../../redux-store/store";

const usersColumns = [
  { title: "Name", dataIndex: "full_name", key: "full_name" },
  { title: "Username", dataIndex: "username", key: "username" },
  { title: "Role", dataIndex: "role", key: "username" },
];
const restaurantsColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Username", dataIndex: "username", key: "username" },
  { title: "Role", dataIndex: "role", key: "username" },
];
export default () => {
  const users = useSelector<IRootState>((s) => s.main.users) as [];
  const restaurants = useSelector<IRootState>((s) => s.main.restaurants) as [];
  return (
    <div className="page">
      <Navbar />
      <Table title="Users" dataSource={users} columns={usersColumns} />
      <Table title="Restaurants" dataSource={restaurants} columns={restaurantsColumns} />
      <Table title="Menus" dataSource={users} columns={usersColumns} />
      <Table title="Orders" dataSource={users} columns={usersColumns} />
    </div>
  );
};
