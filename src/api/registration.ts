import { request } from "./Request";
export interface CreateIntentParams {
    name: string;
    email: string;
    phone: string;
    password: string;
};
const registration = {
    getAllPlans: async () => {
      return await request.get<any>(`stripe/plans`);
    },
    createIntent: async (params: CreateIntentParams) => {
        return await request.post(`stripe/create-intent`, params);
      },
}

export { registration };