import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LabelList,
} from 'recharts';
import './WeatherCharts.css';

const PALETTE = ['#FFD700', '#A0A0B0', '#87CEEB', '#4682B4', '#6A5ACD', '#98D8C8'];

const CustomTooltipTemp = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        <p style={{ color: '#a8edea' }}>{payload[0].value}°C</p>
      </div>
    );
  }
  return null;
};

const CustomTooltipHum = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        <p style={{ color: '#fed6e3' }}>Humidity: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

export default function WeatherCharts({ weather }) {
  const tempData = weather.map((c) => ({ name: c.name, temp: c.temperature }));
  const humData = weather.map((c) => ({ name: c.name, humidity: c.humidity }));

  return (
    <div className="charts-container">
      {/* Temperature bar chart */}
      <div className="chart-box">
        <h3 className="chart-label">Temperature (°C)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={tempData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" />
            <XAxis
              dataKey="name"
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(v) => `${v}°`}
              tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltipTemp />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
            <Bar dataKey="temp" radius={[6, 6, 0, 0]} maxBarSize={56}>
              {tempData.map((_, index) => (
                <Cell key={index} fill={PALETTE[index % PALETTE.length]} fillOpacity={0.85} />
              ))}
              <LabelList
                dataKey="temp"
                position="top"
                formatter={(v) => `${v}°C`}
                style={{ fill: 'rgba(255,255,255,0.8)', fontSize: 11 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Humidity horizontal bar chart */}
      <div className="chart-box">
        <h3 className="chart-label">Humidity (%)</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={humData}
            layout="vertical"
            margin={{ top: 10, right: 40, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.07)" horizontal={false} />
            <XAxis
              type="number"
              domain={[0, 110]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: 'rgba(255,255,255,0.45)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={80}
            />
            <Tooltip content={<CustomTooltipHum />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
            <Bar dataKey="humidity" radius={[0, 6, 6, 0]} maxBarSize={32}>
              {humData.map((_, index) => (
                <Cell
                  key={index}
                  fill={['rgba(168,237,234,0.75)', 'rgba(254,214,227,0.75)', 'rgba(135,206,235,0.75)',
                    'rgba(255,215,0,0.75)', 'rgba(152,216,200,0.75)', 'rgba(255,160,100,0.75)'][index % 6]}
                />
              ))}
              <LabelList
                dataKey="humidity"
                position="right"
                formatter={(v) => `${v}%`}
                style={{ fill: 'rgba(255,255,255,0.75)', fontSize: 11 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
