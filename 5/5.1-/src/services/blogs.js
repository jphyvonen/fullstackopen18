import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null
const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}
const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async (newBlog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const res = await axios.post(baseUrl, newBlog, config)
  console.log(res.data)
  return res.data
}
const update = async (id, blog) => {
  const res = await axios.put(`${baseUrl}/${id}`, blog)
  return res.data
}
const remove = async (id, blog) => {
  const config = {
    headers:{'Authorization': token}
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}
export default { getAll, create, setToken, update, remove }