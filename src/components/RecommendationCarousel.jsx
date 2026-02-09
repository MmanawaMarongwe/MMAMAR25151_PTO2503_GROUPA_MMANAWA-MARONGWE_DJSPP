import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { genres } from "../data";
import PodcastCard from "./PodcastCard";
import "./RecommendationCarousel.css"

export default function RecommendationCarousel({
  shows = [],
  title = "Recommended for you",
}) {
    const scrollerRef = useRef(null);

    const genreMap = useMemo(() => {
    const map = new Map();
    for (const g of genres) map.set(String(g.id), g.title);
    return map;
}, []);
        const items = useMemo(() => shows.slice(0, 12), [shows]);
        return (
  <section className="carousel-section">
    <div className="carousel-header">
      <h2 className="carousel-title">{title}</h2>

      <div className="carousel-controls">
        <button type="button" className="carousel-btn" aria-label="Previous">
          ←
        </button>
        <button type="button" className="carousel-btn" aria-label="Next">
          →
        </button>
      </div>
       <div className="carousel-track" ref={scrollerRef}>
         {items.map((show) => {
  const showId = String(show.id);

  const genreIds = (show.genres || show.genreIds || []).map(String);
  const genreNames = genreIds
    .map((id) => genreMap.get(id))
    .filter(Boolean)
    .slice(0, 3);

  const seasonsCount =
    typeof show.seasons === "number"
      ? show.seasons
      : Array.isArray(show.seasons)
      ? show.seasons.length
      : show.seasonCount ?? 0;

  return (
    <div key={showId} className="carousel-item">
      <Link to={`/show/${showId}`} className="carousel-link">
        <PodcastCard
          title={show.title}
          image={show.image}
          seasons={seasonsCount}
          genres={genreNames}
          updated={show.updated ?? ""}
        />
      </Link>
    </div>
  );
})}
      </div>
    </div>
  </section>
);
}