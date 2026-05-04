import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Fixed lowercase imports to match your actual files
import { Header } from './components/Layout/header'; 
import { Hero } from './components/Home/hero';
import { Categories } from './components/Home/categories';
import { Featured } from './components/Home/featured';
import { About } from './components/Home/about';
import { Contact } from './components/Home/contact';
import AIFeatures from './components/Home/ai-featured';
import Footer from './components/Layout/footer';

const Home = () => (
  <main>
    <Hero />
    <Categories />
    <Featured />
    <About />
    <Contact />
    <AIFeatures />
    {/* Usually Footer stays outside <main> so it shows on all pages, 
        but keeping it here as per your request */}
    <Footer />
  </main>
);

const Men = () => <div className="p-20 text-center font-sans">Men's Collection</div>;

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<div className="p-20 text-center">Women's Collection</div>} />
          <Route path="/kids" element={<div className="p-20 text-center">Kids' Collection</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;