import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FormPage from "./pages/FormPage/FormPage";
import ListPage from "./pages/ListPage/ListPage";
import ItemPage from "./pages/ItemPage/ItemPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/item" element={<ItemPage />} />
        <Route path="*" element={<h1>404 - Страница не найдена</h1>} />
      </Routes>
    </Router>
  );
}

export default App
