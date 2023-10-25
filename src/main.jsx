import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/auth.context.jsx";
import { AppRoutes } from "./routes/AppRoutes.jsx";
import { GlobalStyle } from "./global.style.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle />
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);
