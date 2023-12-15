import { request } from "./Request";

export interface ResponseType {
  message: string;
  status: number;
  data:[]
}

interface WishlistParams{
  user_id: number,
  haircut_id: number
}

interface SalonWishlistParams{
  user_id: number,
  hair_salon_id: number
}

interface SalonHaircut {
  haircut_id: number,
  servicesIds: number[]
}
interface MessageParam{
 client_id: number,
 professional_id:number,
 message: string,
 by: string,
}

interface FeedbackParam{
  message: string,
  title: string,
  feedback_type: string,
}

interface SetChatReadParam{
  client_id: number,
  professional_id: number,
}

const dashboard = {
  getHairSalon: async (id: number) => {
    return await request.get<any>(`/hair_salon/${id}`);
  },
  updateHairSalonLogo: async (id: number) => {
    return await request.post<any>(`/hair_salon_logo_update/${id}`);
  },
  getAllHairDressers: async (id: number) => {
    return await request.get<any>(`/hair_dresser/${id}`);
  },
  getAllAvatars: async (id: number) => {
    return await request.get<any>(`/avatars`);
  },
  addHairDresser: async (params: any) => {
    return await request.post<ResponseType>(`/hair_dresser`, params);
  },
  getSaloneTimeDurationData: async (params: any) => {
    return await request.post<ResponseType>(`/service`, params);
  },
  getSaloneTimeDuration: async (params: any) => {
    return await request.get<ResponseType>(`/service`, params);
  },
  updateHairDresser: async (id: number,params: any) => {
    return await request.post<ResponseType>(`/hair_dresser/${id}`, params);
  },
  deleteHairDresser: async (id: number) => {
    return await request.delete<ResponseType>(`/hair_dresser/${id}`);
  },
  addSalonImage: async (params: any) => {
    return await request.post<ResponseType>(`/hair_salon_image`, params);
  },
  getAllSalonImages: async (id: number) => {
    return await request.get<any>(`/hair_salon_images/${id}`);
  },
  deleteSalonImage: async (id: number) => {
    return await request.delete<ResponseType>(`/hair_salon_image/${id}`);
  },
  makeSalonImageCover: async (id: number) => {
    return await request.post<ResponseType>(`/hair_salon_image_cover/${id}`);
  },
  addSalonHaircut: async (params: any) => {
    return await request.post<ResponseType>(`/salon_haircut`, params);
  },
  updateSalonHaircut: async (params: any) => {
    return await request.post<ResponseType>(`/update_salon_haircut`, params);
  },
  getAllSalonHaircuts: async (id: number) => {
    return await request.get<any>(`/salon_haircuts_by_hair_salon/${id}`);
  },
  getAllHaircuts: async (page: number) => {
    return await request.get<any>(`/haircuts/${page}`);
  },
  getAllHaircutBySalon: async (id: number, page: number, type: string, params = {}) => {
    if (type == "new") {
      return await request.get<any>(`/haircuts_list/${id}/${page}`, {params: params});
    } else {
      return await request.get<any>(`/salon_haircuts_list/${id}/${page}`, {params: params});
    }
  },
  deleteSalonHaircut: async (id: number) => {
    return await request.delete<ResponseType>(`/salon_haircut/${id}`);
  },
  getAllServices: async (id: number) => {
    return await request.get<any>(`/filtered_services/${id}`);
  },
  getAllSalonServices: async (id: number) => {
    return await request.get<any>(`/salon_services_by_hair_salon/${id}`);
  },
  addSalonServices: async (params: any) => {
    return await request.post<any>(`salon_service`, params);
  },
  updateSalonServices: async (id:number, params: any) => {
    return await request.post<any>(`salon_service/${id}`, params);
  },
  deleteSalonServices: async (id:number) => {
    return await request.delete<any>(`salon_service/${id}`);
  },
  getWishlistHaircuts: async (id: number) => {
    return await request.get<any>(`/wishlist/${id}`);
  },
  getSalonsWishlist: async (id: number) => {
    return await request.get<any>(`/salon_wishlist/${id}`);
  },
  addWishList: async (params: WishlistParams) => {
    return await request.post(`/wishlist`, params);
  },
  removeFromWishList: async (haircutId: number, userId:number) => {
    return await request.delete(`/wishlist/${haircutId}/${userId}`);
  },
  addSalonWishList: async (params: SalonWishlistParams) => {
    return await request.post(`/salon_wishlist`, params);
  },
  removeFromSalonWishList: async (salonId: number, userId:number) => {
    return await request.delete(`/salon_wishlist/${salonId}/${userId}`);
  },
  getSalonsByHaircut: async (params: SalonHaircut) => {
    return await request.post(`/hair_salon_by_haircut_and_services`, params);
  },
  getServicesByHaircut: async () => {
    return await request.get<any>(`/service`);
  },
  getSalonsDetail: async (id: number) => {
    return await request.get<any>(`/hair_salon_by_id/${id}`);
  },
  getSalonsImages: async (id: number) => {
    return await request.get<any>(`/hair_salon_images/${id}`);
  },
  getAllHairSalons: async (id: number) => {
    return await request.get<any>(`/hair_salon/${id}`);
  },
  updateSalonTiming: async (id: number, data:any) => {
    return await request.post<any>(`hair_salon_open_times/${id}`, data);
  },
  updateSalonIsMobile: async (id:number, data:any) => {
    return await request.post<any>(`hair_salon_is_mobile/${id}`, data);
  },
  updateSalonSlot: async ( data:any) => {
    return await request.post<any>(`update_multiple_slot`, data);
  },
  getBookingsByHairsalon: async (id: number) => {
  return await request.get<any>(`bookings/${id}`);
  },
  getClientsBySalon: async (id: number) => {
    return await request.get(`/fetch_clients_by_salon/${id}`);
  },
  getChat: async (clientId: number, professionalId:number) => {
    return await request.get(`/fetch_chat/${clientId}/${professionalId}`);
  },
  setChatRead: async (data:SetChatReadParam) => {
    return await request.post(`/set_chat_read`, data);
  },
  sendMessage: async ( param: MessageParam) => {
    return await request.post<any>(`send_message`, param);
  },
  sendFeedback: async ( param: FeedbackParam) => {
    return await request.post<any>(`send_professional_feedback`, param);
  },
  sendWhatsapp: async (data:any) => {
    return await request.post<any>(`send_whatsapp`, data);
  },
  salonStats: async () => {
    return await request.get<any>(`hair_salon_stats`);
  },
  monthlyRevenueChart: async (period) => {
    return await request.get<any>(`revenue_chart`, {params: {period : period}});
  },
  revenueStats: async (period) => {
    return await request.get<any>(`revenue_stats`, {params: {period : period}});
  },
  salonTransactionList: async (period, page) => {
    return await request.get<any>(`salon_transactions`, {params: {period : period, page: page}});
  },
  hairstyleChart: async (period) => {
    return await request.get<any>(`hairstyle_chart`, {params: {period : period}});
  },
  hairdresserRevenueChart: async (period) => {
    return await request.get<any>(`hairdresser_revenue_chart`, {params: {period : period}});
  },
  staffActivityChart: async (period) => {
    return await request.get<any>(`staff_activity_chart`, {params: {period : period}});
  },
  staffLoadChart: async (period) => {
    return await request.get<any>(`staff_load_chart`, {params: {period : period}});
  },
  dayWiseVisitChart: async (period) => {
    return await request.get<any>(`day_wise_visit_chart`, {params: {period : period}});
  },
  salonNotification: async () => {
    return await request.get<any>(`hair_salon_notification`);
  },
  userNotification: async () => {
    return await request.get<any>(`user_notification`);
  },
  checkTopBarStatus: async(salonId) => {
    return await request.get(`check_topbar_status/${salonId}`);
  },
  cancelBooking: async(bookingId) => {
    return await request.get(`booking-cancel/${bookingId}`);
  }
};

export { dashboard };
