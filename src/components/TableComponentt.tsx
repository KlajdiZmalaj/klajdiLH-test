import { Select } from "antd";
import React, { useCallback, useState } from "react";
import { menuPropTypes, restaurantPropTypes, userPropTypes } from "../fakeData/data.types";
import { columnPropTypes } from "../routes/Dashboard";

type dataSourceType = userPropTypes[] | restaurantPropTypes[] | menuPropTypes[];
interface tableComponentPropTypes {
  title: string;
  dataSource: dataSourceType;
  columns: columnPropTypes[];
  filterKey?: string;
}
export default ({ title, columns, dataSource, filterKey }: tableComponentPropTypes) => {
  const [filterVal, setFilterVal] = useState("Filter by " + filterKey);

  const getFilterCol = useCallback(
    (data: dataSourceType) => {
      return data?.[filterKey as keyof typeof data] as string | number;
    },
    [filterKey],
  );
  //filter table dataSource based on filterkay prop, ex : filter user rows by role name
  const filteredDataSource = (dataSource as dataSourceType[]).filter(
    (data) => getFilterCol(data) === filterVal,
  ) as dataSourceType;
  console.log("filteredDataSource", filterKey, filterVal, filteredDataSource);

  return (
    <div className="tableComponent">
      <h4>
        {title}
        {filterKey && (
          <Select
            onChange={(e) => {
              setFilterVal(e);
            }}
            value={filterVal}
          >
            <Select.Option value={filterKey}>All</Select.Option>
            {dataSource.map((data) => (
              <Select.Option key={data.id} value={getFilterCol(data as dataSourceType)}>
                {getFilterCol(data as dataSourceType)}
              </Select.Option>
            ))}
          </Select>
        )}
      </h4>

      <div className="table">
        <div className="table-header">
          {columns.map((col) => {
            return <span key={col.dataIndex}>{col.title}</span>;
          })}
        </div>
        <div className="table-body">
          {filteredDataSource.map((data) => {
            return (
              <div key={data.id} className="table-row">
                {columns.map((col) => (
                  <span key={col.key}>{data?.[col?.dataIndex as keyof typeof data]}</span>
                ))}
              </div>
            );
          })}
        </div>
      </div>
      <div className="addNew">
        <button>
          Add new <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};
