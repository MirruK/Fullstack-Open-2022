const CountryInfo = ({ info }) => {
  const displayLangs = () => {
    return Object.values(info.languages).map((elem) => <li>{elem}</li>)
  }
  return (
    <div>
      <h2>{info.name.common}</h2>
      {info.capital}
      <br />
      {info.area}
      <br />
      <h3>Languages:</h3>
      <ul>{displayLangs()}</ul>
      <img src={info.flags.svg} width={128} />
    </div>
  )
}

export default CountryInfo
