import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { genres } from "../data";
import { useFavorites } from "../context/FavoritesContext";

import "swiper/css";
import "swiper/css/navigation";
import "./RecommendationCarousel.css"

export default function RecommendationCarousel({ shows = [], excludeIds = [], title = "Recommended for you" }) {
  const { favorites } = useFavorites();

  const genreMap = useMemo(() => {
    const map = new Map();
    for (const g of genres) map.set(String(g.id), g.title);
    return map;
  }, []);

  const favoriteShowIds = useMemo(() => {
    return new Set(Object.keys(favorites || {}).map(String));
  }, [favorites]);

   const excludeSet = useMemo(() => new Set(excludeIds.map(String)), [excludeIds]);

const items = useMemo(() => {
  const limit = 12;
  const pool = shows.filter((s) => !excludeSet.has(String(s.id)));
  return pool.slice(0, limit);
}, [shows, excludeSet]);

  return (
    <section className="carousel-section">
      <div className="carousel-header">
        <h2 className="carousel-title">{title}</h2>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        loop
        spaceBetween={4}
        slidesPerView={1.2}
        breakpoints={{
          480: { slidesPerView: 1.6 },
          768: { slidesPerView: 2.4 },
          1024: { slidesPerView: 3.2 },
        }}
      >
        {items.map((show) => {
          const genreIds = (show.genres || show.genreIds || []).map(String);
          const tagTitles = genreIds
            .map((id) => genreMap.get(id))
            .filter(Boolean)
            .slice(0, 3);

          return (
            <SwiperSlide key={show.id}>
              <Link to={`/show/${show.id}`} className="carousel-link">
                <div className="carousel-image-wrap">
                  <img className="carousel-image" src={show.image} alt={show.title} loading="lazy" />
                </div>

                <div className="carousel-meta">
                  <h3 className="carousel-show-title">{show.title}</h3>

                  <div className="carousel-tags">
                    {tagTitles.length ? (
                      tagTitles.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))
                    ) : (
                      <span className="text-muted">No genres</span>
                    )}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}