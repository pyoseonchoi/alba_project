import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import db from "../firebase";
import "../App.css"; 

function RegionPage() {
  const { region } = useParams();
  const [albaList, setAlbaList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlbaData = async () => {
      const q = query(collection(db, "albaPosts"), where("region", "==", region));
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAlbaList(data);
    };

    fetchAlbaData();
  }, [region]);

  return (
    <div className="app">
      {}
      <nav className="navbar">
        <div className="navbar-left">
          <div className="logo">장년일터</div>
        </div>
        <div className="navbar-right">
          <button onClick={() => navigate("/")}>홈으로</button>
        </div>
        
      </nav>

      <div style={{ padding: "20px 40px" }}>
        <h2>{region} 지역 일자리 목록</h2>
        {albaList.length === 0 ? (
          <p>등록된 공고가 없습니다.</p>
        ) : (
          albaList.map((alba) => (
            <div key={alba.id} style={{ border: "1px solid #ccc", padding: "12px", margin: "10px 0", borderRadius: "8px" }}>
              <div className ="list-header">
                <h3>{alba.name}</h3>
                <button className="apply-button">신청하기</button>
              </div>
              <p>위치: {alba.location}</p>
              <p>시급: {alba.wage}원</p>
              <p>시간: {alba.time}</p>
              <p>전화번호: {alba.phone_num}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RegionPage;
