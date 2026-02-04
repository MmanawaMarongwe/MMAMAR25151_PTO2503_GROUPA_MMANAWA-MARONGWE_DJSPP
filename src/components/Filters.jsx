import { useContext } from "react";
import { PodcastContext } from "../context/PodcastContext";
import { genres } from "../data.js";

/**
 * Filters
 * Provides search, genre, and sorting controls for browsing podcasts.
 *
 * @returns {JSX.Element}
 */
export default function Filters() {
  const {
    search,
    setSearch,
    sortKey,
    setSortKey,
    sortOptions,
    genre,
    setGenre,
  } = useContext(PodcastContext);

  return (
    <div className="filters">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search podcasts..."
        aria-label="Search podcasts by title"
      />

      <select value={genre} onChange={(e) => setGenre(e.target.value)}>
        <option value="all">All genres</option>
        {genres.map((g) => (
          <option key={g.id} value={String(g.id)}>
            {g.title ?? g.name}
          </option>
        ))}
      </select>

      <select value={sortKey} onChange={(e) => setSortKey(e.target.value)}>
        {sortOptions.map((option) => (
          <option key={option.key} value={option.key}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
