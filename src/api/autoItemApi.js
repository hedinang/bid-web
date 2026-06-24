import {AUTO_ITEM} from "./apiConstant";
import BaseApi from "./baseApi";

class AutoItemApi extends BaseApi {
  importCSV(request) {
    return this.post("secure" + AUTO_ITEM + "import", request);
  }

  list(param) {
    return this.post("secure" + AUTO_ITEM + "list", param);
  }

  deleteItem(param) {
    return this.post("secure" + AUTO_ITEM + `delete/${param}`, param);
  }

  deleteAll(param) {
    return this.post("secure" + AUTO_ITEM + `delete/all`);
  }

  edit(param) {
    return this.post("secure" + AUTO_ITEM + "edit", param);
  }

  checkScan() {
    return this.get("secure" + AUTO_ITEM + "check-scan");
  }

  scan(param) {
    return this.post("secure" + AUTO_ITEM + "scan", param);
  }

  stopScan() {
    return this.post("secure" + AUTO_ITEM + "stop-scan");
  }
}

export default AutoItemApi;
