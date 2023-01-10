const PersonForm = ({ state }) => {
  const newName = state.nameState
  const setNewName = state.setNameState
  const newPhoneNumber = state.numberState
  const setNewPhoneNumber = state.setNumberState
  const persons = state.persons
  const setPersons = state.setPersons
  const personNotCreated = () => {
    if (persons.find((person) => person.name == newName) !== undefined) {
      alert(`${newName} already exists in Address book`)
      return false
    } else if (
      persons.find((person) => person.phoneNumber == newPhoneNumber) !==
      undefined
    ) {
      alert(`${newPhoneNumber} already exists in Address book`)
      return false
    } else return true
  }
  const handlePersonCreation = () => {
    //console.log("PersonCreation Called")
    if (personNotCreated()) {
      if (newName == "") {
        alert("Please supply a name")
        return
      }
      if (newPhoneNumber == "") {
        alert("Please supply a phone number")
        return
      }
      setPersons(persons.concat({ name: newName, phoneNumber: newPhoneNumber }))
      setNewPhoneNumber("")
      setNewName("")
    }
  }

  return (
    <div>
      <h2>Add a new person</h2>
      <form
        onSubmit={(event) => {
          //console.log("Form submitted in PersonForm")
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
