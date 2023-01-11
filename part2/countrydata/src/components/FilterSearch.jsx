const FilterSearch = ({ searchFilter, setSearchFilter }) => {
  return (
    <div>
      <input onChange={(event) => setSearchFilter(event.target.value)} />
    </div>
  )
}

export default FilterSearch
