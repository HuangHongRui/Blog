import request from ".";

/**
 * @description 用户信息
 */
export const fetchUserInfo = () => {
  return request.get("/users/info")
}

/**
 * @description 登录
 * @param username 用户名
 * @param password 密码
 */
export const fetchLogin = (data: any) => {
  return request.post("/users/login", data)
}