import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { HeroesApp } from "./HeroesApp";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <HeroesApp />
  </BrowserRouter>
);
