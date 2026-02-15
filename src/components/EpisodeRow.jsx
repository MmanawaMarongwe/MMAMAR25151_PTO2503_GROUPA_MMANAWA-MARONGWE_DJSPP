import { useFavorites } from "../context/FavoritesContext";
import { useAudioPlayer } from "../context/AudioContext";
import { dateFormat } from "../utils/dateFormat";


/**
 * EpisodeRow
 *
 * Reusable row component used in both Season lists and Favorites.
 * Integrates two global contexts:
 * - FavoritesContext: toggles episode favorites
 * - AudioPlayerContext: starts playback for the selected episode
 *
 * Key behaviors (presentation points):
 * - Prevents parent click handlers from firing using stopPropagation()
 * - Uses episodeId to derive favorited state
 * - Passes a normalized track object to the global audio player via playTrack()
 *
 * * @param {Object} props
 * @param {string} props.showId - Parent show identifier.
 * @param {string} props.showTitle - Show title.
 * @param {string} [props.showImage] - Show artwork.
 * @param {string} props.episodeId - Unique episode identifier.
 * @param {string} props.episodeTitle - Episode title.
 * @param {number} [props.episodeNumber] - Episode number.
 * @param {string} props.episodeSrc - Audio source URL.
 * @param {string} [props.coverAlt] - Image alt text.
 * @param {string} [props.coverSrc] - Episode/season image source.
 * @param {number} [props.seasonNumber] - Season number.
 * @param {string} [props.seasonImage] - Season artwork.
 * @param {string} [props.description] - Optional episode description.
 * @param {boolean} [props.hideDescriptionOnMobile] - Hide description on mobile.
 * @param {string} [props.addedAt] - ISO timestamp for favorites.
 * @param {boolean} [props.showAddedAt] - Display added date flag.
 *
 * @returns {JSX.Element}
 */
export default function EpisodeRow({
  // identity
  showId,
  showTitle,
  showImage,

  // episode
  episodeId,
  episodeTitle,
  episodeNumber,
  episodeSrc,
  coverAlt,
  coverSrc,

  // season
  seasonNumber,
  seasonImage,

  // optional UI
  description = "",
  hideDescriptionOnMobile = false,
  addedAt,
  showAddedAt = false,
}) {
  const { toggleFavorite, isEpisodeFavorited } = useFavorites();
  const { playTrack } = useAudioPlayer();

  const favorited = isEpisodeFavorited(episodeId);

  return (
      <div className="season-row">
         
          <div className="episode-left">
             <div>
              {coverSrc && (
              <img
                className="episode-cover"
                src={coverSrc}
                alt={coverAlt || `${showTitle} cover`}
                loading="lazy"
              />
              )}
            </div>
          
            <div className="episode-info">
              <strong className="season-title">
                {episodeTitle}
              </strong>
              {showAddedAt && addedAt && (
                <p className="text-muted" style={{ marginTop: "6px" }}>
                Added {dateFormat(addedAt)}
                  </p>
              )}

              {!!description && (
              <p
                className={`text-muted ${hideDescriptionOnMobile ? "episode-desc" : ""}`}
                style={{ marginTop: "6px" }}
              >
                {description}
              </p>
                )}
            </div>
          

            
        </div>
    
        <div className="action-buttons">
          <button
              type="button"
              className={`fav-btn ${favorited ? "is-fav" : ""}`}
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
              title={favorited ? "Unfavorite" : "Favorite"}
              /**
              * Handles favorite toggle without triggering parent row clicks.
              * Passes episode + show metadata to FavoritesContext for add/remove logic.
              */
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite({
                  showId,
                  showTitle,
                  showImage,  
                  episodeId,
                  episodeTitle,
                  seasonNumber,
                  seasonImage,
                  episodeNumber,
                  episodeSrc,
                });
                }}
              >
                {favorited ? "❤️" : "🤍"}
            </button>


          <button
          type="button"
          className="play-btn"
          /**
            * Starts playback without triggering parent row clicks.
            * Passes a normalized track object to AudioContext.
          */
          onClick={(e) => {
            e.stopPropagation();
            playTrack({
              src: episodeSrc,
              title: episodeTitle,
              showTitle,
              seasonNumber,
              episodeNumber,
              
              
            });
          }}
        >
          ▶ Play
        </button>
        </div>
        
      </div>  
  );  
}