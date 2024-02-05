import { request } from "./Request";

export type LoginParams = {
  email: string;
  password: string;
};
export type ForgotParams = {
  email: string;
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
  hair_salon: any | null;
  hair_salon2: any | null;
};

export type LoginResponse = {
  token: string;
  user: UserType;
};

const Auth = {
  login: async (params: LoginParams) => {
    return await request.post<LoginResponse>(`/login`, params);
  },
  getUser: async () => {
    return await request.get('/user')
  },
  forgot: async (params: ForgotParams) => {
    return await request.post(`/forgot-password`, params);
  },
  reset: async (params: ForgotParams) => {
    return await request.post(`/password-reset`, params);
  },
  logout: async () => {
    return await request.post(`/logout`);
  },
  signup: async (params: SignupParams) => {
    return await request.post<ResponseType>(`/user`, params);
  },
  emailVerify: async (params: any) => {
    return await request.get(`/email-verify/${params.id}/${params.hash}`, {params: params.searchParams});
  },
  profile: async () => {
    return await request.get(`/user_profile`);
  },
  resendVerifyEmailNotification: async () => {
    return await request.get(`/resend-verification`);
  },
};

export { Auth };
