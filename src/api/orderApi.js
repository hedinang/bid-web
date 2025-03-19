import { ORDER } from "./apiConstant";
import BaseApi from "./baseApi";

class OrderApi extends BaseApi {
  list(payload) {
    return this.post(`${ORDER}/order-list`, payload);
  }

  getBid(bid) {
    return this.post(`${ORDER}/public/detail`, bid);
  }

  addToCard(payload) {
    return this.post(`${ORDER}/store`, payload);
  }
}
export default OrderApi;
