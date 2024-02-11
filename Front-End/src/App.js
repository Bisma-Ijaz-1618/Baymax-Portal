import { BrowserRouter, Routes, Route } from "react-router-dom";
import Unauthorized from "./components/Unauthorized";
import AuthRoute from "./routes/auth-route";
import NonAuthRoute from "./routes/non-auth-route";
import "./design.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="auth/*" element={<AuthRoute />} />
        <Route path="/*" element={<NonAuthRoute />} />
        <Route path="*" element={<Unauthorized />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
