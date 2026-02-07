import podcastLogo from "../assets/podcast-logo.png";
import userImg from "../assets/user-profile.png";

/**
 * Header
 * Displays the application header and branding.
 *
 * @returns {JSX.Element}
 */
export default function Header({ theme, onToggleTheme }) {
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

      <div className="user-section">
          <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
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
