import Logout from "./Logout";
import { Link } from "react-router-dom";
import './NavBar.css';

export default function NavBar({ setUser }) {
  return (
    <nav className="navbar">
      <Link to="/" className="logo-link">
        <img className="logo" src="/Logo.png" alt="logo" />
      </Link>
      <h1 className="nav-title">ReelTalk</h1>
      <Logout setUser={setUser} />
    </nav>
  );
}
