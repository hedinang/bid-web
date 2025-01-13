import { ITEM } from "./apiConstant";
import BaseApi from "./baseApi";

class ItemApi extends BaseApi {
  list(request) {
    return this.post(`${ITEM}/list`, request);
  }

  getDetail(request) {
    return this.get(`${ITEM}/detail/${request}`);
  }
}
export default ItemApi;
