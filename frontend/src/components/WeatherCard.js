import React from 'react';
import './WeatherCard.css';

const CONDITION_COLORS = {
  Sunny: '#FFD700',
  Cloudy: '#A0A0B0',
  'Partly Cloudy': '#87CEEB',
  Rainy: '#4682B4',
  Clear: '#87CEEB',
  Thunderstorm: '#6A5ACD',
  Windy: '#98D8C8',
  Foggy: '#C0C0C0',
};

const CONDITION_ICONS = {
  Sunny: '☀️',
  Cloudy: '☁️',
  'Partly Cloudy': '⛅',
  Rainy: '🌧️',
  Clear: '🌤️',
  Thunderstorm: '⛈️',
  Windy: '💨',
  Foggy: '🌫️',
};

export default function WeatherCard({ city }) {
  const color = CONDITION_COLORS[city.condition] || '#87CEEB';
  const condIcon = CONDITION_ICONS[city.condition] || '🌡️';

  return (
    <div className="weather-card">
      <div className="card-flag">{city.flag}</div>
      <div className="card-city-name">{city.icon} {city.name}</div>
      <div className="card-country">{city.country}</div>
      <div className="card-temp" style={{ color }}>{city.temperature}°C</div>
      <div className="card-condition">{condIcon} {city.condition}</div>
      <div className="card-detail">
        <span>💧 Humidity</span>
        <span>{city.humidity}%</span>
      </div>
      <div className="card-detail">
        <span>💨 Wind</span>
        <span>{city.wind_speed} km/h</span>
      </div>
      <div className="card-detail">
        <span>🌡️ Feels like</span>
        <span>{city.feels_like}°C</span>
      </div>
      {city.uv_index !== undefined && (
        <div className="card-detail">
          <span>☀️ UV Index</span>
          <span>{city.uv_index}</span>
        </div>
      )}
    </div>
  );
}
