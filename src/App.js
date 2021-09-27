import React, { useState } from "react";
import moment from "moment";
import "./App.css";

function App() {
  const api = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: "857c9713e8955051b03bba131a833160",
  };

  const [name, setName] = useState("");
  const [weather, setWeather] = useState([]);
  const [country, setCountry] = useState([]);
  const [temp, setTemp] = useState([]);
  const [tempMin, setTempMin] = useState([]);
  const [tempMax, setTempMax] = useState([]);
  const [sky, setSky] = useState([]);
  const [humidity, setHumidity] = useState([]);
  const [pressure, setPressure] = useState([]);
  const [visibility, setVisibility] = useState([]);
  const [wind, setWind] = useState([]);
  const [sunrise, setSunrise] = useState([]);
  const [sunset, setSunset] = useState([]);

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
          setSky(result.weather[0].description);
          setHumidity(result.main.humidity);
          setPressure(result.main.pressure);
          setVisibility(result.visibility);
          setWind(result.wind.speed);
          setSunrise(result.sys.sunrise);
          setSunset(result.sys.sunset);
          console.log(result.sys.sunset)
          console.log(result)
          setName("");
        });
    }
  };

  const date = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };


  return (
    <div className="App">
      <main className={temp > 16 ? "main" : "main rain"}>
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
          <div className="min_max">
            <span>{Math.round(tempMin)}°C</span>{" "}
            <span>{Math.round(tempMax)}°C</span>
          </div>
          <div className="sky">{sky}</div>
          <div className="lower_info">
            <div>
              Humidity: <span>{humidity}</span>%
            </div>
            <div>
              Pressure: <span>{pressure}</span>mb
            </div>
            <div>
              Visibility: <span>{visibility}</span>m
            </div>
            <div>
              Wind speed: <span>{wind}</span>m/s
            </div>
            <div>
              <div>
                Sunrise: <span>{moment(sunrise * 1000).format('HH:mm a')}</span> 
              </div>
              <div>
                Sunset: <span>{moment(sunset * 1000).format('HH:mm a')}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
