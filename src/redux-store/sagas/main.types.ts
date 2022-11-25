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
