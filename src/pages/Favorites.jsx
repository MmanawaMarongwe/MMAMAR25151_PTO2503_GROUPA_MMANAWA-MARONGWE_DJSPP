import { useMemo, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import "./Favorites.css";

function formatAddedAt(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function sortEpisodes(episodes, sortBy) {
  const list = [...episodes];

  switch (sortBy) {
    case "TITLE_AZ":
      return list.sort((a, b) =>
        (a.episodeTitle || "").localeCompare(b.episodeTitle || "")
      );
    case "TITLE_ZA":
      return list.sort((a, b) =>
        (b.episodeTitle || "").localeCompare(a.episodeTitle || "")
      );
    case "ADDED_NEWEST":
      return list.sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    case "ADDED_OLDEST":
      return list.sort((a, b) => new Date(a.addedAt) - new Date(b.addedAt));
    default:
      return list;
  }
}

export default function Favorites() {
  const { favorites, toggleFavorite } = useFavorites();
  const [sortBy, setSortBy] = useState("ADDED_NEWEST");

  const showGroups = useMemo(() => {
    const groups = Object.values(favorites || {})
      .map((g) => ({
        ...g,
        episodes: sortEpisodes(g.episodes || [], sortBy),
      }))
      .sort((a, b) => (a.showTitle || "").localeCompare(b.showTitle || ""));
    return groups;
  }, [favorites, sortBy]);

  if (!showGroups.length) {
    return (
      <section className="favorites-page">
        <h2 className="favorites-title">Favorites</h2>
        <p className="text-muted favorites-empty">
          You don't have any favorite episodes yet.
        </p>
      </section>
    );
  }

  return (
    <section className="favorites-page">
      <div className="favorites-header">
        <h2 className="favorites-title">Favorites</h2>

        <div className="favorites-sort">
          <label className="text-muted" htmlFor="favorites-sort">
            Sort:
          </label>
          <select
            id="favorites-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="ADDED_NEWEST">Date added (newest)</option>
            <option value="ADDED_OLDEST">Date added (oldest)</option>
            <option value="TITLE_AZ">Title (A–Z)</option>
            <option value="TITLE_ZA">Title (Z–A)</option>
          </select>
        </div>
      </div>

      <div className="favorites-groups">
        {showGroups.map((group) => (
          <div key={group.showId} className="card favorites-group">
            <h3 className="favorites-show-title">{group.showTitle}</h3>

            <div className="favorites-episodes">
              {group.episodes.map((ep) => (
                <div key={ep.episodeId} className="season-row favorites-episode">
                  <div className="favorites-episode-meta">
                    <strong className="season-title">
                      S{ep.seasonNumber} · E{ep.episodeNumber} —{" "}
                      {ep.episodeTitle}
                    </strong>

                    <span className="text-muted">
                      Added: {formatAddedAt(ep.addedAt)}
                    </span>
                  </div>

                  <button
                    type="button"
                    className="fav-btn is-fav"
                    aria-label="Remove from favorites"
                    title="Remove"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite({
                        showId: group.showId,
                        showTitle: group.showTitle,
                        episodeId: ep.episodeId,
                        episodeTitle: ep.episodeTitle,
                        seasonNumber: ep.seasonNumber,
                        episodeNumber: ep.episodeNumber,
                      });
                    }}
                  >
                    ❤️
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}