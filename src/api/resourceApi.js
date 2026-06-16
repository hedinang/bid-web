import {RESOURCE} from "./apiConstant";
import BaseApi from "./baseApi";

class ResourceApi extends BaseApi {
  constructor() {
    super();
    this.BASE_URL = process.env.REACT_APP_AUTHENTICATION_API_URL || "";
    this.$axiosInstance = this.initAxiosInstance();
  }

  remove(body) {
    return this.post("secure" + RESOURCE + "remove", body);
  }

  uploadChunk(file, resourceRequest, config = {}) {
    const formData = new FormData();

    formData.append("file", file);

    const metadataBlob = new Blob([JSON.stringify(resourceRequest)], {
      type: "application/json",
    });
    formData.append("metadata", metadataBlob);

    return this.post("secure" + RESOURCE + "upload-chunk", formData, {
      timeout: 100000,
      ...config,
      headers: {
        ...(config.headers || {}),
        "Content-Type": undefined,
      },
    });
  }

  getStreamFileAsBlob(resourceId, onDownloadProgress, signal, headers = {}) {
    return this.get("secure" + RESOURCE + `file/${resourceId}`, null, {
      responseType: "blob",
      onDownloadProgress,
      signal,
      headers,
    });
  }
}

export default ResourceApi;
