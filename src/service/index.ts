import axios from "axios";

const request = axios.create({
  baseURL: "/api"
});

request.interceptors.response.use((res) => {
  if (res.data.errno === 0) {
    return res.data.data
  } else if (res.data.errno === -1 && res.data.message === '未登录'){
    alert('未登录')
    return 
  }
  // alert(res.data.message)
  return res.data
}, (error) => {
  return Promise.reject(error);
})

export default request;