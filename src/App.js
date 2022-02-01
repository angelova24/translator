import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/LoginPage";
import Profile from "./views/ProfilePage";
import Translator from "./views/TranslationPage";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/translator" element={<Translator />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
