import { useState } from "react";
import "./App.css";
import { BASE_URL } from "./data/data";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Homepage from "./Homepage";
import { Routes, Route } from "react-router-dom";

function App() {
  
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
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
// TODO: WORKING ON THIS LATER 
// <button type="button" onClick={() => auth()}>
//         Google Sign in
//       </button>