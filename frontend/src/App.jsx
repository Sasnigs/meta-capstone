import { useState, useEffect } from "react";
import "./App.css";
import { BASE_URL } from "./data/data";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Homepage from "./Homepage";
import { Routes, Route, Navigate } from "react-router-dom";
import MovieForum from "./MovieForum";

function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true)

  async function checkSession() {
    try {
      const res = await fetch(`${BASE_URL}/me`, { credentials: "include" });
      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    }
    setCheckingSession(false);
  }
  useEffect(() => {
    checkSession();
  }, []);
 

  function navigate(url) {
    window.location.href = url;
  }
  async function auth() {
    try {
      const res = await fetch(`${BASE_URL}`, { method: "POST" });
      const data = await res.json();
      navigate(data.url);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  }
  // TODO: STYLE LOADING SCREEN TO MEET PJ REQ.
  if (checkingSession) return <div>Loading...</div>;
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <Navigate to="/homepage" replace />
            ) : (
              <SignIn checkSession={checkSession} />
            )
          }
        />
        <Route
          path="signUp"
          element={
            user ? (
              <Navigate to="/homepage" replace />
            ) : (
              <SignUp checkSession={checkSession} />
            )
          }
        />
        <Route
          path="/homepage"
          element={user ? <Homepage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/movie/:id"
          element={
            user ? <MovieForum user={user} /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
