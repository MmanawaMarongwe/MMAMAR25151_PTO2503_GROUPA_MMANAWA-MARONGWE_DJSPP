/**
 * Show cover image block.
 *
 * @param {{ image?: string, title?: string }} props
 * @returns {JSX.Element}
 */
export default function ShowCover({ image, title }) {
  return (
    <div className="image-grid">
      <img
        src={image || "https://via.placeholder.com/300"}
        alt={title ? `${title} cover` : "Podcast cover placeholder"}
        className="podcast-cover"
      />
    </div>
  );
}