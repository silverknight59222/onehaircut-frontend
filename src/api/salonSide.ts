import { request } from "./Request";

interface SlotParam {
    date: string
}

interface FormDataInterface {
    description: string | null,
    logo: File | null,    
}

interface SalonType {
  type: string,    
}
const salonApi = {
    updateLogoAndDescription: async (params: any) => {
        return await request.post(`/update-logo-and-description/`, params);
    },
    getSlots: async (id: number, params: SlotParam) => {
        return await request.post(`/fetch_slots_by_hair_dresser/${id}`, params);
    },
    storeAddresses: async (params: any) => {
      return await request.post(`/save_addresses`, params);
    },
    getAddresses: async () => {
      return await request.get(`/fetch_addresses`);
    },
    saveSalonType: async (params: SalonType) => {
      return await request.post(`/save-salon-type`, params);
    }
}
export { salonApi };