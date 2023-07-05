import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import Template from "./Auth/Template";
import Auth from "./Auth/Auth";
import AppOutlet from "./AppOutlet";
import App from "./App";
import OrderPage from "./Pages/OrderPage";
import ContactPage from "./Pages/ConatctPage";
import reportWebVitals from "./reportWebVitals";
import FoodItemsContextProvider from "./store/food-context";
import OrderItemsContextProvider from "./store/order-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <FoodItemsContextProvider>
    <OrderItemsContextProvider>
      <BrowserRouter>
        <React.StrictMode>
          <Routes>
            <Route path="/" element={<Template />}>
              <Route index element={<Auth />} />
            </Route>
            <Route path="/app" element={<AppOutlet />}>
              <Route index element={<App />} />
              <Route path="order" element={<OrderPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </React.StrictMode>
      </BrowserRouter>
    </OrderItemsContextProvider>
  </FoodItemsContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
