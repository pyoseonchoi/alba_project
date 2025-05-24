import React, { useState } from "react";
import "./App.css";
import AlbaForm from './components/AlbaForm';

function App() {
  const [showRegions, setShowRegions] = useState(false);
  const [showForm, setShowForm] = useState(false); // 🔹 폼 보이기 상태

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
            <div key={region} className="region-item">
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

export default App;
