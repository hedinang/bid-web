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
import Login from "../pages/login";
import AuthLayout from "../components/layouts/AuthLayout";
import { UserManagement } from "../pages/user/UserManagement";
import { Cart } from "../pages/cart/Cart";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
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
  {
    // path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "/inside/bid/bid-list",
        element: <AdminBidList />,
      },
      {
        path: "/inside/bid/item-list/:bidId/:bidStatus",
        element: (
          <ItemProvider>
            <AdminItemList />
          </ItemProvider>
        ),
      },
      {
        path: "/inside/bid/item-detail/:itemId",
        element: (
          <ItemProvider>
            <AdminItemDetail />
          </ItemProvider>
        ),
      },
      {
        path: "/inside/users",
        element: (
          <ItemProvider>
            <UserManagement />
          </ItemProvider>
        ),
      },
      {
        path: "/cart",
        element: (
          <ItemProvider>
            <Cart />
          </ItemProvider>
        ),
      },
    ],
  },
]);
export default router;
