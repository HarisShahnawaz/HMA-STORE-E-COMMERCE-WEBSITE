import Hero from '../components/Home/hero';
import Categories from '../components/Home/categories';
import Featured from '../components/Home/featured';
import About from '../components/Home/about';
import Contact from '../components/Home/contact';
import AIFeatures from '../components/Home/ai-featured';

const Home = () => {
  return (
    <>
      <Hero />
      <Categories />
      <Featured />
      <About />
      <Contact />
      <AIFeatures />
    </>
  );
};

export default Home;