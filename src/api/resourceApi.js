import axios from "axios";
import Cookies from "js-cookie";
import {RESOURCE} from "./apiConstant";
import BaseApi from "./baseApi";

class ResourceApi extends BaseApi {
  constructor() {
    super();
    this.BASE_URL = process.env.REACT_APP_AUTHENTICATION_API_URL || "";
    this.$axiosInstance = this.initAxiosInstance();
  }

  getFile(url, onDownloadProgress, signal) {
    return axios.get(`${url}?token=${Cookies.get("access_token")}`, {
      responseType: "blob",
      onDownloadProgress: onDownloadProgress,
      signal,
    });
  }

  getFreeFile(url, onDownloadProgress, signal) {
    return axios.get(url, {
      responseType: "blob",
      onDownloadProgress: onDownloadProgress,
      signal,
    });
  }

  remove(body) {
    return this.post(`${RESOURCE}/remove`, body);
  }

  uploadChunk(file, resourceRequest, config = {}) {
    const formData = new FormData();

    formData.append("file", file);

    const metadataBlob = new Blob([JSON.stringify(resourceRequest)], {
      type: "application/json",
    });
    formData.append("metadata", metadataBlob);

    return this.post(`${RESOURCE}/upload-chunk`, formData, {
      timeout: 100000,
      ...config,
      headers: {
        ...(config.headers || {}),
        "Content-Type": undefined,
      },
    });
  }

  getStreamFileAsBlob(resourceId, onDownloadProgress, signal, headers = {}) {
    return this.get(`${RESOURCE}/file/${resourceId}`, null, {
      responseType: "blob",
      onDownloadProgress,
      signal,
      headers,
    });
  }

  getVideoTicket(resourceId, signal) {
    return this.get(`${RESOURCE}/video/ticket/${resourceId}`, null, {
      signal,
    });
  }

  downloadFile(resourceId, onDownloadProgress, signal, headers = {}) {
    return this.get(`${RESOURCE}/file/download/${resourceId}`, null, {
      responseType: "blob",
      onDownloadProgress,
      signal,
      headers,
      returnFullResponse: true,
    });
  }

  downloadZipFile(resourceId, onDownloadProgress, signal, headers = {}) {
    return this.get(`${RESOURCE}/zip/download/${resourceId}`, null, {
      responseType: "blob",
      onDownloadProgress,
      signal,
      headers,
      returnFullResponse: true,
    });
  }

  getResourcesPanel(conversationId) {
    return this.get(`${RESOURCE}/panel/${conversationId}`);
  }

  getResourcesArchiveType(body) {
    return this.post(`${RESOURCE}/panel/archive`, body);
  }

  getResourcesHistory(body) {
    return this.post(`${RESOURCE}/history/viewer`, body);
  }

  getStorage(body) {
    return this.post(`${RESOURCE}/storage`, body);
  }

  deleteStorage(body) {
    return this.post(`${RESOURCE}/storage/delete`, body);
  }

  getActContentType() {
    return this.get(`${RESOURCE}/get-content-type`);
  }

  prepareZip(resourceIds) {
    return this.post(`${RESOURCE}/zip/prepare`, {resourceIds});
  }

  deletePhysicalFilesByDateRange(body) {
    return this.post(`${RESOURCE}/delete-physical-files`, body);
  }
}

export default ResourceApi;
