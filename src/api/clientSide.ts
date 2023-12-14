import { request } from "./Request";

interface SlotParam {
    date: string
}

interface BookingParams {
    user_id: number | null,
    hair_salon_id: number,
    slot_ids: number,
    hair_dresser_id: number,
    amount: number | undefined,
    salon_haircut_id: number | null,
    services: number[],
    date: string | undefined
}

interface paymentIntent {
    amount: number,
    token: string
}

export interface DeactivateAccountParams {
    user_id: string,
}

const client = {
    getSalonDetail: async (id: string, hairId: string) => {
        return await request.get(`/hair_salon_by_id/${id}/${hairId}`);
    },
    getSlots: async (id: number, params: SlotParam) => {
        return await request.post(`/fetch_slots_by_hair_dresser/${id}`, params);
    },
    createBooking: async (params: BookingParams) => {
        return await request.post(`/booking`, params);
    },
    saveNotificationsPreferences: async (params: any) => {
        return await request.post(`/save_notifications_preferences`, params);
    },
    getNotificationsPreferences: async () => {
        return await request.get(`/fetch_notifications_preferences`);
    },
    getUserProfile: async () => {
        return await request.get(`/user_profile`);
    },
    updateUserProfile: async (params: any) => {
        return await request.post(`/update_user_profile`, params);
    },
    resetPassword: async (params: any) => {
        return await request.post(`/client_password_reset`, params);
    },
    getMyHistories: async (page: number) => {
        return await request.get(`/my_histories/${page}`);
    },
    getMyReservations: async (page: number) => {
        return await request.get(`/my_reservations/${page}`);
    },
    storeHairstylePreferences: async (params: any) => {
        return await request.post(`/save_hairstyle_preferences`, params);
    },
    storeSalonPreferences: async (params: any) => {
        return await request.post(`/save_salon_preferences`, params);
    },
    getUserFilterPrefrences: async () => {
        return await request.get(`/user_filter_preferences`);
    },
    resetFilterPreferences: async (params: any) => {
        return await request.post(`/reset_filter_preferences`, params);
    },
    storeUserPotrait: async (params: any) => {
        return await request.post(`/save_user_potrait`, params);
    },
    getUserPotrait: async () => {
        return await request.get(`/fetch_user_potrait`);
    },
    saveBookingRating: async (data: any) => {
        return await request.post(`/booking-rating`, data);
    },
    paymentIntent: async (data: paymentIntent) => {
        return await request.post(`/stripe/payment`, data)
    }
}
const user_api = {
    getUsers: async () => {
        return await request.get(`/user/list`);
    },
    saveUsers: async (data: any) => {
        return await request.post(`/user/store`, data);
    },
    deleteUser: async (data: any) => {
        return await request.delete(`/user/delete/${data.id}`);
    },
    deactivateUser: async (data: DeactivateAccountParams) => {
        return await request.post(`/user/deactivate`, data);
    },
    getAllPermission: async () => {
        return await request.get(`/permissions`);
    },
    getPermission: async (role: any) => {
        return await request.get(`/permissions/${role}`);
    },
    updatePermission: async (data: any) => {
        return await request.post(`/roles/assign-permissions`, data);
    },
    updateSaloonInformation: async (data: any) => {
        return await request.post(`/user-info`, data);
    },
    getSaloonInformation: async () => {
        return await request.get(`/user_profile`);
    },
}
export { client, user_api };