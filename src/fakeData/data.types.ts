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
  activeTime?: string;
}

export interface foodItemPropTypes {
  id?: number;
  name?: string;
  price?: string;
  image?: string;
  description?: string;
}