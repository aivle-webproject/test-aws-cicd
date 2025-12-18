// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react"; // ★ useEffect 추가 필수

import Home from "./pages/Home";
import Layout from "./components/Layout";
import BookRegister from "./pages/BookRegister";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BookDetail from "./components/BookDetail";
import ProfilePage from "./pages/ProfilePage";

function App() {
  // 도서 목록 상태 (test 브랜치에서 쓰던 로직 살리기)
  const [books, setBooks] = useState([]);

  // ★ 중요: 본인의 EC2 퍼블릭 IP로 변경하세요! (http:// 필수, 포트 3000 필수)
  const API_URL = "http://43.203.210.226:3000";
  // 1. 처음 실행될 때 EC2에서 책 목록 가져오기 (GET)
  useEffect(() => {
    fetch(`${API_URL}/books`)
      .then((res) => res.json())
      .then((data) => {
        console.log("서버에서 받은 책:", data);
        setBooks(data); // 받아온 데이터를 상태에 저장
      })
      .catch((err) => console.error("서버 연결 실패:", err));
  }, []);

  // 2. 책 등록할 때 EC2로 데이터 보내기 (POST)
  const addBook = (book) => {
    fetch(`${API_URL}/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Date.now(), // 임시 ID (보통은 서버가 만듦)
        ...book,
      }),
    })
      .then((res) => res.json())
      .then((newBook) => {
        // 서버 저장이 성공하면, 내 화면 목록에도 추가
        setBooks((prev) => [...prev, newBook]);
        alert("책이 등록되었습니다!");
      })
      .catch((err) => console.error("책 등록 실패:", err));
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home books={books} />} />
        <Route
          path="/book-register"
          element={<BookRegister addBook={addBook} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/:bookId" element={<BookDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;