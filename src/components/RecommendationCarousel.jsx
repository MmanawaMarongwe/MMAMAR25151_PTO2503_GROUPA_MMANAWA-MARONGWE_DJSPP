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
         {Array.from({ length: 6 }).map((_, i) => (
         <div key={i} className="carousel-item">
           <div className="carousel-dummy">Card {i + 1}</div>
         </div>
         ))}
      </div>
    </div>
  </section>
);
}