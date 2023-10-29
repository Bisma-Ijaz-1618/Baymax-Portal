import { Switch, Routes, Route } from "react-router-dom";
import Unauthorized from "./components/Unauthorized";
import AuthRoute from "./routes/auth-route";
import NonAuthRoute from "./routes/non-auth-route";
import "./design.css";
import PersistLogin from "./features/auth/PersistLogin";

const rolesData = {
  Admin: 5150,
  User: 2001,
};
function App() {
  return (
    <Routes>
      <Route path="auth/*" element={<AuthRoute />} />
      <Route path="/*" element={<NonAuthRoute />} />
      <Route path="*" element={<Unauthorized />} />
    </Routes>
  );
}

export default App;
