import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './NotificationCenter.css';

function NotificationCenter({ isOpen, onClose }) {
  const panelRef = useRef(null);
  const [quickNote, setQuickNote] = useState(() => {
    return localStorage.getItem('mac-quick-note') || '';
  });

  const [githubEvents, setGithubEvents] = useState([]);
  const [githubLoading, setGithubLoading] = useState(true);
  const [githubRefreshKey, setGithubRefreshKey] = useState(0);

  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(true);

  // Helper to format time ago
  const timeAgo = (dateString) => {
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m ago";
    return Math.floor(seconds) + "s ago";
  };

  // Fetch GitHub events
  useEffect(() => {
    const fetchGithub = async () => {
      setGithubLoading(true);
      try {
        const res = await fetch('https://api.github.com/users/sleepyUjjal/events/public');
        if (res.ok) {
          const data = await res.json();
          // Take first 3 events
          const events = await Promise.all(data.slice(0, 3).map(async ev => {
            const repoName = ev.repo.name.split('/')[1] || ev.repo.name;
            let message = ev.type.replace('Event', '');
            let url = `https://github.com/${ev.repo.name}`;

            if (ev.type === 'PushEvent') {
              if (ev.payload.commits && ev.payload.commits.length > 0) {
                message = ev.payload.commits[0].message;
                url = `https://github.com/${ev.repo.name}/commit/${ev.payload.commits[0].sha}`;
              } else if (ev.payload.head) {
                try {
                  const commitRes = await fetch(`https://api.github.com/repos/${ev.repo.name}/commits/${ev.payload.head}`);
                  if (commitRes.ok) {
                    const commitData = await commitRes.json();
                    message = commitData.commit.message;
                  } else {
                    message = `Pushed to ${ev.payload.ref?.split('/').pop() || 'branch'}`;
                  }
                  url = `https://github.com/${ev.repo.name}/commit/${ev.payload.head}`;
                } catch (e) {
                  message = `Pushed to ${ev.payload.ref?.split('/').pop() || 'branch'}`;
                  url = `https://github.com/${ev.repo.name}/commit/${ev.payload.head}`;
                }
              }
            } else if (ev.type === 'WatchEvent') {
              message = 'Starred the repository';
            } else if (ev.type === 'CreateEvent') {
              message = `Created ${ev.payload.ref_type || 'repository'}`;
            }

            return {
              id: ev.id,
              repo: repoName,
              time: timeAgo(ev.created_at),
              message: message.split('\n')[0], // first line only
              url
            };
          }));
          setGithubEvents(events);
        }
      } catch (e) {
        console.error("Failed to fetch github events", e);
      } finally {
        setGithubLoading(false);
      }
    };

    // Only fetch if panel is open and we haven't fetched yet (or user triggered refresh)
    if (isOpen && (githubEvents.length === 0 || githubRefreshKey > 0)) {
      fetchGithub();
    }
  }, [isOpen, githubRefreshKey]);

  // Helper to map Open-Meteo weather codes
  const getWeatherDetails = (code) => {
    if (code === 0) return { emoji: '☀️', desc: 'Clear sky' };
    if (code === 1) return { emoji: '🌤️', desc: 'Mainly clear' };
    if (code === 2) return { emoji: '⛅', desc: 'Partly cloudy' };
    if (code === 3) return { emoji: '☁️', desc: 'Overcast' };
    if (code >= 45 && code <= 48) return { emoji: '🌫️', desc: 'Fog' };
    if (code >= 51 && code <= 57) return { emoji: '🌧️', desc: 'Drizzle' };
    if (code >= 61 && code <= 67) return { emoji: '🌧️', desc: 'Rain' };
    if (code >= 71 && code <= 77) return { emoji: '❄️', desc: 'Snow' };
    if (code >= 80 && code <= 82) return { emoji: '🌧️', desc: 'Rain showers' };
    if (code >= 85 && code <= 86) return { emoji: '❄️', desc: 'Snow showers' };
    if (code >= 95) return { emoji: '⛈️', desc: 'Thunderstorm' };
    return { emoji: '🌡️', desc: 'Unknown' };
  };

  // Fetch Weather
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // 1. Get user location (IP based) - using ipinfo for better Indian routing accuracy
        const geoRes = await fetch('https://ipinfo.io/json');
        let lat = 30.7265, lon = 76.6085, city = 'Chandigarh'; // Defaults
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.loc) {
            const [l1, l2] = geoData.loc.split(',');
            lat = parseFloat(l1) || lat;
            lon = parseFloat(l2) || lon;
            city = geoData.city || city;
          }
        }

        // 2. Fetch weather from Open-Meteo
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        if (weatherRes.ok) {
          const weatherData = await weatherRes.json();
          const details = getWeatherDetails(weatherData.current_weather.weathercode);
          setWeather({
            temp: Math.round(weatherData.current_weather.temperature),
            emoji: details.emoji,
            desc: details.desc,
            city
          });
        }
      } catch (e) {
        console.error("Failed to fetch weather", e);
      } finally {
        setWeatherLoading(false);
      }
    };

    if (isOpen && !weather) {
      fetchWeather();
    }
  }, [isOpen, weather]);

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Don't close if clicking the menu bar time (which toggles it)
      if (e.target.closest('.menu-bar__time')) return;

      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, onClose]);

  // Save quick note to localStorage
  useEffect(() => {
    localStorage.setItem('mac-quick-note', quickNote);
  }, [quickNote]);

  // Formatted current date for the widget
  const now = new Date();
  const dayName = now.toLocaleDateString('en-US', { weekday: 'long' });
  const dateString = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={panelRef}
          className="notification-center"
          initial={{ x: '100%', opacity: 0.5 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0.5 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Date Widget */}
          <div className="nc-widget nc-widget--date">
            <div className="nc-widget__day">{dayName}</div>
            <div className="nc-widget__date">{dateString}</div>
          </div>

          {/* Quick Note Widget */}
          <div className="nc-widget nc-widget--note">
            <div className="nc-widget__header">Quick Note</div>
            <textarea
              className="nc-widget__textarea"
              placeholder="Type a note here..."
              value={quickNote}
              onChange={(e) => setQuickNote(e.target.value)}
              spellCheck="false"
            />
          </div>

          {/* Weather Widget */}
          <div className="nc-widget nc-widget--weather">
            <div className="nc-widget__header">Weather</div>
            <div className="nc-weather-content">
              {weatherLoading ? (
                <div style={{ opacity: 0.6, fontSize: '12px' }}>Detecting location & weather...</div>
              ) : weather ? (
                <>
                  <div className="nc-weather-icon">{weather.emoji}</div>
                  <div className="nc-weather-info">
                    <div className="nc-weather-temp">{weather.temp}°</div>
                    <div className="nc-weather-desc">{weather.desc}</div>
                    <div className="nc-weather-loc">{weather.city}</div>
                  </div>
                </>
              ) : (
                <div style={{ opacity: 0.6, fontSize: '12px' }}>Weather unavailable</div>
              )}
            </div>
          </div>

          {/* Github Stats */}
          <div className="nc-widget nc-widget--github">
            <div className="nc-widget__header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              GitHub Activity
              <button 
                className="nc-github-refresh" 
                onClick={() => setGithubRefreshKey(k => k + 1)}
                disabled={githubLoading}
                title="Refresh Activity"
              >
                <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ animation: githubLoading ? 'spin 1s linear infinite' : 'none' }}>
                  <polyline points="23 4 23 10 17 10"></polyline>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                </svg>
              </button>
            </div>
            <div className="nc-github-content">
              {githubLoading ? (
                <div style={{ opacity: 0.6, fontSize: '12px' }}>Loading activity...</div>
              ) : githubEvents.length > 0 ? (
                githubEvents.map(ev => (
                  <div
                    key={ev.id}
                    className="nc-github-item nc-github-item--clickable"
                    onClick={() => window.open(ev.url, '_blank')}
                    title="View on GitHub"
                  >
                    <span className="nc-github-repo">{ev.repo}</span>
                    <span className="nc-github-time">{ev.time}</span>
                    <div className="nc-github-commit">{ev.message}</div>
                  </div>
                ))
              ) : (
                <div style={{ opacity: 0.6, fontSize: '12px' }}>No recent activity.</div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default NotificationCenter;
