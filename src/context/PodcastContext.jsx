import React, { createContext, useEffect, useState } from "react";

/**
 * Sorting options available to the user for viewing podcasts.
 * @type {{key: string, label: string}[]}
 */
export const SORT_OPTIONS = [
  { key: "default", label: "Default" }, // no sorting unless user chooses
  { key: "date-desc", label: "Newest" },
  { key: "date-asc", label: "Oldest" },
  { key: "title-asc", label: "Title A → Z" },
  { key: "title-desc", label: "Title Z → A" },
];

/**
 * React context for sharing podcast state across components.
 */
export const PodcastContext = createContext(null);

/**
 * PodcastProvider wraps children in a context with state for
 * searching, sorting, filtering, and paginating podcast data.
 */
export function PodcastProvider({ children, initialPodcasts = [] }) {
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("default"); // user must choose to sort
  const [genre, setGenre] = useState("all");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  // Responsive pagination
  useEffect(() => {
    const calculatePageSize = () => {
      const screenW = window.innerWidth;

      // Tablet and smaller (≤ 1024px): always show 8 cards
      if (screenW <= 1024) {
        setPageSize(8);
        return;
      }

      // Larger screens: calculate based on available width and 2 rows
      const cardWidth = 260;
      const maxRows = 2;
      const columns = Math.floor(screenW / cardWidth);
      const calculatedPageSize = columns * maxRows;

      setPageSize(Math.min(calculatedPageSize, 8));
    };

    calculatePageSize();
    window.addEventListener("resize", calculatePageSize);
    return () => window.removeEventListener("resize", calculatePageSize);
  }, []);

  /**
   * Apply genre filter + search + (optional) sort.
   * @returns {Array} Filtered (and possibly sorted) podcasts
   */
  const applyFilters = () => {
    const safePodcasts = Array.isArray(initialPodcasts) ? initialPodcasts : [];
    let data = [...safePodcasts];

    // Genre filter
    if (genre !== "all") {
      const genreId = Number(genre);
      data = data.filter((podcast) => podcast.genres.includes(genreId));
    }

    // Search filter
    const searchQuery = search.trim().toLowerCase();
    if (searchQuery) {
      data = data.filter((podcast) =>
        podcast.title.toLowerCase().includes(searchQuery)
      );
    }

    //Sort ONLY if user selected something other than "default"
    switch (sortKey) {
      case "title-asc":
        data.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        data.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "date-asc":
        data.sort((a, b) => new Date(a.updated) - new Date(b.updated));
        break;
      case "date-desc":
        data.sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      case "default":
      default:
        break;
    }

    return data;
  };

  const filtered = applyFilters();

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const paged = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Reset to page 1 when filters change (keeps selections intact)
  useEffect(() => {
    setPage(1);
  }, [search, sortKey, genre]);

  const value = {
    search,
    setSearch,
    sortKey,
    setSortKey,
    sortOptions: SORT_OPTIONS,

    genre,
    setGenre,

    page: currentPage,
    setPage,
    totalPages,

    podcasts: paged,
    allPodcastsCount: filtered.length,
    pageSize,
  };

  return (
    <PodcastContext.Provider value={value}>{children}</PodcastContext.Provider>
  );
}
