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
  zone_radius: number,
  zone_duration: number
  price: Number,
}
interface UnavailabilityData {
  start_date: String;
  end_date: String;
  reason: string;
  status: string;
  hdId: String
}
interface SalonUnavailability {
  start_date: String;
  end_date: String,
  reason: String;
  status: String;
  salon_id: number
}
interface FilterSalon{
  client_id : Number,
  haircut_id : Number,
  services : Number[],
  citySearch : String,
  nameSearch : String,
  filteredMobile : String[],
  filtereRange : Number[],
  ratingFilter : Number[],
  countryFilter : String,
  availabilityFilter : String[],
  newSalonFilter :Boolean
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
  getBillPerKM: async (clientId: number, hairSalonId: number) => {
    return await request.post(`/fetch_bill_per_km/${clientId}/${hairSalonId}`);
  },
  getAvailableHairDresser: async (bookingId: number) => {
    return await request.get(`/available-hairdresser/${bookingId}`);
  },
  updateBookingHairDresser: async (bookingId: number, hair_dresser_id: number) => {
    return await request.post(`/update-booking-hairdresser/${bookingId}`, { hair_dresser_id });
  },
  getSubscription: async () => {
    return await request.get('/current-plan');
  },
  upgradeToProPlan: async () => {
    return await request.post(`/upgrade-plan`);
  },
  downgradeToFreePlan: async () => {
    return await request.post(`/downgrade-plan`);
  },
  getHairDresserAvailability: async (hairDresserID: number) => {
    return await request.get(`/hair_dresser_unavaiablity/${hairDresserID}`);
  },
  addHairDresserUnavailability: async (params: UnavailabilityData) => {
    return await request.post('hair_dresser_unavaiablity', params);
  },
  delHairDresserUnavailability: async (hairDresserID: number) => {
    return await request.delete(`hair_dresser_unavaiablity/${hairDresserID}`);
  },
  addSalonUnavailability: async (params: SalonUnavailability) => {
    return await request.post('salon_unavailability', params);
  },
  getSalonUnavailability: async (salonID: number) => {
    return await request.get(`salon_unavailability/${salonID}`);
  },
  delSalonUnavailability: async(salonID : number) => {
    return await request.delete(`salon_unavailability/${salonID}`);
  },
  filterSalon:async(params : FilterSalon) => {
    return await request.post(`salon_filter`,params);
  },
  removeHaircuts: async(params: any) => {
    return await request.post(`remove_haircuts_from_salon`,params);
  },
  getStripeKey: async() => {
    return await request.get('stripe/stripe_key');
  }

}
export { salonApi };