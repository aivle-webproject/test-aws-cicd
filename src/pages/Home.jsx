import Sidebar from "../components/Sidebar";
import BookGrid from "../components/BookGrid";
import "../App.css";
import "./Home.css";

function Home() {
    return (
        <div className="layout">
            <Sidebar />
            <main className="content">
                <BookGrid />
            </main>
        </div>
    );
}

export default Home;
