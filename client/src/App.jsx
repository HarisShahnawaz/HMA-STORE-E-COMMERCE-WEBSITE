import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/header'; 
import Footer from './components/Layout/footer';
import Home from './Pages/Home';
import Men from './Pages/Men';
import Women from './Pages/Women';
import Kids from './Pages/Kids';
import Cart from './Pages/Cart';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        {/* The Routes component decides WHICH page to show. 
            Everything inside it swaps. Everything outside it stays. */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/men" element={<Men />} />
            <Route path="/women" element={<Women />} />
            <Route path="/kids" element={<Kids />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;