import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SidebarProvider } from "./context/SidebarContext.tsx";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </StrictMode>
);
