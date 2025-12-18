import Header from "./Header";
import { useLocation } from "react-router-dom";


function Layout({ sidebar, children }) {
    return (
        <div className="app">
            <Header />
            <div className="layout">
                {sidebar}
                <main className="content">{children}</main>
            </div>
        </div>
    );
}

export default Layout;
