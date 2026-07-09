import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./context/AuthProvider.jsx";
import { setLocalStorage } from "./utils/localStorage";

// Initialize localStorage only once
if (
  !localStorage.getItem("employees") ||
  !localStorage.getItem("admin")
) {
  setLocalStorage();
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);