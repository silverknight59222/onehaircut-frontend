import { request } from "./Request";

const clientDashboard={
    getSalonsByUser: async (id: number) => {
        return await request.get(`/fetch_salons_by_client/${id}`);
    },
}

export { clientDashboard };