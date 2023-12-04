/* WeatherIcon.js
 * Renders weather icon button to display weather data
*/

import React, { useState } from 'react';
import axios from 'axios';


function WeatherIcon() {

    const getWeatherReport = () => {
        const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
        const API_KEY = '8d306f4359a995eeee32b2583f7ec5d2';
        const API_LAT = 30.625857233021996;
        const API_LON = -96.33859892069388;

        // const weather = await api.get('/weather')
        var request_data
        axios.get(`${API_URL}?lat=${API_LAT}&lon=${API_LON}&APPID=${API_KEY}&units=imperial`, request_data, {
        headers: {
            'Content-Type': 'application/json'
            // 'Authorization': 'Bearer ' + API_KEY
        },
        })
        .then((response) => {
            const icon = response.data.weather[0].icon;
            if (icon === "01d") {
                set_w_icon ("02d");
            } else if (icon === "01n") {
                set_w_icon ("02n"); 
            } else {
                set_w_icon(icon);
            }
            set_w_cond(response.data.weather[0].description)
            set_w_temp(Math.round(response.data.main.temp))
            set_w_humid(response.data.main.humidity)
            set_w_wind(Math.round(response.data.wind.speed))
        })
        .catch((error) => {
            alert(error)
        })
    }

    var [weatherOpen, setWeatherOpen] = React.useState(false);

    const [w_icon, set_w_icon] = useState("02d");
    const [w_cond, set_w_cond] = useState(null);
    const [w_temp, set_w_temp] = useState(null);
    const [w_humid, set_w_humid] = useState(null);
    const [w_wind, set_w_wind] = useState(null);
    getWeatherReport();

    const toggleWeatherOpen = () => {
        setWeatherOpen(!weatherOpen);
    if (weatherOpen) getWeatherReport();
    }

    // var icon_num = '10d';

    return (
        <Dropdown 
            open={weatherOpen}
            trigger={
                <img className="weather-icon" onClick={toggleWeatherOpen} src={`https://openweathermap.org/img/wn/${w_icon}@2x.png`} alt='weather_icon' />
            }
            menu={[
                <h2>College Station, TX</h2>,
                <p>Conditions: {w_cond}</p>,
                <p>Temperature: {w_temp}ºF</p>,
                <p>Humidity: {w_humid}%</p>,
                <p>Wind Speed: {w_wind} mph</p>,
                // <p>Source: openweathermap.org</p>
            ]}
        />
    );
}

const Dropdown = ({open, trigger, menu}) => {
    return (
        <div className="weather" >
            {trigger}
            {open ? 
            <ul className="weather-menu">
                {menu.map((menuItem, index) => (
                    <li key={index} className="menu-item">{menuItem}</li>
                ))}
            </ul>
            : null}
        </div>
    )
}

export default WeatherIcon;