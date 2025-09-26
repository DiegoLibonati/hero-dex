import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { HeroesApp } from "@src/HeroesApp";

import "@src/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <HeroesApp />
  </BrowserRouter>
);
