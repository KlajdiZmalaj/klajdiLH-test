//
export interface login_register_ParamsProps {
  username: string;
  password: string;
}
export interface login_register_SagaProps {
  params: login_register_ParamsProps;
  type: string;
}
//
export interface registerSagaProps {
  params: login_register_ParamsProps;
  type: string;
}
