import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/auth.context.jsx";
import { AppRoutes } from "./routes/AppRoutes.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);
