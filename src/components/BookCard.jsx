import "./BookCard.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function BookCard({ id, title, coverImageUrl }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${id}`);
  };

  return (
    <div className="book-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <div className="book-cover-wrapper">
        {coverImageUrl ? (
          <img src={coverImageUrl} alt={title} className="book-cover" />
        ) : (
          <div className="book-cover placeholder" />
        )}
      </div>
      <p className="book-title">{title}</p>
    </div>
  );
}

export default BookCard;
