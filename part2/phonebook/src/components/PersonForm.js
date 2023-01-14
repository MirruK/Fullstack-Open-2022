import axios from "axios"
import requests from "./../serverRequest"

const PersonForm = ({ state }) => {
  //Make this more concise
  const newName = state.nameState
  const setNewName = state.setNameState
  const newPhoneNumber = state.numberState
  const setNewPhoneNumber = state.setNumberState
  const persons = state.persons
  const setPersons = state.setPersons
  const showMessage = state.showMessage

  const personNotCreated = () => {
    //TODO: Refactor this crap and the handlePersonCreation crap
    if (persons.find((person) => person.name == newName) === undefined) {
      return 1
    } else if (
      persons.find((person) => person.phoneNumber == newPhoneNumber) ===
      undefined
    ) {
      return 0
    } else return 2
  }
  const handlePersonCreation = () => {
    const createdStatus = personNotCreated()
    if (createdStatus !== 0) {
      if (newName == "") {
        alert("Please supply a name")
        return
      }
      if (newPhoneNumber == "") {
        alert("Please supply a phone number")
        return
      }
      if (createdStatus === 2) {
        alert(`${newPhoneNumber} already exists in Address book`)
        return
      }
      const newPerson = {
        name: newName,
        number: newPhoneNumber,
        id: Math.max(...persons.map((person) => person.id)) + 1,
      }
      requests.serverAddPerson(newPerson)
      setPersons(persons.concat(newPerson))
      showMessage(`Successfully added person ${newPerson.name}`, 3000, "green")
      setNewPhoneNumber("")
      setNewName("")
    } else if (createdStatus === 1) {
      alert("Please supply a phone number to update your current one")
      return
    } else {
      const newPerson = {
        name: newName,
        number: newPhoneNumber,
        id: persons.find((pson) => pson.name === newName).id,
      }
      requests
        .serverUpdatePerson(newPerson)
        .then((val) => {
          const upd_obj = persons.map((obj) => {
            if (obj.id === newPerson.id) {
              return newPerson
            }
            return obj
          })
          setPersons(upd_obj)
          showMessage(
            `Successfully updated phone number to: ${newPhoneNumber}`,
            3000,
            "green"
          )
        })
        .catch((err) =>
          showMessage(
            `Number update failed: Person already deleted. Msg. ${err}`,
            3000,
            "red"
          )
        )
    }
  }

  return (
    <div>
      <h2 className="section-header">Add a new person</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          handlePersonCreation()
          event.target.reset()
        }}
      >
        <div>
          name:{" "}
          <input
            onChange={(event) => {
              setNewName(event.target.value)
            }}
          />
          <br />
          phone number:{" "}
          <input onChange={(event) => setNewPhoneNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm
