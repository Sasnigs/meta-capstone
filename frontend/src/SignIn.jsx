import { Link } from "react-router-dom";
import { useState } from "react";
import { BASE_URL } from "./data/data";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

export default function SignIn({ checkSession }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    setPassword("");
    setUsername("");
    e.preventDefault();
    const formData = { username, password };

    try {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        await checkSession();
        navigate("/homepage", { replace: true });
      } else {
        const data = await res.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="sign-in-div">
      <h1>Show GraM</h1>
      <h3>Sign in</h3>
      <div>
        <form className="sign-in-form" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={username}
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign In</button>
        </form>
      </div>

      <Link to={"signUp"}>
        <button className="sign-up">Sign up</button>
      </Link>
    </div>
  );
}
