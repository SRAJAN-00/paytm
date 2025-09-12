import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route redirects to signin */}
        <Route path="/" element={<Navigate to="/signin" replace />} />

        {/* Auth routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
