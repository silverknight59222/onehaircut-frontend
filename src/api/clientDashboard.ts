import { request } from "./Request";

interface SetChatReadParam{
    client_id: number,
    professional_id: number,
  }
const clientDashboard={
    getSalonsByUser: async (id: number) => {
        return await request.get(`/fetch_salons_by_client/${id}`);
    },
    setChatRead: async (data:SetChatReadParam) => {
      return await request.post(`/client/set_chat_read`, data);
    },
}

export { clientDashboard };