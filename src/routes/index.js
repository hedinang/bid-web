/* eslint-disable react/react-in-jsx-scope */
import { createBrowserRouter, Navigate } from "react-router-dom";
import { PublicLayout } from "../components/layouts/PublicLayout";
import { ItemProvider } from "../context/ItemContext";
import { BidList } from "../pages/bid/BidList";
import { OrderList } from "../pages/cart/OrderList";
import { AdminItemDetail } from "../pages/item/AdminItemDetail";
import { AdminItemList } from "../pages/item/AdminItemList";
import Login from "../pages/login";
import { MailManagement } from "../pages/mail/MailManagement";
import { UserManagement } from "../pages/user/UserManagement";

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
        path: "/item-list/:bidId/:bidStatus",
        element: (
          <ItemProvider>
            <AdminItemList />
          </ItemProvider>
        ),
      },
      {
        path: "/item-detail/:itemId",
        element: (
          <ItemProvider>
            <AdminItemDetail />
          </ItemProvider>
        ),
      },
      {
        path: "/user-list",
        element: (
          <ItemProvider>
            <UserManagement />
          </ItemProvider>
        ),
      },
      {
        path: "/mail-list",
        element: (
          <ItemProvider>
            <MailManagement />
          </ItemProvider>
        ),
      },
      {
        path: "/cart",
        element: (
          <ItemProvider>
            <OrderList />
          </ItemProvider>
        ),
      },
    ],
  },
]);
export default router;
