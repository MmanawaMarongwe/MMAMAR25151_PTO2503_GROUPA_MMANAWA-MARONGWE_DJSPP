import { useFavorites } from "../context/FavoritesContext";
import { useAudioPlayer } from "../context/AudioContext";

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
                #{episodeNumber} {episodeTitle}
              </strong>

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