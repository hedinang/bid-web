import { ITEM } from "./apiConstant";
import BaseApi from "./baseApi";

class ItemApi extends BaseApi {
  list(request) {
    return this.post(`${ITEM}/list`, request);
  }
}
export default ItemApi;
