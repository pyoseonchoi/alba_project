import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlbaForm from "../components/AlbaForm";
import ResumeForm from "../components/ResumeForm";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import db from "../firebase";

function Home() {
  const [showRegions, setShowRegions] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [recentJobs, setRecentJobs] = useState([]);
  const navigate = useNavigate();

  const regions = ["서울", "경기도", "강원도", "충청도", "경상도", "전라도", "제주"];

  // 🔧 useEffect는 컴포넌트 안에 위치해야 함
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, "albaPosts"), orderBy("createdAt", "desc"), limit(4));
        const snapshot = await getDocs(q);
        const jobs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setRecentJobs(jobs);
      } catch (error) {
        console.error("공고를 불러오는 중 오류 발생:", error);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="app">
      {/* ✅ 이 부분이 '맨 위 바(navbar)' */}
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
          <input type="text" placeholder="검색어를 입력하세요" className="search-input" />
          <button>로그인</button>
        </div>
      </nav>

      <main className="main-content">
        {showRegions && (
          <div className="region-menu">
            {regions.map((region) => (
              <div key={region} className="region-item" onClick={() => navigate(`/region/${region}`)}>
                {region}
              </div>
            ))}
          </div>
        )}

        {showForm && <AlbaForm onClose={() => setShowForm(false)} />}
        {showResume && <ResumeForm onClose={() => setShowResume(false)} />}

        <div className="recent-jobs-section">
          <h2 className="section-title">최근 등록된 알바</h2>
          <div className="job-grid">
            {recentJobs.length > 0 ? (
              recentJobs.map((job) => (
                <div key={job.id} className="job-card">
                  <h3>{job.name}</h3>
                  <p>📍 위치: {job.location}</p>
                  <p>💰 시급: {job.wage}</p>
                  <p>⏰ 시간: {job.time}</p>
                </div>
              ))
            ) : (
              <p>최근 등록된 알바가 없습니다.</p>
            )}
          </div>
        </div>
      </main>

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

export default Home;
