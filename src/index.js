import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App";
import Edit from "./components/edit/edit";
import Tabel from "./components/tabel/tabel";
import Input from "./components/input/input";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Tabel /> },
      {
        path: "edit/:editId",
        element: <Edit />,
      },
      {
        path: "input",
        element: <Input />
      }
    ],
  }
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);