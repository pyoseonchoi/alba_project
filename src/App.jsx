import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import RegionPage from "./pages/RegionPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/region/:region" element={<RegionPage />} />
      </Routes>
    </Router>
  );
}

export default App;
