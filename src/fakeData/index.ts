//================================== default FAKE mock data as api responses for inital setup ==============================

export const restaurants = [
  {
    id: 1,
    name: "Kripe dhe piper",
    assigned_managers: [2],
    menus: [1, 2, 3], //array of items
    location: "Rruga 5maj",
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

export const restaurantServices = {
  menus: [
    {
      id: 1,
      name: "breakfast 1",
      items: [1, 2],
      activeTime: "07:00 - 11:00",
    },
    {
      id: 2,
      name: "lunch 1",
      items: [2, 3],
      activeTime: "11:00 - 17:00",
    },
    {
      id: 3,
      name: "dinner 1",
      items: [2],
      activeTime: "17:00 - 23:00",
    },
  ],
  foodItems: [
    {
      id: 1,
      name: "Boiled Eggs",
      price: "1$",
      image: "",
      description: "loasdas dasdasdas asddasdas",
    },

    {
      id: 2,
      name: "Salad",
      price: "2$",
      image: "",
      description: "loasdas dasdasdas asddasdas",
    },
    {
      id: 3,
      name: "Italian Pasta",
      price: "5$",
      image:
        "https://thumbs.dreamstime.com/b/gourmet-tasty-italian-penne-pasta-plate-close-up-spicy-tomato-herbs-white-served-top-wooden-table-58667798.jpg",
      description: "loasdas dasdasdas asddasdas",
    },
  ],
};
