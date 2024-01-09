import Entry from "./Entry"
import axios from "axios"
import requests from "./../serverRequest"
const UserList = ({ filterString, persons, setPersons }) => {
  const delPersonWrapper = (bId) => {
    return async () => {
      console.log("Called del method on button press")
      const boundId = bId
      const response = await requests.serverDeletePerson(boundId)
      if (response.status == 204 || response.status == 200) {
        console.log(
          `Successfully deleted person with id (${boundId}. Status code: ${response.status} ${response.statusText})`
        )
        setPersons(persons.filter((pson) => pson.id != boundId))
      } else
        console.log(
          `Error deleting person with id (${boundId}). Error: ${response.status} ${response.statusText}`
        )
    }
  }
  return (
    <div>
      {persons
        .filter((item) => {
          if (filterString == "") return persons
          else return item.name.includes(filterString)
        })
        .map((person) => {
          return (
            <>
              <Entry name={person.name} number={person.number} />
              <button onClick={delPersonWrapper(person.id)}>delete</button>
            </>
          )
        })}
    </div>
  )
}
export default UserList
