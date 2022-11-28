export interface userPropTypes {
  id?: number;
  username?: string;
  password?: string;
  full_name?: string;
  role?: string;
}
export interface restaurantPropTypes {
  id?: number;
  name?: string;
  assigned_managers?: number[];
  menus?: number[]; //array of items
  location?: string;
}
export interface menuPropTypes {
  id?: number;
  name?: string;
  items?: number[];
  active_time?: string;
}

export interface foodItemPropTypes {
  id?: number;
  name?: string;
  price?: string;
  image?: string;
  description?: string;
}
export interface restaurantServicesPropTypes {
  menus: menuPropTypes[];
  foodItems: foodItemPropTypes[];
}
export interface orderPropTypes {
  id?: number;
  status?: number;
  date?: string;
  items?: number[];
  ordered_by?: number;
  ordered_in?: number;
  menu_id?: number;
}
export type orderTypes = { [key: number]: string };
