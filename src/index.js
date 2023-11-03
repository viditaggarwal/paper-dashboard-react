import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  useEffect(() => {
    const smSession = Cookies.get('smSession');
    console.log('smSession cookie:', smSession);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

root.render(<App />);

