import AuthApi from "./authApi";
import BidApi from "./bidApi";
import ItemApi from "./ItemApi";
import MailApi from "./mailApi";
import OrderApi from "./orderApi";
import UserApi from "./userApi";
import ResourceApi from "./resourceApi";
import AutoItemApi from "./autoItemApi";

const apiFactory = {
  authApi: new AuthApi(),
  userApi: new UserApi(),
  bidApi: new BidApi(),
  itemApi: new ItemApi(),
  autoItemApi: new AutoItemApi(),
  orderApi: new OrderApi(),
  mailApi: new MailApi(),
  resourceApi: new ResourceApi(),
};

export default apiFactory;
