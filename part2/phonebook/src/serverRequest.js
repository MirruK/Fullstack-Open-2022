import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const serverUpdatePerson = (newPerson) => {
  return axios.put(`${baseUrl}/${newPerson.id}`, newPerson)
}

const serverDeletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const serverAddPerson = (newPerson) =>
  axios
    .post(baseUrl, newPerson)
    .then((val) =>
      console.log(`Added user successfully: ${val.status} ${val.statusText}`)
    )
    .catch((err) => console.log("Error adding user: ", err))

export default { serverUpdatePerson, serverDeletePerson, serverAddPerson }
