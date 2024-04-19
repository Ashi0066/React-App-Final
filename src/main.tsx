import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NextUIProvider className="h-[100vh]">
      <div className="h-full">
      <main className="light text-foreground bg-background h-full">
        <App />
      </main>
      </div>
    </NextUIProvider>
  </React.StrictMode>
);
