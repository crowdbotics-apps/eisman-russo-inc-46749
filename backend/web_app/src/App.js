import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoPage from "./pages/noPage";
import Home from "./pages/home/home";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
   <Router>
    <Routes>
      <Route index element={<NoPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
   </Router>
  );
}

export default App;
