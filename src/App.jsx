import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import AlbaForm from './components/AlbaForm';
import RegionPage from './pages/RegionPage'; //  추가
import ResumeForm from './components/ResumeForm';

function Home() {
  const [showRegions, setShowRegions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showResume, setShowResume] = useState(false); 
  const navigate = useNavigate();

  const regions = ["서울", "경기도", "강원도", "충청도", "경상도", "전라도", "제주"];

  return (
  <div className="app">
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">장년일터</div>
      </div>
      <div className="navbar-center">
        <button onClick={() => setShowRegions(!showRegions)}>지역별</button>
        <button onClick={() => setShowForm(!showForm)}>공고 등록</button>
        <button onClick={() => setShowResume(!showResume)}>이력서 등록</button>
      </div>
      <div className="navbar-right">
  <input
    type="text"
    placeholder="검색어를 입력하세요"
    className="search-input"
  />
  <button>로그인</button>
</div>

    </nav>

    {/* ✅ 여기부터 메인 콘텐츠를 감싸줘야 함 */}
    <main className="main-content">
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

      {showForm && <AlbaForm onClose={() => setShowForm(false)} />}
      {showResume && <ResumeForm onClose={() => setShowResume(false)} />}
    </main>
    {/* ✅ 여기까지가 메인 콘텐츠 */}

    {/* 광고 배너 */}
    <div className="ad-section">
  <div className="ad-header">
    <h3>📢 추천 공고</h3>
    <button className="apply-button">신청하기</button>
  </div>
  <div className="ad-grid">
    <div className="ad-card">광고 1</div>
    <div className="ad-card">광고 2</div>
    <div className="ad-card">광고 3</div>
  </div>
</div>

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
