import axios from "axios";
const request = axios.create({
  baseURL: "/api"
});

request.interceptors.response.use(res => {
  return res.data
}, (error) => {
  return Promise.reject(error);
})

export default request;