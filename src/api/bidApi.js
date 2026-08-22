import BaseApi from "./baseApi";
import {BID, ORDER} from "./apiConstant";

class BidApi extends BaseApi {
  list() {
    return this.get("free" + BID + "list");
  }

  getBid(bid) {
    return this.post("free" + BID + "detail", bid);
  }

  syncBid(payload) {
    return this.post("secure" + BID + "sync", payload);
  }

  stopSyncBid(payload) {
    return this.post("secure" + BID + "stop", payload);
  }

  deleteBid(payload) {
    return this.post("secure" + BID + "delete", payload);
  }

  syncBidList(payload) {
    return this.post("secure" + BID + "store/bid", payload);
  }

  getThreadList() {
    return this.post("secure" + BID + "thread/list");
  }

  deleteLteBid(payload){
    return this.post("secure" + BID + "delete-lte-bid", payload);
  }
}

export default BidApi;
