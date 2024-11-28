import axios from "axios";

const axiosURL = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true
})

export default axiosURL