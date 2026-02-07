import { useMemo, useState } from "react";
import { useFavorites } from "../context/FavoritesContext"; 

/**
 * SeasonList
 * Renders seasons as expandable rows. Each season can be expanded to reveal its episodes.
 *
 * Keeps existing class names so you can reuse CSS:
 * - season, season-row, season-title, episodes-count, text-muted
 *
 * @param {{ seasons?: any[] }} props
 * @returns {JSX.Element}
 */

export default function SeasonList({ seasons = [],showId, showTitle}) {
  const [openSeasonKey, setOpenSeasonKey] = useState(null);
  const { toggleFavorite, isEpisodeFavorited } = useFavorites();

   
  function toggleSeason(key) {
    setOpenSeasonKey((prev) => (prev === key ? null : key)); // ⭐
  }

  return (
    <>
      {seasons.map((season, i) => {
        const key = season?.id ?? i;
        const isOpen = openSeasonKey === key; // ⭐
        const seasonNum = i + 1;
        
        return (
          <div className="season" key={key}>
            <div
              className="season-row"
              role="button"
              tabIndex={0}
              onClick={() => toggleSeason(key)} // ⭐
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleSeason(key);
              }}
              style={{ cursor: "pointer" }}
            >
              <strong className="season-title">{season?.title || `Season ${seasonNum}`}</strong>
              <span className="text-muted episodes-count">
                {(season?.episodes?.length || 0)} episode{(season?.episodes?.length || 0) === 1 ? "" : "s"}
              </span>
            </div>

            {isOpen && (
              <div style={{ marginTop: "12px", marginLeft: "16px" }}>
                {(season?.episodes || []).map((ep, idx) => {
                  const epKey = ep?.id ?? `${key}-ep-${idx}`;
                  const epNumber = ep?.episode ?? idx + 1;
                  const epTitle = ep?.title || `Episode ${epNumber}`;
                  const epDescription = (ep?.description || "").trim();
                  const shortDesc =
                    epDescription.length > 140
                      ? `${epDescription.slice(0, 140)}…`
                      : epDescription;
                  const episodeId = ep?.id ?? epKey;
                const favorited = isEpisodeFavorited(episodeId);


                  return (
                    <div key={epKey} className="season">
                      <div className="season-row">
                        <div>
                          <strong className="season-title">#{epNumber} {epTitle}</strong>
                          {shortDesc && (
                            <p className="text-muted" style={{ marginTop: "6px" }}>
                              {shortDesc}
                            </p>
                          )}

                         

                          <button
                            type="button"
                            className={`fav-btn ${favorited ? "is-fav" : ""}`}
                            aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
                            title={favorited ? "Unfavorite" : "Favorite"}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite({
                              showId,
                              showTitle,
                              episodeId: ep.id,
                              episodeTitle: ep.title || `Episode ${ep.episode ?? idx + 1}`,
                              seasonNumber: seasonNum,
                              episodeNumber: ep.episode ?? idx + 1})}}>
                                {favorited ? "❤️" : "🤍"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}