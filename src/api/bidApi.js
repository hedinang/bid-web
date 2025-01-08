import BaseApi from "./baseApi";
import { BID } from "./apiConstant";

class BidApi extends BaseApi {
  list() {
    return this.get(`${BID}/list`);
  }

  getBid(bid) {
    return this.post(`${BID}/detail`, bid);
  }
}
export default BidApi;
