import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";
import db from "../firebase";
import "../App.css";

function RegionPage() {
  const { region } = useParams();
  const [albaList, setAlbaList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAlbaData();
  }, [region]);

  const fetchAlbaData = async () => {
    const q = query(collection(db, "albaPosts"), where("region", "==", region));
    const querySnapshot = await getDocs(q);
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setAlbaList(data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("이 공고를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "albaPosts", id));

      setAlbaList(prevList => prevList.filter(item => item.id !== id));
    } catch (error) {
      console.error("삭제 중 오류 발생:", error);
    }
  };

  return (
    <div className="app">
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
            <div
              key={alba.id}
              style={{
                border: "1px solid #ccc",
                padding: "12px",
                margin: "10px 0",
                borderRadius: "8px",
              }}
            >
              <div className="list-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3>{alba.name}</h3>
                <div>
                  <button className="apply-button" style={{ marginRight: "8px" }}>신청하기</button>
                  <button
                    className="delete-button"
                    style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "6px 10px", borderRadius: "4px", cursor: "pointer" }}
                    onClick={() => handleDelete(alba.id)}
                  >
                    삭제
                  </button>
                </div>
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
