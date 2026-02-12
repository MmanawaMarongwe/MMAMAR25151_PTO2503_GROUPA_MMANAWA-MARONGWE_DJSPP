import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { useAudioPlayer } from "../context/AudioContext";
import "./GlobalAudioPlayer.css";

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

      <AudioPlayer
        src={track.src}
        autoPlay={isPlaying}
        showSkipControls={false}
        showJumpControls={false}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  );
}