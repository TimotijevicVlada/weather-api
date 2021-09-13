import React, { useState } from "react";
import "./App.css";

function App() {
  const api = {
    base: "http://api.openweathermap.org/data/2.5/",
    key: "857c9713e8955051b03bba131a833160",
  };

  const [name, setName] = useState("");
  const [weather, setWeather] = useState([]);
  const [country, setCountry] = useState([]);
  const [temp, setTemp] = useState([]);
  const [tempMin, setTempMin] = useState([]);
  const [tempMax, setTempMax] = useState([]);
  const [sky, setSky] = useState([]);

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${name}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setCountry(result.sys.country);
          setTemp(result.main.temp);
          setTempMin(result.main.temp_min);
          setTempMax(result.main.temp_max);
          setSky(result.weather[0].description)
          setName("");
          console.log(result.weather[0].description);
        });
    }
  };

  const date = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className="App">
      <main className={(temp > 16) ? 'main' : 'main rain'}>
        <div className="input_container">
          <input
            type="text"
            placeholder="Search place"
            onChange={(e) => setName(e.target.value)}
            value={name}
            onKeyPress={search}
          />
        </div>

        <div className="info_wrapper">
          <div className="city">
            {weather.name}, {country}
          </div>
          <div className="date">{date(new Date())}</div>
          <div className="degree">{Math.round(temp)}°C</div>
          <div className="min_max"><span>{Math.round(tempMin)}°C</span> <span>{Math.round(tempMax)}°C</span></div>
          <div className="sky">{sky}</div>
        </div>
      </main>
    </div>
  );
}

export default App;
