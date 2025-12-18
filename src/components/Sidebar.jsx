import "./Sidebar.css";
import { useState } from "react";

const CATEGORIES = [
    { icon: "📚", label: "전체" },
    { icon: "❤️", label: "로맨스" },
    { icon: "🚀", label: "SF" },
    { icon: "👻", label: "공포" },
    { icon: "🔍", label: "추리" },
    { icon: "🏺", label: "역사" },
    { icon: "✒️", label: "시" },
    { icon: "🏛️", label: "고전" },
    { icon: "🧚", label: "동화" },
];

function Sidebar() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <aside className="sidebar">
            <h2 className="sidebar-title">카테고리</h2>

            <div className="category-list">
                {CATEGORIES.map((c, i) => (
                    <div
                        key={c.label}
                        className={`category-item ${activeIndex === i ? "active" : ""}`}
                        onClick={() => setActiveIndex(i)}
                    >
                        <span className="category-icon">{c.icon}</span>
                        <span className="category-label">{c.label}</span>
                    </div>
                ))}
            </div>
        </aside>
    );
}

export default Sidebar;
