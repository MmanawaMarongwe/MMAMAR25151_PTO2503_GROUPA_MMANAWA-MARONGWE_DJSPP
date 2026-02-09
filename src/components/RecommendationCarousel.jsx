import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { genres } from "../data";
import PodcastCard from "./PodcastCard";

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
    </div>
  </section>
);
}