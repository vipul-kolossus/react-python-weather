import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import WeatherCard from './components/WeatherCard';
import WeatherCharts from './components/WeatherCharts';
import SummaryStats from './components/SummaryStats';

const API_BASE = process.env.REACT_APP_API_URL ?? '';

function App() {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const [error, setError] = useState(null);

  const fetchWeather = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    else setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/weather`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setWeather(data.cities);
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString());
    } catch (err) {
      setError('Could not connect to backend. Make sure Flask/FastAPI is running on port 8000.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="main-title">🌍 Global Weather Dashboard</h1>
        <p className="subtitle">
          Live temperature tracker for 6 major cities &nbsp;|&nbsp;
          {lastUpdated ? ` Updated: ${lastUpdated}` : ' Loading...'}
        </p>
        <button
          className={`refresh-btn ${refreshing ? 'spinning' : ''}`}
          onClick={() => fetchWeather(true)}
          disabled={refreshing || loading}
        >
          ↻ {refreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </header>

      {error && (
        <div className="error-banner">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="loader" />
          <p>Fetching weather data...</p>
        </div>
      ) : (
        <>
          <section className="section">
            <h2 className="section-title">Current Conditions</h2>
            <div className="cards-grid">
              {weather.map((city) => (
                <WeatherCard key={city.name} city={city} />
              ))}
            </div>
          </section>

          {weather.length > 0 && (
            <>
              <section className="section">
                <h2 className="section-title">Temperature Comparison</h2>
                <WeatherCharts weather={weather} />
              </section>

              <section className="section">
                <h2 className="section-title">Summary Statistics</h2>
                <SummaryStats weather={weather} />
              </section>
            </>
          )}

          <footer className="footer">
            Data is randomly generated for demonstration purposes • Last refreshed at {lastUpdated}
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
