import Axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/persons'
// const baseUrl = 'https://31--rohxhlprjz.now.sh/api/persons'
const baseUrl = '/api/persons'

const getAll = () =>{
    return Axios.get(baseUrl)
}
const create = (entryObject) => {
    return Axios.post(baseUrl, entryObject)
}
const update = (id, entryObject) => {
    console.log("Axios", entryObject.number)
   return Axios.put(`${baseUrl}/${id}`, entryObject) 
}
const remove = (id) => {
    return Axios.delete(`${baseUrl}/${id}`)
}
export default {getAll, create, update, remove}