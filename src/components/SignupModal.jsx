import "./Modal.css";

function SignupModal({ onClose }) {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <h2>회원가입</h2>

                <input placeholder="이름" />
                <input type="email" placeholder="이메일" />
                <input type="password" placeholder="비밀번호" />

                <div className="modal-actions">
                    <button>가입하기</button>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}

export default SignupModal;
