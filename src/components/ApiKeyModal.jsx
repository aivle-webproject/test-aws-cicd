import "./ApiKeyModal.css";
import { useState } from "react";

function ApiKeyModal({ onClose, onSubmit }) {
    const [apiKey, setApiKey] = useState("");

    return (
        <div className="api-key-modal-overlay">
            <div className="api-key-modal">
                <h3>OpenAI API Key 입력</h3>

                <input
                    type="password"
                    placeholder="sk-xxxxxxxxxxxx"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                />

                <p className="helper">
                    * API Key는 저장되지 않고 1회 요청에만 사용됩니다.
                </p>

                <div className="api-key-modal-actions">
                    <button onClick={() => onSubmit(apiKey)}>
                        확인
                    </button>
                    <button className="cancel" onClick={onClose}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ApiKeyModal;
