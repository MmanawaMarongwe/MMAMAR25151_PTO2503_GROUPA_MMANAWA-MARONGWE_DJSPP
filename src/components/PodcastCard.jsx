import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

/**
 * Simple presentational card for a single podcast.
 *
 * @param {Object} props
 * @param {string} props.title - Podcast title.
 * @param {string} props.image - Cover image URL.
 * @param {number} props.seasons - Number of seasons.
 * @param {string[]} [props.genres] - Genre names to display as pills.
 * @param {string} props.updated - Last updated label (e.g. "2 days ago").
 * @returns {JSX.Element} Podcast card UI.
 */

export default function PodcastCard({
  id,
  title,
  image,
  seasons,
  genres = [],
  updated,
}) {
  const { hasFavoritesForShow } = useFavorites();
    const isFavorited = hasFavoritesForShow(String(id));

  return (
    <Link to={`/show/${id}`} className="card">
      <img src={image} className="pod-cover" alt="" />
      <div>
        <h4 id="title">{title}</h4>
        <p id="seasons" className="seasons-text">
          ♡ {seasons} Seasons
        </p>
        <div id="genres" className="genre-tags">
          {genres.map((genre) => (
            <span key={genre} className="genre-pill">
              {genre}
            </span>
          ))}
        </div>
        <div className="date-favicon-wrapper">
          <p id="updated" className="text-muted">
            Updated {updated}
          </p>
          <span
            className= { `show-heart ${isFavorited ? "active" : ""}`}
            aria-label= { isFavorited ? "This show has favorited episodes" : "No favorited episodes"}
              title= { isFavorited ? "Has favorited episodes" : "No favorited episodes" } >
                {isFavorited ? "❤️" : "🤍"}
          </span>
        </div>
      </div>
    </Link>
  );
}
