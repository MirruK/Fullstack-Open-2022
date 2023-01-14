import "./App.css"
import UserList from "./components/UserList"
import FilterField from "./components/FilterField"
import PersonForm from "./components/PersonForm"
import Message from "./components/Message"
import { useState, useEffect } from "react"
import axios from "axios"

const App = () => {
  const [persons, setPersons] = useState([])
  const [filterString, setFilterString] = useState("")
  const [newName, setNewName] = useState("")
  const [newPhoneNumber, setNewPhoneNumber] = useState("")
  const [messageInfo, setMessageInfo] = useState({ message: "", show: false })
  const showMessage = async (m, timespan, color) => {
    console.log("Showing Message: ", m)
    setMessageInfo({ message: m, show: true, msgColor: color })
    setTimeout(() => {
      console.log("Message cleared")
      setMessageInfo({ ...messageInfo, show: false })
    }, timespan)
  }
  const effect = () => {
    console.log("Ran useEffect")
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data)
    })
  }
  useEffect(effect, [])
  return (
    <div>
      <h1 className="main-header">Phonebook</h1>
      <Message info={messageInfo} />
      <FilterField setFilterString={(val) => setFilterString(val)} />
      <br />
      <PersonForm
        state={{
          nameState: newName,
          setNameState: (val) => setNewName(val),
          numberState: newPhoneNumber,
          setNumberState: (val) => setNewPhoneNumber(val),
          persons: persons,
          setPersons: (val) => setPersons(val),
          showMessage: showMessage,
        }}
      />
      <h2 className="section-header">Numbers</h2>
      <UserList
        filterString={filterString}
        persons={persons}
        setPersons={(val) => {
          setPersons(val)
        }}
      />
    </div>
  )
}

export default App
