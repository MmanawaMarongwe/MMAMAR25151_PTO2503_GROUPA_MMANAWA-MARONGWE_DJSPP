import { useParams } from "react-router-dom";
import { fetchSinglePodcast } from "../api/fetchData";
import { fetchGenreTitles } from "../api/fetchGenres";
import { useState, useEffect } from "react";
import {ShowCover, ShowDetailHeader, ShowInfo, SeasonList, GenreTags} from "../components/index"
import "./showDetail.css";


const HIDE_GENRES = new Set(["all", "featured"]);
/**
 * ShowDetail Page
 *
 * Displays detailed information for a single podcast show.
 *
 * Responsibilities:
 * - Retrieves show ID from route parameters.
 * - Fetches show data from API.
 * - Resolves genre IDs into human-readable titles.
 * - Handles loading and error states.
 * - Renders show metadata, genre tags, and season list.
 *
 * @returns {JSX.Element}
 */
export default function ShowDetail() {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [genreTitles, setGenreTitles] = useState([]);


  /**
   * Fetches show details whenever the route ID changes.
   * Resets loading and error state before initiating API request.
   */
  useEffect(() => {
    setLoading(true);
    setError("");
    setShow(null);

    fetchSinglePodcast(id, setShow, setError, setLoading);
  }, [id]);

  /**
   * Resolves genre data for display.
   *
   * Logic:
   * - If genres are already strings, filters unwanted values.
   * - If genres are numeric IDs, fetches corresponding titles.
   * - Filters out labels defined in HIDE_GENRES.
   *
   * Runs whenever show.genres changes.
   */
  useEffect(() => {
    if (!show?.genres || show.genres.length === 0) {
      setGenreTitles([]);
      return;
    }

    const hide = (value) => HIDE_GENRES.has(String(value).trim().toLowerCase());

    // If genres are already strings (names), don't fetch, just filter and render if they are not all or featured
    if (typeof show.genres[0] === "string") {
      const cleaned = show.genres
        .map((g) => String(g).trim())
        .filter((g) => g && !hide(g));

      setGenreTitles(cleaned);
      return;
    }


    //  Only fetch if they are numeric IDs
    fetchGenreTitles(show.genres)
      .then(setGenreTitles)
      .catch((e) => {
        console.error("Failed to load genre titles:", e);
        setGenreTitles([]);
      });
  }, [show?.genres]);

  return (
    <main className="show-detail">
     
    {loading && <p className="text-muted">Loading show…</p>}
    {!loading && error && <p className="text-muted">{error}</p>}

    {!loading && !error && show && (
      <>
       <ShowDetailHeader/>
      <div className="show-detail-cover">
        <div className="podcast-info">
          <ShowCover image={show?.image} title={show?.title} />

          <div className="info-grid">
            <ShowInfo title={show?.title} 
            description={show?.description} 
            updated={show?.updated} 
            id={id} 
            loading={loading} 
            error={error}/>

            <h3>Genres</h3>
            <GenreTags tags={genreTitles} />
           


          </div>
        </div>

        <div>
            <SeasonList seasons={show?.seasons || []} showId={show.id}
                showTitle={show.title} />
          </div>
          </div>
          </> )}
    </main>
  );
}
