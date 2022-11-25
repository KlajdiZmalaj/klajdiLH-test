//================================== default FAKE mock data as api responses for inital setup ==============================

export const restaurants = [
  {
    id: 1,
    name: "Kripe dhe piper",
    assigned_managers: [],
    menu: [], //array of items
  },
];

const manager = ["order.view", "order.update", "order.create", "menu.view", "menu.create", "menu.update"];
const admin = ["*"];
const client = ["restaurant.view", "order.view", "order.create"];
export const permissions = { manager, admin, client };

export const users = [
  {
    id: 1,
    role: "admin",
    full_name: "Admin Admin",
    username: "root",
    password: "12345",
  },
  { id: 2, role: "manager", full_name: "Manager Toni", username: "toni", password: "12345" },
  { id: 3, role: "client", full_name: "Client Arbri", username: "arbri", password: "12345" },
];
