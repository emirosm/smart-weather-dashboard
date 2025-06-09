import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppWithTheme } from "./components/layout/AppWithTheme";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import About from './pages/About';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppWithTheme>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </AppWithTheme>
    </QueryClientProvider>
  );
}

export default App;
