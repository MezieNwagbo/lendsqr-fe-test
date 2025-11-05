import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "../pages/login/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import UserDetails from "../pages/userDetails/UserDetails";

import { isAuthenticated } from "../utils/auth";
import AppLayout from "../layout/appLayout/AppLayout";

const AppRouter = () => {
  const isAuth = isAuthenticated();

  return (
    <Router>
      <Routes>
        {/* Redirect root to login if not authenticated */}
        <Route
          path="/"
          element={
            isAuth ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        <Route path="/login" element={<Login />} />

        {isAuth && (
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetails />} />
          </Route>
        )}

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
