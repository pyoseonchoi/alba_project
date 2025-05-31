import "./AlbaForm.css";
import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import db from "../firebase";

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
      await addDoc(collection(db, "albaPosts"), {
        name: form.name,
        region: form.region,
        location: form.location,
        wage: form.wage,
        time: form.time,
        phone_num: form.phone_num,
        createdAt: new Date(),
      });
      alert("알바 공고가 등록되었습니다!");
      onClose(); 
    } catch (error) {
      console.error("등록 실패:", error);
      alert("등록 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="form-container">
      <h2>공고 등록</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="업체명"
          onChange={handleChange}
          required
        />

        <select
          name="region"
          value={form.region}
          onChange={handleChange}
          required
          className="styled-select"
        >
          <option value="">지역 선택</option>
          <option value="서울">서울</option>
          <option value="강원도">강원도</option>
          <option value="경기도">경기도</option>
          <option value="경상도">경상도</option>
          <option value="전라도">전라도</option>
          <option value="충청도">충청도</option>
          <option value="제주">제주</option>
        </select>


        <input
          name="location"
          type="text"
          placeholder="상세 위치 (예: 강남구)"
          onChange={handleChange}
          required
        />
        <input
          name="wage"
          type="number"
          placeholder="시급 (숫자만 입력)"
          onChange={handleChange}
          required
        />
        <input
          name="time"
          type="text"
          placeholder="근무 시간 (예: 10:00~18:00)"
          onChange={handleChange}
          required
        />
        <input
          name="phone_num"
          type="text"
          placeholder="전화번호 (예: 010-xxxx-xxxx)"
          onChange={handleChange}
          required
        />
        <button type="submit">등록</button>
        <button type="button" onClick={onClose}>
          닫기
        </button>
      </form>
    </div>
  );
}

export default AlbaForm;
