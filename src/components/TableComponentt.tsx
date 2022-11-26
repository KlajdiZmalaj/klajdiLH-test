import React from "react";
import { Table } from "antd";
import { userPropTypes } from "../redux-store/sagas/auth.types";

interface tableComponentPropTypes {
  title: string;
  dataSource: userPropTypes[];
  columns: any[];
}
export default ({ title, columns, dataSource }: tableComponentPropTypes) => {
  return (
    <div className="tableComponent">
      <h4>{title}</h4>
      <Table columns={columns} dataSource={dataSource} />
    </div>
  );
};
