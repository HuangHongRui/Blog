import request from ".";

/**
 * @description 博客列表
 * @param author
 * @param keyword_title
 * @param keyword_content
 */
export const fetchBlogs = (data: any) => {
  return request.get("/blogs/list", { params: data })
}

/**
 * @description 博客
 * @param id
 */
export const fetchBlog = (data: any) => {
  return request.get("/blogs/detail", { params: data })
}