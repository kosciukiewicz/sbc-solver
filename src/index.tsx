import * as React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import App from "./views/App";

document.addEventListener("DOMContentLoaded", function () {
  let rootElement = document.getElementById("root");
  rootElement = document.createElement("div");
  rootElement.id = "react-chrome-app";
  document.body.appendChild(rootElement);
  const root = ReactDOM.createRoot(
    document.getElementById("react-chrome-app") as HTMLElement,
  );
  root.render(
    <React.Fragment>
      <App />
    </React.Fragment>,
  );
});
