/* eslint-disable react/react-in-jsx-scope */
import {createBrowserRouter, Navigate} from "react-router-dom";
import {PublicLayout} from "../components/layouts/PublicLayout";
import {ItemProvider} from "../context/ItemContext";
import {BidList} from "../pages/bid/BidList";
import {OrderList} from "../pages/cart/OrderList";
import {AdminItemDetail} from "../pages/item/AdminItemDetail";
import {AdminItemList} from "../pages/item/AdminItemList";
import {MailManagement} from "../pages/mail/MailManagement";
import {UserManagement} from "../pages/user/UserManagement";
import {AutoItemList} from "../pages/item/AutoItemList";
import {Tool} from "../pages/tool/Tool";
import {CategoryList} from "../pages/bid/CategoryList";
import {ItemCategoryList} from "../pages/category/ItemCategoryList";
import {CategoryProvider} from "../context/CategoryContext";

const router = createBrowserRouter([
  {
    path: "*", element: <Navigate to="/"/>,
  },
  {
    element: <PublicLayout/>, children: [
      {
        path: "/", element: <BidList/>,
      },
      {
        path: "/item-category-list/:category", element: <CategoryProvider>
          <ItemCategoryList/>
        </CategoryProvider>,
      },
      {
        path: "/item-list/:bidId/:bidStatus", element: (<ItemProvider>
          <AdminItemList/>
        </ItemProvider>),
      },
      {
        path: "/tool", element: (<Tool/>),
      },
      {
        path: "/category",
        element: <CategoryList/>,
      },
      {
        path: "/item-detail/:itemId", element: (<ItemProvider>
          <AdminItemDetail/>
        </ItemProvider>),
      },
      {
        path: "/user-list", element: (<ItemProvider>
          <UserManagement/>
        </ItemProvider>),
      },
      {
        path: "/mail-list", element: (<ItemProvider>
          <MailManagement/>
        </ItemProvider>),
      },
      {
        path: "/cart", element: (<ItemProvider>
          <OrderList/>
        </ItemProvider>),
      },
      {
        path: "/auto-item", element: (<AutoItemList/>),
      }
    ],
  },]);
export default router;
