import { Select, Tooltip } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { menuPropTypes, restaurantPropTypes, userPropTypes } from "../fakeData/data.types";
import { MainActions } from "../redux-store/models";
import { columnPropTypes } from "../routes/Dashboard";
import Modal from "./Modal";

export type dataSourceType = userPropTypes[] | restaurantPropTypes[] | menuPropTypes[];
interface tableComponentPropTypes {
  title: string;
  dataSource: dataSourceType;
  columns: columnPropTypes[];
  filterKey?: string;
  type: string;
}
export default ({ title, columns, dataSource, filterKey, type }: tableComponentPropTypes) => {
  const [filterVal, setFilterVal] = useState("Filter by " + filterKey);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isCreating, toggleIsCreating] = useState(true);
  //
  const dispatch = useDispatch();
  //filter table dataSource based on filterkay prop, ex : filter user rows by role name
  //if has filter key filter by select value otherwise dispaly all
  const filteredDataSource = (dataSource as dataSourceType[]).filter((data) =>
    filterKey ? data?.[filterKey as keyof typeof data] === filterVal || filterVal.includes(filterKey) : true,
  ) as dataSourceType;

  console.log("filteredDataSource", title, filterKey, filterVal, dataSource, filteredDataSource);

  return (
    <div className="tableComponent">
      <Modal
        modalData={modalData}
        setModalData={setModalData}
        title={title}
        type={type}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        isCreating={isCreating}
      />
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
            {dataSource.map((data) => {
              return (
                <Select.Option key={data.id} value={data?.[filterKey as keyof typeof data]}>
                  {data?.[filterKey as keyof typeof data]}
                </Select.Option>
              );
            })}
          </Select>
        )}
      </h4>

      <div className="table">
        <div className="table-header">
          {columns.map((col) => {
            return <span key={col.dataIndex}>{col.title}</span>;
          })}
          <span className="actions">Actions</span>
        </div>
        <div className="table-body">
          {filteredDataSource.map((data) => {
            return (
              <div key={data.id} className="table-row">
                {columns.map((col) => (
                  <span key={col.dataIndex}>{data?.[col?.dataIndex as keyof typeof data]}</span>
                ))}
                <span className="actions">
                  <Tooltip title="Delete record">
                    <i
                      onClick={() => {
                        switch (type) {
                          case "user":
                            dispatch(MainActions.deleteUser(data.id));
                            break;
                          case "restaurant":
                            // dispatch(MainActions.deleteRestaurant(data.id))
                            break;

                          case "menu":
                            // dispatch(MainActions.deleteMenu(data.id))
                            break;
                          case "menu_item":
                            // dispatch(MainActions.deleteMenuItem(data.id))
                            break;
                          case "order":
                            // dispatch(MainActions.deleteOrder(data.id))
                            break;
                          default:
                            break;
                        }
                      }}
                      className="fa fa-trash"
                      aria-hidden="true"
                    ></i>
                  </Tooltip>
                  <Tooltip title="Edit record">
                    <i
                      onClick={() => {
                        toggleIsCreating(false);
                        setIsModalOpen(true);
                        setModalData(data);
                      }}
                      className="fa fa-pencil"
                      aria-hidden="true"
                    ></i>
                  </Tooltip>
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="addNew">
        <button
          onClick={() => {
            toggleIsCreating(true);
            setIsModalOpen(true);
            setModalData({});
          }}
        >
          Add new <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};
