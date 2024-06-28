import { useState, useEffect } from 'react';
import axios from 'axios';

const ShowInfo = ({ country }) => {
  const keys = Object.keys(country.languages);
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {keys.map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
    </>
  );
};
const ShowList = ({ list, setCountryFilter }) => {
  if (list.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (list.length !== 1) {
    return (
      <div>
        {list.map((c) => (
          <Country key={c.name.common} country={c.name.common} c={c} setCountryFilter={setCountryFilter} />
        ))}
      </div>
    );
  }
  return (
    <>
      <ShowInfo country={list[0]} />
    </>
  );
};
const Country = ({ country, c, setCountryFilter }) => {
  const setCountry = () => setCountryFilter([c]);
  return (
    <div>
      {country} <button onClick={setCountry}>show</button>
    </div>
  );
};

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState([]);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setCountryFilter(countries.filter((c) => c.name.common.toLowerCase().startsWith(value.toLowerCase())));
  };
  return (
    <div>
      <div>
        find countries <input value={searchValue} onChange={handleChange} />
      </div>
      <div>
        <ShowList list={countryFilter} setCountryFilter={setCountryFilter} />
      </div>
    </div>
  );
};

export default App;
