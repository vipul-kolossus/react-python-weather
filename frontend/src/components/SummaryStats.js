import React from 'react';
import './SummaryStats.css';

export default function SummaryStats({ weather }) {
  const hottest = weather.reduce((a, b) => (a.temperature > b.temperature ? a : b));
  const coldest = weather.reduce((a, b) => (a.temperature < b.temperature ? a : b));
  const avgTemp = (weather.reduce((s, c) => s + c.temperature, 0) / weather.length).toFixed(1);
  const avgHumidity = Math.round(weather.reduce((s, c) => s + c.humidity, 0) / weather.length);
  const maxWind = Math.max(...weather.map((c) => c.wind_speed));

  const stats = [
    { icon: '🔥', label: 'Hottest', value: hottest.name, sub: `${hottest.temperature}°C` },
    { icon: '❄️', label: 'Coldest', value: coldest.name, sub: `${coldest.temperature}°C` },
    { icon: '📊', label: 'Avg Temp', value: `${avgTemp}°C`, sub: 'across all cities' },
    { icon: '💧', label: 'Avg Humidity', value: `${avgHumidity}%`, sub: 'across all cities' },
    { icon: '💨', label: 'Max Wind', value: `${maxWind} km/h`, sub: 'highest recorded' },
  ];

  return (
    <div className="stats-grid">
      {stats.map((s) => (
        <div className="stat-card" key={s.label}>
          <div className="stat-icon">{s.icon}</div>
          <div className="stat-label">{s.label}</div>
          <div className="stat-value">{s.value}</div>
          <div className="stat-sub">{s.sub}</div>
        </div>
      ))}
    </div>
  );
}
