/* WeatherIcon.js
 * Renders weather icon button to display weather data
*/

import React from 'react';
// import getWeather from '../../api/weather';
import api from '../api/posts';
import axios from 'axios';


function WeatherIcon() {

    const getWeatherReport = async () => {
        const API_URL = 'http://api.openweathermap.org/data/2.5/weather';
        const API_KEY = '8d306f4359a995eeee32b2583f7ec5d2';
        const API_LAT = 30.625857233021996;
        const API_LON = -96.33859892069388;
        try {
            // const weather = await api.get('/weather')
            var request_data
            const weather = axios.get(`${API_URL}?lat=${API_LAT}&lon=${API_LON}&APPID=${API_KEY}`, request_data, {
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': 'Bearer ' + API_KEY
            },
            })
            .then((response) => {
            console.log('response', response.data)
            })
            .catch((error) => {
            alert('error', error.response)
            })
            console.log(weather);
        } catch (error) {
            console.log("failed to get weather report");
            console.error(error);
        }

    }

    var [weatherOpen, setWeatherOpen] = React.useState(false);
    const weatherReport = getWeatherReport();
    const toggleWeatherOpen = () => {
        setWeatherOpen(!weatherOpen);
        console.log("open weather menu");
    }

    var icon_num = '10d';

    return (
        <Dropdown 
            open={weatherOpen}
            trigger={
                <img className='buttonStyle' onClick={toggleWeatherOpen} src={`https://openweathermap.org/img/wn/${icon_num}@2x.png`} alt='weather_icon' />
            }
            menu={[
                <div className='buttonStyle'>Temperature: {weatherReport.data}ºF</div>,
                <div>more weather info here</div>
            ]}
        />
    );
}

const Dropdown = ({open, trigger, menu}) => {
    return (
        <div className="weather-icon" >
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