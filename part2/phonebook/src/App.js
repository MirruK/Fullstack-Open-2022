import "./App.css"
import UserList from "./components/UserList"
import FilterField from "./components/FilterField"
import PersonForm from "./components/PersonForm"
import Message from "./components/Message"
import { useState, useEffect } from "react"
import axios from "axios"

const URL = process.env.REACT_APP_DEV_URL || "api/persons"

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

  useEffect(()=>{
  const effect = async() => {
    console.log("Ran useEffect")
    const personsresponse = await axios.get(URL)
      console.log("Response,", personsresponse)
      if(personsresponse.status === 200){
        setPersons(personsresponse.data)
          return
      }else{
          console.log("Error getting persons. Code: ", personsresponse.status)
        setPersons([])
      }
  }
      effect()
  }, [])
  return (
    <div>
      <h1 className="main-header">Phonebook</h1>
      <Message info={messageInfo} />
      <FilterField setFilterString={(val) => setFilterString(val)} />
      <br />
      <PersonForm 
      newName={newName} 
      setNewName={setNewName} 
      newPhoneNumber={newPhoneNumber}
      setNewPhoneNumber={setNewPhoneNumber}
      persons={persons}
      setPersons={setPersons}
      showMessage={showMessage}
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
