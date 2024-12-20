/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/login";
import { Registration } from "../pages/registration/Registration";
import { BidList } from "../pages/bid/BidList";
import { ItemList } from "../pages/item/ItemList";
import { ItemDetail } from "../pages/item/ItemDetail";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Registration />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
  {
    path: "bid-list",
    element: <BidList />,
  },
  {
    path: "item-list/:bidId",
    element: <ItemList />,
  },
  // {
  //   path: "item-detail",
  //   element: <ItemDetail />,
  // },
]);
export default router;
