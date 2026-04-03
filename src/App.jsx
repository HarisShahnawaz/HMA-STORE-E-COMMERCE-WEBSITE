import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import MenPage from "./pages/MenPage";
import WomenPage from "./pages/WomenPage";
import ChildrenPage from "./pages/ChildrenPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import SalePage from "./pages/SalePage";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  const handleNavigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage onNavigate={handleNavigate} />;
      case "men":
        return <MenPage />;
      case "women":
        return <WomenPage />;
      case "children":
        return <ChildrenPage />;
      case "new-arrivals":
        return <NewArrivalsPage />;
      case "sale":
        return <SalePage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar
        cartCount={3}
        activePage={activePage}
        onNavigate={handleNavigate}
      />
      <div style={{ flex: 1 }}>{renderPage()}</div>
      <Footer />
    </div>
  );
}
