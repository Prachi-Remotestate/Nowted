import axios from "axios";
import type { getfolders } from "../types/apitype";

const BASE_URL = "https://nowted-server.remotestate.com";

export const getFolders = async () => {
  const res = await axios.get<getfolders>(`${BASE_URL}/folders`);
  return res.data?.folders || [];
};

export const createFolder = async (name: string) => {
  return axios.post(`${BASE_URL}/folders`, { name });
};

export const updateFolder = async (id: string, name: string) => {
  return axios.patch(`${BASE_URL}/folders/${id}`, { name });
};

export const deleteFolder = async (id: string) => {
  return axios.delete(`${BASE_URL}/folders/${id}`);
};
