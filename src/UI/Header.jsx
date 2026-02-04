import podcastLogo from "../assets/podcast-logo.png";
import searchIcon from "../assets/search-icon.png";
import userImg from "../assets/user-profile.png";

/**
 * Header
 * Displays the application header and branding.
 *
 * @returns {JSX.Element}
 */
export default function Header() {
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
        <img
          src={searchIcon}
          alt="A picture of a search icon"
          className="search-icon"
        />
        <img
          src={userImg}
          alt="A user profile picture"
          className="profile-pic"
        />
      </div>
    </header>
  );
}
