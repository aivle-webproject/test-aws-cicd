// src/components/Header.jsx
import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";

function Header() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const isLoggedIn = !!user;

    return (
        <header className="header">
            {/* 왼쪽 로고 */}
            <div className="logo-area">
                <Link to="/" className="logo-link">
                    <h1 className="logo-text">걷다가 서재</h1>
                </Link>
            </div>

            {/* 오른쪽 버튼 영역 */}
            <div className="profile-area">
                {isLoggedIn ? (
                    <>
                        {/* 사용자 정보 */}
                        <div className="profile-info">
                            <div className="profile-icon">👤</div>
                            <span className="profile-name">{user.name} 님</span>
                        </div>

                        {/* 프로필 */}
                        <button
                            className="add-book-btn"
                            onClick={() => navigate("/profile")}
                        >
                            프로필
                        </button>

                        {/* 도서 등록 */}
                        <button
                            className="add-book-btn"
                            onClick={() => navigate("/book-register")}
                        >
                            도서 등록
                        </button>



                        {/* 로그아웃 */}
                        <button
                            className="logout-btn"
                            onClick={logout}
                        >
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        {/* 로그인 */}
                        <button
                            className="header-btn login-btn"
                            onClick={() => navigate("/login")}
                        >
                            로그인
                        </button>

                        {/* 회원가입 */}
                        <button
                            className="header-btn signup-btn"
                            onClick={() => navigate("/signup")}
                        >
                            회원가입
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;
