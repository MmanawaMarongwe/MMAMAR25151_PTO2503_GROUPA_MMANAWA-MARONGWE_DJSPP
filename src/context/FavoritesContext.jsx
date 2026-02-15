import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "app-favorites";

/**
 * FavoritesProvider
 *
 * Global state manager for episode-level favorites.
 *
 * Responsibilities:
 * - Stores favorites grouped by showId.
 * - Restores persisted data from localStorage on initial render.
 * - Persists changes automatically when favorites state updates.
 *
 * Data Model:
 * {
 *   [showId]: {
 *     showId,
 *     showTitle,
 *     showImage,
 *     episodes: [ { episodeId, episodeTitle, ... } ]
 *   }
 * }
 *
 * Functional state updates are used to safely derive the next state
 * from the previous state.
 */
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Persist favorites whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);


  /**
 * Adds or removes an episode from favorites.
 *
 * Behavior:
 * - If the episode already exists, it is removed.
 * - If removal results in zero episodes for a show,
 *   the entire show group is removed from state.
 * - If the episode does not exist, it is added with a timestamp.
 *
 * Uses a functional state update to avoid stale closures
 * and ensure correctness when multiple updates occur.
 *
 *
 * @param {Object} params - Show and episode metadata.
 */
  function toggleFavorite({
    showId,
    showTitle,
    showImage,
    episodeId,
    episodeTitle,
    seasonNumber,
    seasonImage,
    episodeNumber,
    episodeSrc,
  }) {
    setFavorites((prev) => {
      const showGroup = prev[showId];

      // If show exists and episode is already selected as a favorite, remove it
      if (showGroup) {
        const exists = showGroup.episodes.find(
          (ep) => ep.episodeId === episodeId
        );

        if (exists) {
          const updatedEpisodes = showGroup.episodes.filter(
            (ep) => ep.episodeId !== episodeId
          );

          // If no episodes left, remove the show group entirely
          if (updatedEpisodes.length === 0) {
            const { [showId]: _, ...rest } = prev;
            return rest;
          }

          return {
            ...prev,
            [showId]: {
              ...showGroup,
              episodes: updatedEpisodes,
            },
          };
        }
      }

      // Otherwise, add episode to favorites
      const newEpisode = {
        episodeId,
        episodeTitle,
        seasonNumber,
        episodeNumber,
        seasonImage,
        episodeSrc,
        addedAt: new Date().toISOString(),
      };

      return {
        ...prev,
        [showId]: {
          showId,
          showTitle,
          showImage, 
          episodes: showGroup
            ? [...showGroup.episodes, newEpisode]
            : [newEpisode],
        },
      };
    });
  }

  /**
   * Check if an episode is favourited
   */
  function isEpisodeFavorited(episodeId) {
    return Object.values(favorites).some((group) =>
      group.episodes.some((ep) => ep.episodeId === episodeId)
    );
  }

  /**
   * Check if a show has any favorited episodes
   */
  function hasFavoritesForShow(showId) {
    return Boolean(favorites[showId]?.episodes.length);
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isEpisodeFavorited,
        hasFavoritesForShow,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

/**
 * Custom hook for consuming favourites context
 */
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
}