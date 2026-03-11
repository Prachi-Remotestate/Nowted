import axios from "axios";
import type { AllNotes, recentNote } from "../types/apitype";

const BASE_URL = "https://nowted-server.remotestate.com/notes";

export const getRecentNotes = async () => {
  const res = await axios.get<recentNote>(`${BASE_URL}/recent`);
  return res.data?.recentNotes || [];
};

export const getNotes = async (params?: Record<string, any>) => {
  const res = await axios.get<AllNotes>(BASE_URL, {
    params,
  });

  return res.data;
};
export const createNote = async (folderId: string) => {
  const res = await axios.post(`${BASE_URL}`, {
    title: "",
    content: "",
    folderId,
  });

  return res.data;
};

export const getNote = (id: string) => {
  return axios.get(`${BASE_URL}/${id}`);
};

export const updateNote = (id: string, data: any) => {
  return axios.patch(`${BASE_URL}/${id}`, data);
};

export const deleteNote = (id: string) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const restoreNote = (id: string) => {
  return axios.post(`${BASE_URL}/${id}/restore`);
};
