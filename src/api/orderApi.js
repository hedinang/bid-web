import {ORDER} from "./apiConstant";
import BaseApi from "./baseApi";

class OrderApi extends BaseApi {
  list(payload) {
    return this.post("secure" + ORDER + "order-list", payload);
  }

  addToCard(payload) {
    return this.post("secure" + ORDER + "store", payload);
  }

  changeStatus(payload) {
    return this.post("secure" + ORDER + "change-status", payload);
  }

  changeStatusByOrderDate(payload) {
    return this.post("secure" + ORDER + "order-date/change-status", payload);
  }

  changeStatusByItemDate(payload) {
    return this.post("secure" + ORDER + "item-date/change-status", payload);
  }
}

export default OrderApi;
