import {Outlet} from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

function App() {

  return (

    <>
      <ToastContainer />
      <Navigation />
      <main className="bg-opacity-0 outline-none">
        <Outlet className=""/>
      </main>
    </>
  );
}

export default App;
