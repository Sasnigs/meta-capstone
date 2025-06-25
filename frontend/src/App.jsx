import { useState } from "react";
import "./App.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Routes, Route } from "react-router-dom";

function App() {
  const BASE_URL = "http://localhost:4500";
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

  return (
    <>
      <button type="button" onClick={() => auth()}>
        Sign in
      </button>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route />
      </Routes>
    </>
  );
}

export default App;
