import React from "react";
import ReactDOM from "react-dom/client";
import "./services/i18n";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <React.Suspense fallback="Loading...">
      <App />
    </React.Suspense>
  </React.StrictMode>
);
