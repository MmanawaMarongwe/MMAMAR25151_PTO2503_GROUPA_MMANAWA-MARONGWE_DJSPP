import { useMemo, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";
import EpisodeRow from "../components/EpisodeRow";
import "./Favorites.css";




/**
 * sortEpisodes
 *
 * Sorts a list of episode objects based on selected criteria.
 * Supports alphabetical title sorting and chronological date sorting.
 *
 * A shallow copy is created before sorting to preserve immutability.
 *
 * @param {Array<Object>} episodes - Array of episode objects.
 * @param {string} sortBy - Sorting strategy identifier.
 * @returns {Array<Object>} Sorted episode array.
 */
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


/**
 * Favorites Page
 *
 * Displays favorited episodes grouped by show.
 *
 * Responsibilities:
 * - Retrieves favorites from global context.
 * - Applies selected sorting option.
 * - Groups episodes by show.
 * - Renders EpisodeRow components for each episode.
 *
 * Derived state (showGroups) is memoized to prevent unnecessary recalculations
 * when favorites or sorting criteria change.
 *
 * @returns {JSX.Element}
 */
export default function Favorites() {
  const { favorites } = useFavorites();
  const [sortBy, setSortBy] = useState("ADDED_NEWEST");



  /**
   * Derives grouped and sorted show data from favorites state.
   *
   * Steps:
   * 1. Converts favorites object into an array of show groups.
   * 2. Sorts episodes within each group using selected strategy.
   * 3. Sorts show groups alphabetically by show title.
   *
   * Memoized to recompute only when favorites or sortBy changes.
   */
  const showGroups = useMemo(() => {
    return Object.values(favorites || {})
      .map((g) => ({
        ...g,
        episodes: sortEpisodes(g.episodes || [], sortBy),
      }))
      .sort((a, b) => (a.showTitle || "").localeCompare(b.showTitle || ""));
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
                <EpisodeRow
                  key={ep.episodeId}
                  showId={group.showId}
                  showTitle={group.showTitle}
                  seasonNumber={ep.seasonNumber}
                  episodeId={ep.episodeId}
                  episodeTitle={ep.episodeTitle}
                  episodeNumber={ep.episodeNumber}
                  coverSrc={ep.seasonImage || group.showImage}
                  coverAlt={group.showTitle}
                  episodeSrc={ep.episodeSrc}   
                  addedAt={ep.addedAt}
                  showAddedAt
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
