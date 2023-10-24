import { request } from "./Request";

interface SlotParam {
    date: string
}

interface BookingParams {
    user_id: number | null,
    hair_salon_id: number,
    slot_id: number,
    hair_dresser_id: number,
    amount: number | undefined,
    salon_haircut_id: number,
    services: number[],
}
const client={
    getSalonDetail: async (id: string,hairId:string) => {
        return await request.get(`/hair_salon_by_id/${id}/${hairId}`);
    },
    getSlots: async (id: number, params: SlotParam) => {
        return await request.post(`/fetch_slots_by_hair_dresser/${id}`, params);
    },
    createBooking: async (params: BookingParams) => {
        return await request.post(`/booking`, params);
    },
}
const user_api =  {
    getUsers: async () => {
        return await request.get(`/user/list`);
    },
    saveUsers: async (data:any) => {
        return await request.post(`/user/store`, data);
    },
    deleteUser: async (data:any) => {
        return await request.delete(`/user/delete/${data.id}`);
    },
    getPermission: async (role:any) => {
        return await request.get(`/permissions/${role}`);
    }
}
export { client, user_api };