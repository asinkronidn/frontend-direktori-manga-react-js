import { Outlet } from "react-router-dom";
import "./App.css"
import Heading from "./components/header/header";

function App() {

  return (
    <div className="app">
      <Heading />
      <Outlet />
    </div>
  );
}

export default App;
