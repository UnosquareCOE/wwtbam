import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/index.ts";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <AuthContext.AuthProvider>
      <App />
    </AuthContext.AuthProvider>
  </BrowserRouter>
);
