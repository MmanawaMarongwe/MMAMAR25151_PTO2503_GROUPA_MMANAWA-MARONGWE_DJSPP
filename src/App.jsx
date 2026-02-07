
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { fetchPodcasts } from "./api/fetchData";  
import { PodcastProvider } from "./context/PodcastContext";

import Home from "./pages/Home";
import ShowDetail from "./pages/ShowDetail";

import { ErrorBoundary, Header } from "./UI/index";
import "./App.css";

export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const THEME_KEY = "app-theme";

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === "light" || saved === "dark" ? saved : "dark"; 
});

  
 useEffect(() => {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("app-theme", theme);
}, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("app-theme", theme);
  }, [theme]);


  function toggleTheme() {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }

  useEffect(() => {
    async function loadPodcasts() {
      setLoading(true);
      setError(null);

      try {
        await fetchPodcasts(setPodcasts, setError, setLoading);
      } catch (err) {
        console.error(err);
        setError("Failed to load podcasts. Please try again later.");
        setLoading(false);
      }
    }

    loadPodcasts();
  }, []);

  return (
    <>
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <ErrorBoundary>
        {error && (
          <p className="error">Error occurred while fetching podcasts: {error}</p>
        )}

        {!error && loading && <p>Loading Podcasts</p>}

        {!error && !loading && (
          <PodcastProvider initialPodcasts={podcasts}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/show/:id" element={<ShowDetail />} />
            </Routes>
          </PodcastProvider>
        )}
      </ErrorBoundary>
    </>
  );
}