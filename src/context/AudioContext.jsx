import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const AudioPlayerContext = createContext(null);

const STORAGE_KEY = "app-audio";

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

  function playTrack(nextTrack) {
  if (!nextTrack?.src) return;

  setTrack({
    ...nextTrack,
    trackId: `${nextTrack.src}-${Date.now()}`, // unique
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