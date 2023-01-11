import "./App.css"
import UserList from "./components/UserList"
import FilterField from "./components/FilterField"
import PersonForm from "./components/PersonForm"
import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterString, setFilterString] = useState("")
  const [newName, setNewName] = useState("")
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const setPhoneNumberWrapper = (newnum) => setNewPhoneNumber(newnum)
  const setNameWrapper = (newname) => setNewName(newname) 
  const setPersonsWrapper = (newperson) => setPersons(newperson)
  const setFilterStringWrapper = (filterstr) => setFilterString(filterstr)
  const effect = () =>{
      console.log("Ran useEffect")
      axios
          .get('http://localhost:3001/persons')
          .then(response => {
              setPersons(response.data)
          })}
    useEffect(effect,[])
  return (
    <div>
      <h2>Phonebook</h2>

      <FilterField setFilterString={setFilterStringWrapper} />
      <br />
      <PersonForm
        state={{
          nameState: newName,
          setNameState: setNameWrapper,
          numberState: newPhoneNumber,
          setNumberState: setPhoneNumberWrapper,
          persons: persons,
          setPersons: setPersonsWrapper,
        }}
      />
      <h2>Numbers</h2>
      <UserList filterString={filterString} persons={persons} />
    </div>
  )
}

export default App
