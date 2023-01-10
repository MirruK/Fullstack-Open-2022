const FilterField = ({ setFilterString }) => {
  return (
    <div>
      Filter users by:{" "}
      <input onChange={(event) => setFilterString(event.target.value)} />
    </div>
  )
}

export default FilterField
