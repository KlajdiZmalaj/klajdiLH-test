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
  params: any;
  type: string;
}
//
export interface getUsersSagaProps {
  params: any;
  type: string;
}
export interface crudUserSagaProps {
  data?: any;
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
