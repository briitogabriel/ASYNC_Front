import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./contexts/auth.context.jsx";
import { AppRoutes } from "./routes/AppRoutes.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "react-bootstrap-typeahead/css/Typeahead.css"; 
import { GlobalStyle } from "./global.style.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle />
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>
);
