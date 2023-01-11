import Entry from "./Entry"

const UserList = ({ filterString, persons }) => {
  //console.log("Logging persons array from UserList",persons)
  return (
    <div>
      {persons
        .filter((item) => {
          if (filterString == "") return persons
          else return item.name.includes(filterString)
        })
        .map((person) => (
          <Entry name={person.name} number={person.number} />
        ))}
    </div>
  )
}
export default UserList
