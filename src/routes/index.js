/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicLayout } from "../components/layouts/PublicLayout";
import { BidList } from "../pages/bid/BidList";
import { ItemList } from "../pages/item/ItemList";
import { AdminBidList } from "../pages/bid/AdminBidList";
import { AdminItemList } from "../pages/item/AdminItemList";
import { AdminItemDetail } from "../pages/item/AdminItemDetail";
import { ItemDetail } from "../pages/item/ItemDetail";

const router = createBrowserRouter([
  // {
  //   path: "login",
  //   element: <Login />,
  // },
  // {
  //   path: "register",
  //   element: <Registration />,
  // },
  {
    path: "*",
    element: <Navigate to="/bid-list" />,
  },
  {
    // path: "/",
    element: <PublicLayout />,
    children: [
      {
        path: "/bid-list",
        element: <BidList />,
      },
      {
        path: "/admin/bid-list",
        element: <AdminBidList />,
      },
      {
        path: "/admin/item-list/:bidId/:bidStatus",
        element: <AdminItemList />,
      },
      {
        path: "/item-list/:bidId/:bidStatus",
        element: <ItemList />,
      },
      {
        path: "/admin/item-detail/:itemId",
        element: <AdminItemDetail />,
      },
      {
        path: "/item-detail/:itemId",
        element: <ItemDetail />,
      },
    ],
  },
]);
export default router;
