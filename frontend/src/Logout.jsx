import { BASE_URL } from "./data/baseUrls";
import { useNavigate } from "react-router-dom";
import './Logout.css'

export default function Logout({setUser}) {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const res = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null);
        navigate("/homepage", { replace: true });
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  }
  return (
    // TODO: Implement UI for log out
    <div>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}
