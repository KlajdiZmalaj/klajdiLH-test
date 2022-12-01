//
export interface login_register_ParamsProps {
  username: string;
  password: string;
  email: string;
  role?: string;
}
export interface login_register_SagaProps {
  params: login_register_ParamsProps;
  type: string;
  restore?: Function;
}
//
export interface registerSagaProps {
  params: login_register_ParamsProps;
  type: string;
}
