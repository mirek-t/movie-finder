import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import DetailView from "./DetailView";
import Search from "./Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/movie/:id" element={<DetailView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
