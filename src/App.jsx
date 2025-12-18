// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

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

  const addBook = (book) => {
    setBooks((prev) => [
      ...prev,
      { id: Date.now(), ...book },
    ]);
  };

  return (
    <Layout>
      <Routes>
        {/* 홈: 책 리스트 전달 */}
        <Route path="/" element={<Home books={books} />} />

        {/* 도서 등록: addBook 함수 전달 */}
        <Route
          path="/book-register"
          element={<BookRegister addBook={addBook} />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 프로필 페이지 (현재 작업한 UI) */}
        <Route path="/profile" element={<ProfilePage />} />

        {/* 도서 상세 */}
        <Route path="/:bookId" element={<BookDetail />} />
      </Routes>
    </Layout>
  );
}

export default App;

