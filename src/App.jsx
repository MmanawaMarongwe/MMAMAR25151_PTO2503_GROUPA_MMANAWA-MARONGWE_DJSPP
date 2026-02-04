import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { fetchPodcasts } from "./api/fetchData";
import { PodcastGrid, Filters } from "./components/index";
import { PodcastProvider } from "./context/PodcastContext";
import ShowDetail from "./pages/ShowDetail";
import { ErrorBoundary, Header, Pagination } from "./UI/index";
import "./App.css";

export default function App() {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPodcasts() {
      try {
        setLoading(true);
        setError(null);

        const podcastsArray = await fetchPodcasts(
          setPodcasts,
          setError,
          setLoading,
        );
        if (Array.isArray(podcastsArray)) setPodcasts(podcastsArray);
      } catch (err) {
        console.error(err);
        setError("Failed to load podcasts. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadPodcasts();
  }, []);

  return (
    <>
      <Header />

      <ErrorBoundary>
        {error && (
          <p className="error">Error occurred while fetching podcasts: {error}</p>
        )}

        {!error && loading && <p>Loading Podcasts</p>}

        {!error && !loading && (
          <PodcastProvider initialPodcasts={podcasts}>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Filters />
                    <main>
                      <PodcastGrid />
                      <Pagination />
                    </main>
                  </>
                }
              />

              <Route path="/show/:id" element={<ShowDetail />} />
            </Routes>
          </PodcastProvider>
        )}
      </ErrorBoundary>
    </>
  );
}
