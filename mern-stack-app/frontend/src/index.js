import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WorkoutContextProvider } from "./context/workoutContext";
import { AuthContext } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContext.Provider>
      <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </AuthContext.Provider>
  </React.StrictMode>
);
