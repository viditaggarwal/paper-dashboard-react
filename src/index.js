import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux';  // Import the Provider component
import { useDispatch, useSelector } from 'react-redux';
import { validate } from './actions/stockActions';
import store from './store';  // Import your Redux store


import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

const App = () => {
  const dispatch = useDispatch();
  const tokenData = useSelector(state => state.data);

  useEffect(() => {
    dispatch(validate());
    console.log('Token data from Redux state:', tokenData);
  }, [dispatch]);

  useEffect(() => {
    console.log('Token data from Redux state:', tokenData);
  }, [tokenData]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLayout />} />
      </Routes>
    </BrowserRouter>
  );
};

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
