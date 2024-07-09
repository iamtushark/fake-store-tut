import { useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import logo from "./logo.svg";
import RouteManager from "./routes/RouteManager";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <RouteManager />
      <ToastContainer />
    </>
  );
};

export default App;
