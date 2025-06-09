import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <main className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
