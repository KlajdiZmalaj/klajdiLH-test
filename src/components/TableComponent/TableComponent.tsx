import { Select, Skeleton, Tooltip } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { menuPropTypes, orderPropTypes, restaurantPropTypes, userPropTypes } from "../../fakeData/data.types";
import { MainActions } from "../../redux-store/models";
import { columnPropTypes } from "../../routes/Dashboard/tableCols";
import Modal from "../Modal";
import TableCustomCell from "./TableCustomCell";

export type dataSourceType = userPropTypes[] | restaurantPropTypes[] | menuPropTypes[] | orderPropTypes[];

interface tableComponentPropTypes {
  title: string;
  dataSource: dataSourceType;
  columns: columnPropTypes[];
  filterKey?: string;
  type: string;
  isLoading?: boolean;
}

export default ({ title, columns, dataSource = [], filterKey, type, isLoading }: tableComponentPropTypes) => {
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
            {Object.keys((dataSource as []).reduce((a, b: any) => ({ ...a, [b[filterKey]]: a }), {}) as []).map((data) => {
              return (
                <Select.Option key={data} value={data}>
                  {data}
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
          {isLoading ? (
            <Skeleton />
          ) : (
            filteredDataSource.map((data) => {
              return (
                <div
                  key={data.id}
                  className="table-row"
                  onDoubleClickCapture={() => {
                    toggleIsCreating(false);
                    setIsModalOpen(true);
                    setModalData(data);
                  }}
                >
                  {columns.map((col) => (
                    <span key={col.dataIndex}>
                      {col.customCol ? (
                        <TableCustomCell type={type} col={col.dataIndex} value={data?.[col?.dataIndex as keyof typeof data]} />
                      ) : (
                        data?.[col?.dataIndex as keyof typeof data]
                      )}
                      {col?.addonAfter}
                    </span>
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
                              dispatch(MainActions.deleteRestaurant(data.id));
                              break;

                            case "menu":
                              dispatch(MainActions.deleteRestaurantServices({ deleteOn: "menus", id: data.id }));
                              break;
                            case "menu_item":
                              dispatch(MainActions.deleteRestaurantServices({ deleteOn: "foodItems", id: data.id }));
                              break;
                            case "order":
                              dispatch(MainActions.deleteOrder(data.id));
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
            })
          )}
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
