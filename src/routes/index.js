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
import { ItemProvider } from "../context/ItemContext";

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
        path: "/admin/bid-list",
        element: <AdminBidList />,
      },
      {
        path: "/admin/item-list/:bidId/:bidStatus",
        element: (
          <ItemProvider>
            <AdminItemList />
          </ItemProvider>
        ),
      },
      {
        path: "/admin/item-detail/:itemId",
        element: (
          <ItemProvider>
            <AdminItemDetail />
          </ItemProvider>
        ),
      },

      {
        path: "/bid-list",
        element: <BidList />,
      },
      {
        path: "/item-list/:bidId/:bidStatus",
        element: (
          <ItemProvider>
            <ItemList />
          </ItemProvider>
        ),
      },
      {
        path: "/item-detail/:itemId",
        element: (
          <ItemProvider>
            <ItemDetail />
          </ItemProvider>
        ),
      },
    ],
  },
]);
export default router;
