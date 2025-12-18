// src/pages/ProfilePage.jsx
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "../App.css";
import "./ProfilePage.css";
import {useNavigate} from "react-router-dom";

function ProfilePage() {
    const { user, logout } = useAuth();
    const userId = user.id;
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);


    /* ✅ 비밀번호 변경 */
    const handleChangePassword = async () => {
        if (!newPassword) return alert("비밀번호 입력");

        try {
            await axios.patch(`http://localhost:8080/profile/${userId}/password`, {
                newPassword
                }
            );

            alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
            logout();
            navigate("/login");
        } catch (err) {
            console.error(err);
            alert("비밀번호 변경 실패");
        }
    };

    /* ✅ 계정 삭제 */
    const handleDeleteAccount = async () => {
        const ok = window.confirm("정말 계정을 삭제하시겠습니까?");
        if (!ok) return;

        try {
            await axios.delete(`http://localhost:8080/profile/${userId}`);

            alert("계정이 삭제되었습니다.");
            logout();
            navigate("/");
        } catch (err) {
            console.error(err);
            alert("계정 삭제 실패");
        }
    };

    return (
        <div className="layout">
            <Sidebar />

            <main className="content">
                <div className="profile-page">
                    <header className="profile-header">
                        <h1 className="profile-title">내 프로필</h1>
                        <p className="profile-subtitle">
                            나의 독서 정보와 계정 상태를 확인하세요.
                        </p>
                    </header>

                    <section className="profile-column">
                        {/* 프로필 카드 */}
                        <div className="profile-card">
                            <div className="profile-avatar">
                                <span>{user.name[0]}</span>
                            </div>

                            <div className="profile-info">
                                <h2 className="profile-name">{user.name}</h2>
                                <p className="profile-date">가입 회원</p>
                            </div>
                        </div>

                        {/* 계정 설정 */}
                        <div className="account-card">
                            <h3 className="account-title">계정 설정</h3>

                            {/* ✅ 비밀번호 변경 */}
                            <div className="account-buttons">
                                <input
                                    type="password"
                                    placeholder="새 비밀번호"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button
                                    className="setting-btn"
                                    onClick={handleChangePassword}
                                    disabled={loading}
                                >
                                    🔒 비밀번호 변경
                                </button>
                            </div>

                            {/* ✅ 계정 삭제 */}
                            <div className="danger-group">
                                <button
                                    className="danger-btn"
                                    onClick={handleDeleteAccount}
                                >
                                    🗑 계정 삭제
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default ProfilePage;
