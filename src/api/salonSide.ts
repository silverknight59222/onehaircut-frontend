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
interface SalonMobility {
  is_mobile: boolean,    
}
interface SalonMobilityZone {
  zone_radius: number
}
const salonApi = {
    updateLogoAndDescription: async (params: any) => {
        return await request.post(`/update-logo-and-description`, params);
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
    },
    saveSalonMobility: async (params: SalonMobility) => {
      return await request.post(`/save-salon-mobility`, params);
    },
    saveZoneRadius: async (params: SalonMobilityZone) => {
      return await request.post(`/save-salon-mobility-zone`, params);
    },
    getAvailableHairDresser: async (bookingId: number) => {
      return await request.get(`/available-hairdresser/${bookingId}`);
    },
    updateBookingHairDresser: async (bookingId: number, hair_dresser_id: number) => {
      return await request.post(`/update-booking-hairdresser/${bookingId}`, {hair_dresser_id});
    }
}
export { salonApi };