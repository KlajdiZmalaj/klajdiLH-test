import { instanceAxios } from "../config";

interface paramsType {}

export const getPermitions = (params: paramsType) => {
  return instanceAxios
    .get("/pathToPermitions", {
      params: {
        ...params,
      },
    })
    .catch((error) => ({ error }));
};
