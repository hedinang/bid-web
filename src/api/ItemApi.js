import { ITEM } from "./apiConstant";
import BaseApi from "./baseApi";

class ItemApi extends BaseApi {
  list(request) {
    return this.post(`${ITEM}/public/list`, request);
  }

  getDetail(request) {
    return this.get(`${ITEM}/public/detail/${request}`);
  }
}
export default ItemApi;
