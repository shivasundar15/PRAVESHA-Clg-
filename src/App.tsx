import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Events from './components/Events';
import Coordinators from './components/Coordinators';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background layers */}
      <div className="bg-grid" />
      <div className="bg-glow-red" />
      <div className="bg-glow-blue" />

      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <About />
        <Events />
        <Coordinators />
      </main>
      <Footer />
    </div>
  );
}

export default App;
