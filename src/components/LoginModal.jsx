import "./Modal.css";

function LoginModal({ onClose, onLoginSuccess }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>로그인</h2>

                <input type="email" placeholder="이메일" />
                <input type="password" placeholder="비밀번호" />

                <div className="modal-actions">
                    {/* ✅ 지금은 가짜 로그인 */}
                    <button onClick={() => onLoginSuccess("에이블러")}>
                        로그인
                    </button>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}

export default LoginModal;
