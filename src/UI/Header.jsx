import { useState } from "react";
import podcastLogo from "../assets/podcast-logo.png";
import userImg from "../assets/user-profile.png";
import { Link } from "react-router-dom";

/**
 * Header
 * Displays the application header and branding.
 *
 * @returns {JSX.Element}
 */
export default function Header({ theme, onToggleTheme }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function toggleNav() {
    setIsNavOpen((prev) => !prev);
  }

  function closeNav() {
    setIsNavOpen(false);
  }

  return (
    <header className="app-header">
      <div className="app-identity">
        <img
          src={podcastLogo}
          alt="A picture of the Podcast logo"
          className="app-logo"
        />
        <h1 className="app-name">CodeCast</h1>
      </div>

      {/* Mobile nav toggle */}
      <button
        type="button"
        className="nav-toggle"
        onClick={toggleNav}
        aria-label={isNavOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isNavOpen}
        aria-controls="header-nav"
      >
        <span aria-hidden="true">{isNavOpen ? "✕" : "☰"}</span>
      </button>

      <nav
        id="header-nav"
        className={`home-fav-wrapper ${isNavOpen ? "is-open" : ""}`}
      >
        <Link to="/" onClick={closeNav}>
          <button className="genre-pill">Home</button>
        </Link>
        <Link to="/favorites" onClick={closeNav}>
          <button className="genre-pill">Favorites</button>
        </Link>
      </nav>

      <div className="user-section">
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
          }
          title={theme === "dark" ? "Switch to light" : "Switch to dark"}
        >
          <span aria-hidden="true">{theme === "dark" ? "🌑" : "☀️"}</span>
        </button>
        <img
          src={userImg}
          alt="A user profile picture"
          className="profile-pic"
        />
      </div>
    </header>
  );
}
