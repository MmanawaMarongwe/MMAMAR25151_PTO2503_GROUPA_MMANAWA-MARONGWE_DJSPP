import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";


/**
 * Global Audio Player Context.
 * Provides shared playback state and controls across the entire application.
 * Ensures a single audio instance is used while navigating between routes.
 */
const AudioPlayerContext = createContext(null);

const STORAGE_KEY = "app-audio";

/**
 * AudioPlayerProvider
 *
 * Provides global audio playback state and controls to the application.
 *
 * Key Responsibilities:
 * - Maintains a single audio element reference (audioRef).
 * - Stores the currently selected track in state.
 * - Restores the last selected track from localStorage on initial load.
 *
 * The track state is lazily initialized to avoid unnecessary parsing
 * and to safely handle storage errors.
 *
 * @param {{ children: import("react").ReactNode }} props
 * @returns {JSX.Element}
 */
export function AudioPlayerProvider({ children }) {
  // One audio element for the whole app
  const audioRef = useRef(null);

  const [track, setTrack] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isPlaying, setIsPlaying] = useState(false);

  // Persist the currently selected track (optional but useful)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(track));
    } catch {
      // storage errors not set yet.
    }
  }, [track]);


/**
 * Selects a new track and initiates playback.
 *
 * Behavior:
 * - Validates that an audio source (src) exists before proceeding.
 * - Updates the track state with metadata.
 * - Generates a unique trackId to force a state update
 *   even if the same src is selected consecutively.
 * - Sets playback state to active.
 *
 * @param {Object} nextTrack - Track metadata.
 * @param {string} nextTrack.src - Audio source URL (required).
 * @param {string} [nextTrack.title] - Episode title.
 * @param {string} [nextTrack.showTitle] - Show title.
 * @param {number} [nextTrack.seasonNumber] - Season number.
 * @param {number} [nextTrack.episodeNumber] - Episode number.
 */
function playTrack(nextTrack) {
  if (!nextTrack?.src) return;

  setTrack({
    ...nextTrack,
    trackId: `${nextTrack.src}-${Date.now()}`, 
  });
  setIsPlaying(true);
}

  function togglePlay() {
    setIsPlaying((prev) => !prev);
  }

  function stop() {
    setIsPlaying(false);
  }

  const value = useMemo(
    () => ({
      audioRef,    // attach player component later
      track,       // { src, title, showTitle, seasonNumber, episodeNumber }
      isPlaying,
      playTrack,
      togglePlay,
      stop,
      setTrack,    // for stretch goals if I get there
      setIsPlaying // for stretch goals if I get there
    }),
    [track, isPlaying]
  );

  return <AudioPlayerContext.Provider value={value}>{children}</AudioPlayerContext.Provider>;
}

export function useAudioPlayer() {
  const ctx = useContext(AudioPlayerContext);
  if (!ctx) throw new Error("useAudioPlayer must be used within an AudioPlayerProvider");
  return ctx;
}