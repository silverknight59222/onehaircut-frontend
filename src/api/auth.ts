import { request } from "./Request";

export type LoginParams = {
  email: string;
  password: string;
};
export type SignupParams = {
  name: string;
  phone: string;
  email: string;
  password: string;
};

export type UserType = {
  email: string;
  id: number;
  name: string;
  phone: string;
  role: string;
};

export type LoginResponse = {
  token: string;
  user: UserType;
};

const Auth = {
  login: async (params: LoginParams) => {
    return await request.post<LoginResponse>(`/login`, params);
  },
  logout: async () => {
    return await request.post(`/logout`);
  },
  signup: async (params: SignupParams) => {
    return await request.post<ResponseType>(`/user`, params);
  },
};

export { Auth };
