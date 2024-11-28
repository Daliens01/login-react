import axiosURL from "./axios.js"
const API = "http://localhost:4000/api"
export const registerRequest = user => axiosURL.post(`/register`,user)
export const loginRequest = user => axiosURL.post(`/login`,user)
export const verifyTokenRequest = () => axiosURL.get("/verify")