import { Table } from "../../components/";
import React from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../../components";
import CreateOrder from "../../components/Forms/CreateOrder";
import { orderPropTypes } from "../../fakeData/data.types";
import { IRootState } from "../../redux-store/store";
import { ordersColumns } from "../Dashboard/tableCols";
export default () => {
  const orders = useSelector<IRootState, orderPropTypes[]>((s) => s.main.orders);

  return (
    <div className="page client">
      <Navbar area="Client Area" />
      <h1>Here you can place and track your orders! </h1>
      <div className="createOrderContainer">
        <CreateOrder />
      </div>
      <Table type="order" title="Orders" dataSource={orders} columns={ordersColumns} />
    </div>
  );
};
