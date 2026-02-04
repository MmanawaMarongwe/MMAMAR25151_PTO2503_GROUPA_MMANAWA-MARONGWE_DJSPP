import { useContext } from "react";
import PodcastCard from "./PodcastCard";
import { dateFormat } from "../utils/dateFormat.js";
import { genreList } from "../utils/genreList.js";
import { genres } from "../data.js";
import { PodcastContext } from "../context/PodcastContext.jsx";

/**
 * PodcastGrid
 * Renders a grid of podcast preview cards based on the current filters.
 *
 * @returns {JSX.Element}
 */
export default function PodcastGrid() {
  const { podcasts = [] } = useContext(PodcastContext);

  const podcastElements = podcasts.map((podcast) => (
    <PodcastCard
      key={podcast.id}
      id={podcast.id}
      title={podcast.title}
      image={podcast.image}
      seasons={podcast.seasons}
      genres={genreList(podcast.genres, genres)}
      updated={dateFormat(podcast.updated)}
    />
  ));

  return <section className="podcast-grid">{podcastElements}</section>;
}
