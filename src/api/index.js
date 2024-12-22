import AuthApi from "./authApi";
import BidApi from "./bidApi";
import UserApi from "./userApi";

const apiFactory = {
  authApi: new AuthApi(),
  userApi: new UserApi(),
  bidApi: new BidApi(),
};

export default apiFactory;
