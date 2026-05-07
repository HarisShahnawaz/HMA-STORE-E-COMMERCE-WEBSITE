import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/header'; 
import Footer from './components/Layout/footer';
import Home from './Pages/Home';
import Men from './Pages/Men';
import Women from './Pages/Women';
import Kids from './Pages/Kids';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Women />} />
          <Route path="/kids" element={<Kids />} />
          {/* Add these so the links don't crash the router */}
          <Route path="/about" element={<div className="pt-40 text-center">About Page</div>} />
          <Route path="/contact" element={<div className="pt-40 text-center">Contact Page</div>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;