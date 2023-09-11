import { request } from "./Request";

const client={
    getSalonDetail: async (id: string) => {
        return await request.get(`/hair_salon_by_id/${id}`);
    },
}

export { client };