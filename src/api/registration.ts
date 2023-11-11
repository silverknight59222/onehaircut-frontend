import { request } from "./Request";
export interface CreateIntentParams {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface SalonRegisterParams {
  user_id: string;
  salon_name: string;  
  country: string,
  city: string,
  state: string,
  lat: number,
  long: number,
  zone_radius: number,
  salon_type: string;
  payment_method: string;
  plan_id: string;
  plan_name: string;
  salon_description: string
}
const registration = {
  getAllPlans: async () => {
    return await request.get<any>(`stripe/plans`);
  },
  createIntent: async (params: CreateIntentParams) => {
    return await request.post(`stripe/create-intent`, params);
  },
  registerSalon: async (params: SalonRegisterParams) => {
    return await request.post(`stripe/register-salon`, params);
  },
};

export { registration };
