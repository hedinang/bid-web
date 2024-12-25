import { ITEM } from "./apiConstant";
import BaseApi from "./baseApi";

class ItemApi extends BaseApi {
  list() {
    return this.get(`${ITEM}/list`);
  }
}
export default ItemApi;
