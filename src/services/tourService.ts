import api from "./api";

export interface TourPayload {
  title: string;
  id:number;
  description: string;
  price: number;
  duration: string;
  capacity: number;
  location: string;
  category: string;
  status: "active" | "inactive" | "draft";
  mainImage: string;
  date: string;
}

const tourService = {
  getAll: async () => {
    const { data } = await api.get("/tours");
    return data;
  },

  getById: async (id: string) => {
    const { data } = await api.get(`/tours/${id}`);
    return data;
  },

  create: async (payload: TourPayload) => {
    const { data } = await api.post("/tours", payload);
    return data;
  },

  update: async (id: string, payload: Partial<TourPayload>) => {
    const { data } = await api.put(`/tours/${id}`, payload);
    return data;
  },

  delete: async (id: string) => {
    await api.delete(`/tours/${id}`);
  },
};

export default tourService;
