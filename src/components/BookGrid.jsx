import "./BookGrid.css";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import axios from "axios";

function BookGrid() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/books");
                setBooks(res.data);
            } catch (error) {
                console.error(error);
                alert("도서 목록 불러오기 실패");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) return <div>불러오는 중...</div>;

    return (
        <div className="book-grid">
            {books.map((b) => (
                <BookCard
                    key={b.bookId}
                    id={b.bookId}
                    title={b.title}
                    coverImageUrl={b.coverImageUrl}
                />
            ))}
        </div>
    );
}

export default BookGrid;
