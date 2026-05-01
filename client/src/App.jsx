import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/header/Header'; // Path to your new folder
// Import your pages (create empty ones for now if you haven't)
const Home = () => <div className="p-20 text-center font-sans">Home Page Content</div>;
const Men = () => <div className="p-20 text-center font-sans">Men's Collection</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        {/* The Header is OUTSIDE of Routes so it stays visible everywhere */}
        <Header /> 

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<div className="p-20 text-center">Women's Collection</div>} />
            <Route path="/kids" element={<div className="p-20 text-center">Kids' Collection</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
