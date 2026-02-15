import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);

const STORAGE_KEY = "app-favorites";

/**
 * FavoritesProvider
 * Manages episode-level favorites and persists them in localStorage
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
   * Toggle an episode as favorite / unfavorite
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