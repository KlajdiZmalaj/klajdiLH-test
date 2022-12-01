//================================== default FAKE mock data demonstration ==============================

/////PERMISSIONS
const admin = ["*"];
const manager = [
  "order.view",
  "order.update",
  "order.create",
  "menu.view",
  "menu.create",
  "menu.update",
  "menu_item.view",
  "menu_item.create",
  "menu_item.update",
  "restaurant.view",
  "restaurant.update_menus",
];
const client = ["restaurant.view", "order.view", "order.create", "order.delete"];
export const permissions = { manager, admin, client };

//api responses ==============================================================================
export const restaurants = [
  {
    id: 1,
    name: "Kripe dhe piper",
    assigned_managers: [2],
    menus: [1, 2, 3], //array of items
    location: "Rruga 5maj",
  },
];

//==============================================================================

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
//==============================================================================

export const restaurantServices = {
  menus: [
    {
      id: 1,
      name: "breakfast 1",
      items: [1, 2],
      active_time: "07:00 - 11:00",
    },
    {
      id: 2,
      name: "lunch 1",
      items: [2, 3],
      active_time: "11:00 - 17:00",
    },
    {
      id: 3,
      name: "dinner 1",
      items: [2],
      active_time: "17:00 - 23:00",
    },
  ],
  foodItems: [
    {
      id: 1,
      name: "Boiled Eggs",
      price: 1,
      image: "",
      description: "loasdas dasdasdas asddasdas",
    },

    {
      id: 2,
      name: "Salad",
      price: 2,
      image: "",
      description: "loasdas dasdasdas asddasdas",
    },
    {
      id: 3,
      name: "Italian Pasta",
      price: 5,
      image:
        "https://thumbs.dreamstime.com/b/gourmet-tasty-italian-penne-pasta-plate-close-up-spicy-tomato-herbs-white-served-top-wooden-table-58667798.jpg",
      description: "loasdas dasdasdas asddasdas",
    },
  ],
};
//==============================================================================

export const orders = [
  {
    id: 1,
    status: 1,
    date: "04-11-2022 13:45:12",
    items: [1, 2],
    ordered_by: 3,
    ordered_in: 1,
  },
];

export const orderStatuses = {
  1: "Created",
  2: "Approved",
  3: "Prepared",
  4: "Waiting for delivery",
  5: "Delivered",
  6: "Rejected",
};
