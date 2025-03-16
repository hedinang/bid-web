import { ORDER } from "./apiConstant";
import BaseApi from "./baseApi";

class OrderApi extends BaseApi {
  list() {
    return this.get(`${ORDER}/order-list`);
  }

  getBid(bid) {
    return this.post(`${ORDER}/public/detail`, bid);
  }

  addToCard(payload) {
    return this.post(`${ORDER}/store`, payload);
  }
}
export default OrderApi;
