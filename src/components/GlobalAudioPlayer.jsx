import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { useAudioPlayer } from "../context/AudioContext";
import "./GlobalAudioPlayer.css";



/**
 * GlobalAudioPlayer – Persistent bottom audio player component.
 *
 * Consumes AudioPlayerContext to:
 * - Display current track metadata.
 * - Render a third-party audio player (react-h5-audio-player).
 * - Remount player when trackId changes to force playback refresh.
 *
 * Returns null if no track is selected.
 *
 * @returns {JSX.Element | null}
 */
export default function GlobalAudioPlayer() {
  const { track, isPlaying, setIsPlaying } = useAudioPlayer();

  // No track selected yet -> don't show the bar
  if (!track?.src) return null;

  return (
    <div className="global-player">
      <div className="global-player__meta">
        <div className="global-player__title">{track.title || "Now playing"}</div>
        <div className="global-player__sub text-muted">
          {track.showTitle || ""}
          {track.seasonNumber ? ` · S${track.seasonNumber}` : ""}
          {track.episodeNumber ? ` · E${track.episodeNumber}` : ""}
        </div>
      </div>

      <AudioPlayer key={track?.trackId} src={track?.src} autoPlay />
    </div>
  );
}