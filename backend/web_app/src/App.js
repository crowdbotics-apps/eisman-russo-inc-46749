import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoPage from "./pages/noPage";
import Home from "./pages/home/home";
import "bootstrap/dist/css/bootstrap.min.css";
import AnimateAuth from "./containers/auth/signInContainer";
import PublicOnlyRoute from "./components/routesWrapper/publicOnlyRoute";

function App() {
  return (
   <Router>
    <Routes>
      <Route index element={<NoPage />} />
      
        <Route path="signin">
        <Route index element={<PublicOnlyRoute Page={AnimateAuth} />} />
        </Route>
      


    </Routes>
   </Router>
  );
}

export default App;
