import { Routes, Route } from "react-router-dom";
import Home     from "./pages/Home";
import Backtest from "./pages/Backtest";
import Results  from "./pages/Results";
import Navbar   from "./components/ui/Navbar";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <Navbar />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/backtest" element={<Backtest />} />
        <Route path="/results"  element={<Results />} />
      </Routes>
    </div>
  );
}
