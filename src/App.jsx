import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import AlbaForm from './components/AlbaForm';
import RegionPage from './pages/RegionPage'; // 🔹 추가

function Home() {
  const [showRegions, setShowRegions] = useState(false);
  const [showForm, setShowForm] = useState(false); // 🔹 폼 보이기 상태
  const navigate = useNavigate();

  const regions = ["서울", "경기도", "강원도", "충청도", "경상도", "전라도", "제주"];

  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">알바모아</div>
        </div>
        <div className="navbar-center">
          <button onClick={() => setShowRegions(!showRegions)}>지역별</button>
          <button onClick={() => setShowForm(!showForm)}>알바 모집 등록</button>
        </div>
        <div className="navbar-right">
          <button>로그인</button>
        </div>
      </nav>

      {/* 지역 목록 */}
      {showRegions && (
        <div className="region-menu">
          {regions.map((region) => (
            <div
              key={region}
              className="region-item"
              onClick={() => navigate(`/region/${region}`)}
            >
              {region}
            </div>
          ))}
        </div>
      )}

      {/* 알바 등록 폼 */}
      {showForm && <AlbaForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

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
