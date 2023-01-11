import "./App.css"
import { useEffect, useState } from "react"
import axios from "axios"
import CountryInfo from "./components/CountryInfo"
import FilterSearch from "./components/FilterSearch"


const App = () => {
  const [countries, setCountries] = useState([])
  const [searchFilter, setSearchFilter] = useState("")
  const [edgeCase, setEdgeCase] = useState(undefined)
  const effect = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data))
  }
  useEffect(effect, [])
  const filterFunc = (country) => {
    return country.name.common.includes(searchFilter)
  }
  const bindCountry = (countryName) => {
    return () => {
      const boundCountryName = countryName
      const elem = displayCountries()
      if (elem.length > 1) {
        console.log("Found edge case: ", elem)
        const searchCountry = countries.find(
          (elem) => elem.name.common === boundCountryName
        )
        setEdgeCase(searchCountry)
        displayCountries(edgeCase)
      } else setEdgeCase(undefined)
    }
  }
  const displayCountries = (specific = undefined) => {
    if (specific != undefined) return <CountryInfo info={specific} />
    if (searchFilter == "") {
      return <p>No search term specified</p>
    }
    const filtered = countries.filter(filterFunc)
    if (filtered.length > 10) {
      return <p>Please specify your search further</p>
    } else if (filtered.length == 1) {
      return <CountryInfo info={filtered[0]} />
    }
    return filtered.map((country) => {
      return (
        <div>
          {country.name.common}
          <button onClick={bindCountry(country.name.common)}>show</button>
        </div>
      )
    })
  }

  return (
    <div>
      <h1>Country Lister</h1>
      <FilterSearch
        searchFilter={searchFilter}
        setSearchFilter={(inp) => {
          setEdgeCase(undefined)
          setSearchFilter(inp)
        }}
      />
      {displayCountries(edgeCase)}
    </div>
  )
}

export default App
