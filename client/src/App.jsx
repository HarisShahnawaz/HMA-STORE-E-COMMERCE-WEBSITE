import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/header/Header';
import { Hero } from './components/hero/hero';
import { Categories } from './components/categories/categories';
import { Featured } from './components/featured/featured';
import { About } from './components/about/about';
const Home = () => (
  <main>
    <Hero />
    <Categories />
    <Featured />
    <About />
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