import "./App.css";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import Memegenerator from "../src/components/Memegenerator";

function App() {
  return (
    <div className="meme-app">
      <Header />
      <Memegenerator />
      <Footer />
    </div>
  );
}

export default App;
