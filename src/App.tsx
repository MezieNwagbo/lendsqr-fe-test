import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./features/auth/context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
