import axios from "axios";
const request = axios.create({
  baseURL: "/api"
});

request.interceptors.response.use((res) => {
  if (res.data.errno === 0) {
    return res.data.data
  }
  alert(res.data.message)
  return res.data
}, (error) => {
  return Promise.reject(error);
})

export default request;