// src/components/AlbaForm.jsx
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase"; // 🔹 아까 만든 연결 파일

function AlbaForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    region: "",
    location: "",
    wage: "",
    time: "",
    phone_num: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "albaPosts"), form); // 🔥 Firestore에 저장
      alert("알바 공고가 등록되었습니다!");
      onClose(); // 폼 닫기
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="form-container">
      <h2>알바 모집 등록</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="업체명" onChange={handleChange} required />
        <input name="region" type="text" placeholder="지역 (예: 서울)" onChange={handleChange} required />
        <input name="location" type="text" placeholder="상세 위치 (예: 강남구)" onChange={handleChange} required />
        <input name="wage" type="number" placeholder="시급 (숫자만 입력)" onChange={handleChange} required />
        <input name="time" type="text" placeholder="근무 시간 (예: 10:00~18:00)" onChange={handleChange} required />
         <input name="phone_num" type="text" placeholder="전화번호 (예: 010-xxxx-xxxx)" onChange={handleChange} required />
        <button type="submit">등록</button>
        <button type="button" onClick={onClose}>닫기</button>
      </form>
    </div>
  );
}

export default AlbaForm;
