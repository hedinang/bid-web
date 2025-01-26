import BaseApi from "./baseApi";
import { BID } from "./apiConstant";

class BidApi extends BaseApi {
  list() {
    return this.get(`${BID}/list`);
  }

  getBid(bid) {
    return this.post(`${BID}/detail`, bid);
  }

  syncBid(payload) {
    return this.post(`${BID}/sync`, payload);
  }

  stopSyncBid(payload) {
    return this.post(`${BID}/stop`, payload);
  }

  syncBidList(payload) {
    return this.post(`${BID}/store/bid`, payload);
  }

  getThreadList() {
    return this.post(`${BID}/thread/list`);
  }
}
export default BidApi;
