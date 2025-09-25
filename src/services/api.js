import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export const getHealth = () => axios.get(`${API_BASE}/health`);

// Users endpoint
export const getUsers = () => axios.get(`${API_BASE}/api/users`); 