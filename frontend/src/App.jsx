import { useState, useEffect } from "react";
import "./App.css";
import { BASE_URL } from "./data/baseUrls";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Homepage from "./Homepage";
import { Routes, Route, Navigate } from "react-router-dom";
import MovieForum from "./MovieForum";

function App() {
  const [user, setUser] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

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

  if (checkingSession)
    return (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    );
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
          element={
            user ? <Homepage setUser={setUser} /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/movie/:id"
          element={
            user ? (
              <MovieForum user={user} setUser={setUser} />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
