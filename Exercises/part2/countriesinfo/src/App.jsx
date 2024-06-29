import { useState, useEffect } from 'react';
import axios from 'axios';

const ShowWeather = ({ weather, callWeather }) => {
  if (callWeather) {
    return (
      <>
        <p>Temperature {Number((weather.main.temp - 273.15).toFixed(2))} Celcius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>Wind {weather.wind.speed} m/s</p>
      </>
    );
  }
  return null;
};
const ShowInfo = ({ country }) => {
  const keys = Object.keys(country.languages);
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h3>Languages</h3>
      <ul>
        {keys.map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      <h1>Weather in {country.capital[0]}</h1>
    </>
  );
};
const ShowList = ({ list, setCountryFilter, setCallCountry }) => {
  if (list.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (list.length !== 1) {
    return (
      <div>
        {list.map((c) => (
          <Country key={c.name.common} country={c.name.common} c={c} setCountryFilter={setCountryFilter} setCallCountry={setCallCountry} />
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
  const setCountry = () => {
    setCountryFilter([c]);
  };
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
  const [weatherCity, setWeatherCity] = useState([]);
  const [callWeather, setCallWeather] = useState(false);
  const api_key = import.meta.env.VITE_SOME_KEY;
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response) => {
      setCountries(response.data);
    });
  }, []);
  useEffect(() => {
    if (countryFilter.length === 1) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${countryFilter[0].capital[0]},${countryFilter[0].altSpellings[0]}&APPID=${api_key}`).then((response) => {
        setWeatherCity(response.data);
        setCallWeather(true);
      });
    }
  }, [countryFilter.length === 1]);
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    setCountryFilter(countries.filter((c) => c.name.common.toLowerCase().startsWith(value.toLowerCase())));
    setCallWeather(false);
  };
  return (
    <div>
      <div>
        find countries <input value={searchValue} onChange={handleChange} />
      </div>
      <div>
        <ShowList list={countryFilter} setCountryFilter={setCountryFilter} />
        <ShowWeather weather={weatherCity} callWeather={callWeather} />
      </div>
    </div>
  );
};

export default App;
