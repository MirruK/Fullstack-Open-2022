import axios from "axios"

const baseUrl = process.env.REACT_APP_DEV_URL || "api/persons"

const serverUpdatePerson = (newPerson) => {
  return axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
}

const serverDeletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const serverAddPerson = (newPerson) =>{
  return axios.post(baseUrl, newPerson)
}
export default { serverUpdatePerson, serverDeletePerson, serverAddPerson }
