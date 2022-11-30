export interface columnPropTypes {
  title: string;
  dataIndex: string;
  key: string;
  customCol?: boolean;
  addonAfter?: any;
}
export const usersColumns = [
  { title: "Name", dataIndex: "full_name", key: "full_name" },
  { title: "Username", dataIndex: "username", key: "username" },
  { title: "Role", dataIndex: "role", key: "username" },
] as columnPropTypes[];

export const restaurantsColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Managers", dataIndex: "assigned_managers", key: "assigned_managers", customCol: true },
  { title: "Location", dataIndex: "location", key: "location" },
] as columnPropTypes[];

export const menusColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Foods", dataIndex: "items", key: "items", customCol: true },
  { title: "Active Time", dataIndex: "active_time", key: "active_time", customCol: true },
] as columnPropTypes[];

export const menuItemColumns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Price", dataIndex: "price", key: "price", addonAfter: "$" },
  { title: "Image", dataIndex: "image", key: "image", customCol: true },
  { title: "Description", dataIndex: "description", key: "description" },
] as columnPropTypes[];

export const ordersColumns = [
  { title: "ID", dataIndex: "id", key: "id" },
  { title: "Status", dataIndex: "status", key: "status", customCol: true },
  { title: "Date", dataIndex: "date", key: "date", customCol: true },
  { title: "Ordered by", dataIndex: "ordered_by", key: "ordered_by", customCol: true },
  { title: "Ordered in", dataIndex: "ordered_in", key: "ordered_in", customCol: true },
] as columnPropTypes[];
