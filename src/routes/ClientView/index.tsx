import { Table } from "../../components/";
import React from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../../components";
import CreateOrder from "../../components/Forms/CreateOrder";
import { orderPropTypes, userPropTypes } from "../../fakeData/data.types";
import { IRootState } from "../../redux-store/store";
import { ordersColumns } from "../Dashboard/tableCols";

export default () => {
  const orders = useSelector<IRootState, orderPropTypes[]>((s) => s.main.orders);
  const loggedUser = useSelector<IRootState, userPropTypes>((s) => s.auth.loggedUser);

  console.log("orders", orders);

  return (
    <div className="page client">
      <Navbar area="Client Area" />
      <h1>Here you can place and track your orders! </h1>
      <div className="createOrderContainer">
        <CreateOrder />
      </div>
      <Table
        type="order"
        title="My Orders (Ordered by date)"
        dataSource={orders
          .filter((order) => `${order.ordered_by}` === `${loggedUser.uid}`)
          .sort((a, b) => new Date(b.date || "").getTime() - new Date(a.date || "").getTime())}
        columns={ordersColumns}
      />
    </div>
  );
};
