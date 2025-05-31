import React, { useState } from "react";

function ResumeForm({ onClose }) {
  const [form, setForm] = useState({
    name: "",
    region: "",
    location: "",
    age: "",
    experience: "",
    phone_num: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("이력서 저장 기능은 로그인 후 제공됩니다.");
    onClose();
  };

  return (
    <div className="form-container">
      <h2>이력서 등록</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" placeholder="이름" onChange={handleChange} required />
        <input name="region" type="text" placeholder="지역 (예: 서울)" onChange={handleChange} required />
        <input name="location" type="text" placeholder="상세 위치 (예: 강남구)" onChange={handleChange} required />
        <input name="age" type="number" placeholder="나이" onChange={handleChange} required />
        <input name="experience" type="text" placeholder="경력 (예: 마케팅 20년)" onChange={handleChange} required />
        <input name="phone_num" type="text" placeholder="전화번호" onChange={handleChange} required />
        <button type="submit">등록</button>
        <button type="button" onClick={onClose}>취소</button>
      </form>
    </div>
  );
}

export default ResumeForm;
