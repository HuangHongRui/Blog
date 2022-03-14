import axios from "axios";
const request = axios.create();

request.interceptors.response.use((config) => {
  return config.data;
}, (error) => {
  return Promise.reject(error);
})

export const getMusic = (data?: { [key: string]: string | number }) => {
  return request.get("/api/music", { params: data });
};

export default request;