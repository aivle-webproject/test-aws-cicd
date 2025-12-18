// src/pages/BookDetail.jsx
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./BookDetail.css";
import "./Modal.css";

/* ================= 수정 모달 ================= */
function EditBookModal({ book, onClose, onSave }) {
    const [title, setTitle] = useState(book.title);
    const [category, setCategory] = useState(book.category);
    const [content, setContent] = useState(book.content);


    const handleSave = () => {
        onSave({
            ...book,
            title,
            category,
            content,
        });
    };


    return (
        <div className="modal-overlay">
            <div className="modal edit-book-modal">
                <h2>도서 수정</h2>

                <label className="modal-label">제목</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label className="modal-label">카테고리</label>
                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <label className="modal-label">내용</label>
                <textarea
                    rows={5}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <div className="modal-actions">
                    <button onClick={handleSave}>저장</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
}

/* ================= 상세 페이지 ================= */
function BookDetail() {
    const { bookId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);

    /* ✅ 단일 도서 조회 */
    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(
                    `http://3.36.115.225:8080/api/books/${bookId}`
                );
                setBook(res.data);
            } catch (error) {
                console.error(error);
                alert("도서를 불러오지 못했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [bookId]);

    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말 이 도서를 삭제하시겠습니까?");
        if (!confirmDelete) return;

        try {
            await axios.delete(
                `http://3.36.115.225:8080/api/books/${bookId}`
            );

            alert("도서가 삭제되었습니다.");
            navigate("/");
        } catch (error) {
            console.error(error);
            alert("도서 삭제 실패");
        }
    };

    /* ✅ 수정 저장 */
    const handleSave = async (updatedBook) => {
        try {
            const res = await axios.put(
                `http://3.36.115.225:8080/api/books/${bookId}`,
                updatedBook
            );
            setBook(res.data);        // 화면 즉시 반영
            setShowEditModal(false);
            alert("도서가 수정되었습니다.");
        } catch (error) {
            console.error(error);
            alert("도서 수정 실패");
        }
    };

    if (loading) {
        return <div className="layout"><div className="content">불러오는 중...</div></div>;
    }

    if (!book) {
        return (
            <div className="layout">
                <Sidebar />
                <main className="content">
                    <h2>책을 찾을 수 없습니다</h2>
                </main>
            </div>
        );
    }

    return (
        <div className="layout">
            {/* ✅ 사이드바 복구 */}
            <Sidebar />

            <main className="content">
                <div className="book-detail">
                    {/* 왼쪽 영역 */}
                    <div className="book-detail-left">
                        <div className="book-detail-cover">
                            {book.coverImageUrl ? (
                                <img src={book.coverImageUrl} alt={book.title} />
                            ) : (
                                <div className="book-cover-placeholder" />
                            )}
                        </div>

                        {/* ✅ 날짜 다시 표시 */}
                        <div className="book-detail-dates">
                            <p>등록날짜: {book.createdAt}</p>
                            <p>수정날짜: {book.editedAt}</p>
                        </div>
                    </div>

                    {/* 오른쪽 정보 */}
                    <div className="book-detail-info">
                        <h1 className="book-detail-title">{book.title}</h1>
                        <span className="book-detail-category">
                            {book.category}
                        </span>
                        <p className="book-detail-content">{book.content}</p>
                    </div>

                    {/* ✅ 수정 버튼 */}
                    <div className="book-detail-actions">
                        <button
                            className="edit-book-btn"
                            onClick={() => setShowEditModal(true)}
                        >
                            도서 수정
                        </button>

                        <button
                            className="edit-book-btn"
                            onClick={handleDelete}
                        >
                            도서 삭제
                        </button>
                    </div>

                    {showEditModal && (
                        <EditBookModal
                            book={book}
                            onClose={() => setShowEditModal(false)}
                            onSave={handleSave}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

export default BookDetail;