import { useState } from "react";
import EpisodeRow from "./EpisodeRow";

/**
 * SeasonList
 * Renders seasons as expandable rows. Each season can be expanded to reveal its episodes.
 */
export default function SeasonList({ seasons = [], showId, showTitle,showImage }) {
  const [openSeasonKey, setOpenSeasonKey] = useState(null);

  function toggleSeason(key) {
    setOpenSeasonKey((prev) => (prev === key ? null : key));
  }

  return (
    <>
      {seasons.map((season, i) => {
        const key = season?.id ?? i;
        const isOpen = openSeasonKey === key;

        const seasonNum = season?.season ?? i + 1;
        const episodes = season?.episodes || [];

        return (
          <div className="season" key={key}>
            <div
              className="season-row"
              role="button"
              tabIndex={0}
              onClick={() => toggleSeason(key)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") toggleSeason(key);
              }}
              style={{ cursor: "pointer" }}
            >
              <strong className="season-title">
                {season?.title || `Season ${seasonNum}`}
              </strong>
              <span className="text-muted episodes-count">
                {episodes.length} episode{episodes.length === 1 ? "" : "s"}
              </span>
            </div>

            {isOpen && (
              <div style={{ marginTop: "12px", marginLeft: "16px" }}>
                {episodes.map((ep, idx) => {
                  const epNumber = ep?.episode ?? idx + 1;
                  const epTitle = ep?.title || `Episode ${epNumber}`;
                  const epDescription = (ep?.description || "").trim();
                  const shortDesc =
                    epDescription.length > 140
                      ? `${epDescription.slice(0, 140)}…`
                      : epDescription;

                  const epKey = ep?.id ?? `${key}-ep-${idx}`;

                  return (
                    <EpisodeRow
                      key={epKey}
                      showId={showId}
  showTitle={showTitle}
  showImage={showImage}                 
  seasonImage={season.image} 
                      episodeId={ep?.id ?? `${showId}-${seasonNum}-${epNumber}`}
                      episodeTitle={epTitle}
                      episodeNumber={epNumber}
                      episodeSrc={ep.file}
                      coverSrc={season.image || showImage}
                      coverAlt={showTitle}
                      seasonNumber={seasonNum}
                      description={shortDesc}
                      hideDescriptionOnMobile
                      
                    />
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}