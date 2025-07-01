import { useState } from "react";
import { BASE_URL } from "./data/data";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp({checkSession}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  async function handleSubmit(e) {
    setPassword("");
    setUsername("");
    setEmail("");
    e.preventDefault();
    const formData = { username, password, email };

    try {
      const res = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      if (res.ok) {
        const data = await res.json();
        await checkSession()
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
    <div className="signup-cont">
      <h1>Show GraM</h1>
      <h3>Sign Up</h3>
      <div>
        <form className="sign-up-form" onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            value={username}
            placeholder="Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            value={email}
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}
