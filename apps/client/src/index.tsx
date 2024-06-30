import "../config/instrument";
import React from "react"
import { createRoot } from "react-dom/client";
import { BrowserRouter } from 'react-router-dom';

import App from "./App";

const rootElement = document.querySelector("#root");
if (!rootElement) throw new Error("Root element not found");
const root = createRoot(rootElement);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);