/**
 * Render a list of genre tags.
 *
 * @param {{ tags?: string[] }} props
 * @returns {JSX.Element}
 */
export default function GenreTags({ tags = [] }) {
  const safeTags = Array.isArray(tags) ? tags : [];

  return (
    <div className="genre-tags">
      {safeTags.length ? (
        safeTags.map((title) => (
          <span className="tag" key={title}>
            {title}
          </span>
        ))
      ) : (
        <>
          <span className="tag">Genre</span>
          <span className="tag">Genre</span>
        </>
      )}
    </div>
  );
}