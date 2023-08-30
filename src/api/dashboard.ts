import { request } from "./Request";
export interface ResponseType {
  message: string;
  status: number;
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
  servicesIDs: number[]
}

const dashboard = {
  getHairSalon: async (id: number) => {
    return await request.get<any>(`/hair_salon/${id}`);
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
  addSalonHaircut: async (params: any) => {
    return await request.post<ResponseType>(`/salon_haircut`, params);
  },
  updateSalonHaircut: async (id:number, params: any) => {
    return await request.post<ResponseType>(`/salon_haircut/${id}`, params);
  },
  getAllSalonHaircuts: async (id: number) => {
    return await request.get<any>(`/salon_haircuts/${id}`);
  },
  getAllHaircuts: async () => {
    return await request.get<any>(`/haircuts`);
  },
  getAllHaircutBySalon: async (id: number) => {
    return await request.get<any>(`/filtered_haircuts/${id}`);
  },
  deleteSalonHaircut: async (id: number) => {
    return await request.delete<ResponseType>(`/salon_haircut/${id}`);
  },
  getAllServices: async (id: number) => {
    return await request.get<any>(`/filtered_services/${id}`);
  },
  getAllSalonServices: async (id: number) => {
    return await request.get<any>(`/salon_services/${id}`);
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
  addSalonWishList: async (params: SalonWishlistParams) => {
    return await request.post(`/salon_wishlist`, params);
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
};

export { dashboard };
