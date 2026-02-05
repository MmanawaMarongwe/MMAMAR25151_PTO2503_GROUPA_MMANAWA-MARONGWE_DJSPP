import { Link } from "react-router-dom";

/**
 * Show detail header area (back link).
 *
 * @param {{ loading: boolean, error: string}} props
 * @returns {JSX.Element}
 */
export default function ShowDetailHeader({ loading, error, title }) {
  return (
    <>
      <Link to="/" className="back-link">
        ← Back to browsing
      </Link>
    </>
  );
}