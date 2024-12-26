import { ITEM } from "./apiConstant";
import BaseApi from "./baseApi";

class ItemApi extends BaseApi {
  list(bidId) {
    return this.get(`${ITEM}/list/${bidId}`);
  }
}
export default ItemApi;
