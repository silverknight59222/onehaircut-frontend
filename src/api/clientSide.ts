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
    savePrefrences: async (params: any) => {
        return await request.post(`/user/save_prefrences`, params);
    },
    getSavePrefrences: async () => {
        return await request.get(`/user/get_saved_prefrences`);
    },
}

export { client };