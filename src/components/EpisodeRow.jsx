import { useFavorites } from "../context/FavoritesContext";
import { useAudioPlayer } from "../context/AudioContext";

export default function EpisodeRow({
  // identity
  showId,
  showTitle,

  // episode
  episodeId,
  episodeTitle,
  episodeNumber,
  episodeSrc,

  // season
  seasonNumber,

  // optional UI
  description = "",
  hideDescriptionOnMobile = false,
}) {
  const { toggleFavorite, isEpisodeFavorited } = useFavorites();
  const { playTrack } = useAudioPlayer();

  const favorited = isEpisodeFavorited(episodeId);

  return (
    <div className="season">
      <div className="season-row">
          <div className="episode-left">
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
                episodeId,
                episodeTitle,
                seasonNumber,
                episodeNumber,
                episodeSrc
              });
            }}
          >
            {favorited ? "❤️" : "🤍"}
          </button>
        </div>

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
          ▶
        </button>
      </div>
    </div>
  );  
}