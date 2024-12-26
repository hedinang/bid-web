import BaseApi from "./baseApi";
import { BID } from "./apiConstant";

class BidApi extends BaseApi {
  list() {
    return this.get(`${BID}/list`);
  }

  getBid(bidId) {
    return this.get(`${BID}/${bidId}`);
  }
}
export default BidApi;
