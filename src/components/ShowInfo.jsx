import { dateFormat } from "../utils/dateFormat";

/**
 * Show podcast about info (title + description + show id + last updated).
 *
 * @param {{
 *  title?: string,
 *  description?: string,
 *  updated?: string,
 *  id: string,
 *  loading?: boolean,
 *  error?: string
 * }} props
 * @returns {JSX.Element}
 */
export default function ShowInfo({
  title,
  description,
  updated,
  id,
  loading = false,
  error = "",
}) {
  return (
    <>
      <h2>
        {loading && "Loading show…"}
        {!loading && error && "Error loading show"}
        {!loading && !error && (title || "Podcast Details")}
      </h2>

      <h3>Description</h3>
      <p className="text-muted">
        {description || "Podcast description will appear here."}
        <br />
        <strong>Show ID:</strong> {id}
      </p>

      <p className="text-muted">
        Last updated {updated ? dateFormat(updated) : "—"}
      </p>
    </>
  );
}