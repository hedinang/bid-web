import BaseApi from "./baseApi";
import { USER } from "./apiConstant";

class UserApi extends BaseApi {
  getMe() {
    return this.get(`${USER}/getMe`);
  }

  logout() {
    return this.get(`${USER}/logout`);
  }

  listPerson(param) {
    return this.post(`${USER}/list`, param);
  }

  getByEmail(param) {
    return this.post(`${USER}/find`, param);
  }
  upload(file) {
    return this.post(`${USER}/upload`, file);
  }

  saveMe(param) {
    return this.post(`${USER}/save-me`, param);
  }

  storeUser(param) {
    return this.post(`${USER}/store-user`, param);
  }

  resetPassword(param) {
    return this.post(`${USER}/reset-password/${param}`);
  }
}
export default UserApi;
