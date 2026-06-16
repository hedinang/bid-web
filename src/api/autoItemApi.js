import {AUTO_ITEM, MAIL} from "./apiConstant";
import BaseApi from "./baseApi";

class AutoItemApi extends BaseApi {
  importCSV(request) {
    return this.post("secure" + AUTO_ITEM + "import", request);
  }

  list(param) {
    return this.post("secure" + AUTO_ITEM + "list", param);
  }
}

export default AutoItemApi;
