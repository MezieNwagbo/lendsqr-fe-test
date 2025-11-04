import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./features/auth/context/AuthContext";

import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <AuthProvider>
      <Toaster
        toastOptions={{
          duration: 6000,
          success: {
            iconTheme: {
              primary: "#39cdcc",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#e4033b",
              secondary: "#fff",
            },
          },
        }}
      />
      <AppRouter />
    </AuthProvider>
  );
};

export default App;
