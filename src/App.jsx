import HomePage from './pages/HomePage';
import FloatingLines from './components/FloatingLines';
import Navbar from './components/Navbar.jsx';
import './App.css'

function App() {
  return (
    <div className="app-container">
      <FloatingLines />

      <div className="content-layer">
        <Navbar />
        <HomePage />
      </div>
    </div>
  );
}

export default App;
