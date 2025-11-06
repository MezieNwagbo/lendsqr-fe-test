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
import NotAvailable from "../pages/notAvailable/NotAvailable";
import { isAuthenticated } from "../utils/auth";
import AppLayout from "../layout/appLayout/AppLayout";
import { sidebarData } from "../data/sidebarData";

const AppRouter = () => {
  const isAuth = isAuthenticated();

  // Flatten all sidebar routes into one array
  const allSidebarRoutes = sidebarData.flatMap(
    (section) =>
      section.children?.map((item) => item.route).filter(Boolean) || []
  );

  // Define implemented routes
  const implementedRoutes = ["/users", "/users/:id"];

  return (
    <Router>
      <Routes>
        {/* Redirect root to login or dashboard */}
        <Route
          path="/"
          element={isAuth ? <Navigate to="/users" /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<Login />} />

        {isAuth && (
          <Route element={<AppLayout />}>
            {/* Implemented routes */}
            <Route path="/dashboard" element={<NotAvailable />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<UserDetails />} />

            {/* All other sidebar routes -> FeatureNotAvailable */}
            {allSidebarRoutes.map(
              (path) =>
                !implementedRoutes.includes(path!) && (
                  <Route key={path} path={path!} element={<NotAvailable />} />
                )
            )}
          </Route>
        )}

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
