import { useSelector } from "react-redux";
import { userPropTypes } from "../fakeData/data.types";
import { IRootState } from "../redux-store/store";

type PropTypes = {
  allowed: string[];
  children: JSX.Element;
};

const CheckPermissions: React.FC<PropTypes> = ({ children, allowed }) => {
  const permissions = useSelector<IRootState, any>((s) => s.main.permissions) || [];
  const loggedUser = useSelector<IRootState, userPropTypes>((s) => s.auth.loggedUser) || {};
  const currentRolePermissions = permissions[loggedUser?.role as keyof typeof permissions] || [];
  const hasPermissions = currentRolePermissions.includes("*") || currentRolePermissions.some((a: string) => allowed.includes(a));

  // console.log("permissions", permissions, allowed, hasPermissions);

  return hasPermissions ? children : null;
};
export default CheckPermissions;
