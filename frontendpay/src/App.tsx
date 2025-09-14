import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Signin } from "../../frontendpay/src/pages/Signin";
import { Signup } from "../../frontendpay/src/pages/Signup";
import { Dashboard } from "../../frontendpay/src/pages/Dashboard";
import { SendMoneyPage } from "./pages/SendMoneyPage";

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
        <Route path="/send" element={<SendMoneyPage />} />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
