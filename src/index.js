import React from "react";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { initWidget } from "./lib/widget";
import { ToastContainer } from "react-toastify";
import { SecurityContext } from "./utils/droppable";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import "./styles/variables.css";
import WidgetLifecycle from "./WidgetLifecycle";

// Dynamically set Webpack's public path if `widget` is available
if (window.widget && window.widget.uwaUrl) {
  const path = window.widget.uwaUrl.substring(
    0,
    window.widget.uwaUrl.lastIndexOf("/") + 1
  );
  if (path) {
    __webpack_public_path__ = path;
  } else {
    console.error("Invalid uwaUrl format:", window.widget.uwaUrl);
  }
} else {
  console.error("uwaUrl is missing. Using default './' as public path.");
  __webpack_public_path__ = "./";
}
let root; // Declare a global variable for the React root
function start(widget) { 
  let rootElement =
    window.widget?.body?.querySelector("#root") ||
    document.getElementById("root");
  if (!rootElement) {
    console.warn("Root element not found. Creating dynamically...");
    if (window.widget && window.widget.body) {
      // Use widget's body if available
      rootElement = document.createElement("div");
      rootElement.id = "root";
      widget.body.appendChild(rootElement);
    } else {
      // Fallback to document body
      rootElement = document.createElement("div");
      rootElement.id = "root";
      document.body.appendChild(rootElement);
    }
  }
  if (!root) {
    root = ReactDOM.createRoot(rootElement);
  } else {
  }

  root.render(
    <>
    <h1>Hello world</h1>
      <WidgetLifecycle>
        {/* <RevisionFloat /> */}
      </WidgetLifecycle>
      {/* Pass setter to App */}
      <ToastContainer />
    </>
  );
}

export async function initializeWidget() {
  const response = await SecurityContext();
  const securitycontext = response.securitycontextpreference;
  const email = response.email;

  initWidget(
    (widget) => {
      widget.setTitle("");
      // const widgetId = widget.id;
      // console.log("widgetId", widgetId);
      if (process.env.NODE_ENV !== "development") {
        widget.addPreference(securitycontext);
        widget.setValue("email", email);
      }
      widget.addEvent("onLoad", () => {
        start();
      });  
    }, (error) => {
      console.error("Widget initialization failed:", error);
    }
  );
}

// Dynamically import setupMocks.js in development mode
if (process.env.NODE_ENV === "development") {
  require("./setupMocks");
  initializeWidget();
} else {
  // Dynamically wait for WidgetContainer's handleDrop in production
  initializeWidget();
}
