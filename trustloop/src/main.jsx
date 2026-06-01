import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import "./styles/globals.css";
import "./styles/animations.css";
import "./styles/scrollbar.css";

import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { LendingProvider } from "./context/LendingContext";
import { TrustProvider } from "./context/TrustContext";

// Unregister any service workers (helps during local dev when ports/styles change)
if (typeof window !== "undefined" && "navigator" in window && navigator.serviceWorker) {
  navigator.serviceWorker.getRegistrations().then((regs) => {
    regs.forEach((r) => {
      try {
        r.unregister();
        // eslint-disable-next-line no-console
        console.log("Unregistered service worker:", r);
      } catch (e) {
        // ignore
      }
    });
  }).catch(()=>{});
}

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TrustProvider>
          <LendingProvider>
            <App />
          </LendingProvider>
        </TrustProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);