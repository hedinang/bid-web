import AuthApi from "./authApi";
import BidApi from "./bidApi";
import ItemApi from "./ItemApi";
import UserApi from "./userApi";

const apiFactory = {
  authApi: new AuthApi(),
  userApi: new UserApi(),
  bidApi: new BidApi(),
  itemApi: new ItemApi(),
};

export default apiFactory;
