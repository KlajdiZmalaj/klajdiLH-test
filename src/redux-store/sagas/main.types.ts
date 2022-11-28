type commonParamsType = {
  id: number;
  from?: Date;
  to?: Date;
};
export interface getPermissionsParamsProps {
  role?: string;
  id?: number | string;
}
export interface getPermissionsSagaProps {
  //example params for permitions for backend
  params: getPermissionsParamsProps;
  type: string;
}
//
export interface getRestaurantsSagaProps {
  params: commonParamsType;
  type: string;
}
export interface getRestaurantServicesSagaProps {
  params: commonParamsType;
  type: string;
}
//
export interface getUsersSagaProps {
  params: commonParamsType;
  type: string;
}
export interface crudUserSagaProps {
  data?: any;
  user_id?: number;
  type: string;
  restore?: () => void;
}
export interface crudOrderSagaProps {
  params: commonParamsType;
  data?: object;
  user_id?: number;
  type: string;
  restore?: () => void;
}
export interface crudRestaurantSagaProps {
  data?: any;
  restaurant_id?: number;
  type: string;
  restore?: () => void;
}
type onType = "menus" | "foodItems";
export interface updateRestaurantServicesSagaProps {
  data: {
    updateOn: onType;
    id: number;
  };
  type: string;
}
export interface createRestaurantServicesSagaProps {
  data: {
    createOn: onType;
    id: number;
  };
  type: string;
}

export interface deleteRestaurantServicesSagaProps {
  data: {
    deleteOn: onType;
    id: number;
  };
  type: string;
}
