import {
  CloseOutlined,
  DeleteOutlined,
  PauseOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import { Progress, Tooltip } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IoMdDownload } from "react-icons/io";
import apiFactory from "../../api";
import {
  MESSAGE_STATUS,
  SupportTypeExtensionOfficeFile,
} from "../../config/Constant";
import { useChatContext } from "../../context/ChatContext";
import { useMenuContext } from "../../context/MenuContext";
import { useFakeMessageStore } from "../../store/FakeMessageStore";
import { useUploadFileStore } from "../../store/UploadFileStore";
import { useInfoUser } from "../../store/UserStore";
import { getFileIcon } from "../../utils/SendFile";
import { openNotificationError, standardizeVolume } from "../../utils/Utils";
import { useGlobalDownloader } from "../../context/global/DownloadProvider";
import FilePreviewModal from "../modal/FilePreviewModal";
import { PreviewOfficeModal } from "../modal/PreviewOfficeFile/PreviewOfficeModal";
import { useSendingContext } from "../../context/global/SendingProvider";

const fileStore = process.env.REACT_APP_FILE_STORE || "http://10.1.1.230:8000";

// Danh sách các đuôi file văn phòng hỗ trợ preview
const PreviewFile = ({
                       requestUuid,
                       content,
                       file,
                       contentType,
                       percentProgress,
                       totalVolume,
                       path = "conversation",
                       isPinned = false,
                       isInPanel = false,
                       cancelUpload,
                     }) => {
  const { selectedConversation } = useMenuContext() || {};
  const { setMessageList } = useChatContext() || {};

  const { completeMessage, completeFile } = useSendingContext();

  const { fakeConversationMessages, setFakeConversationMessages } =
      useFakeMessageStore((state) => state);
  const { languageMap } = useInfoUser();
  const {
    setUploadFiles,
    setUploadFilesTask,
    setUploadFilesComment,
    setUploadFilesReply,
    // cancelUpload,
  } = useUploadFileStore();

  const [isOpenMediaPreview, setIsOpenMediaPreview] = useState(false);
  const [isOpenOfficePreview, setIsOpenOfficePreview] = useState(false);

  const [urlPreview, setUrlPreview] = useState(null);
  const [resourceId, setResourceId] = useState(null);

  const {
    downloads,
    startDownload,
    pauseDownload,
    resumeDownload,
    cancelDownload,
    DOWNLOAD_STATUS,
  } = useGlobalDownloader();

  const [fileState, setFileState] = useState({});
  const fileNameToSave = file?.fileName || "Willo-video";
  const extensions = file?.originalName
      ?.substring(file?.originalName?.lastIndexOf(".") + 1)
      ?.toLowerCase();

  const isSupportPreview =
      SupportTypeExtensionOfficeFile.excelTypes.includes(extensions) ||
      SupportTypeExtensionOfficeFile.documentTypes.includes(extensions) ||
      SupportTypeExtensionOfficeFile.textTypes.includes(extensions);

  const handleResumeDownload = (e) => {
    e.stopPropagation();
    resumeDownload(file?.resourceId, file?.originalName);
  };

  const handlePauseDownload = (e) => {
    e.stopPropagation();
    pauseDownload(file?.resourceId);
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    startDownload(file?.resourceId, fileNameToSave, 0);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    cancelDownload(file?.resourceId);
  };

  const progressRate = useMemo(() => {
    return (
        <div className="text-[grey] text-[10px] flex gap-[2px]">
          <div>
            {fileState?.progress
                ? standardizeVolume((fileState?.progress * file?.volume) / 100)
                : 0}
          </div>
          <div>/</div>
          <div>{standardizeVolume(file?.volume)}</div>
        </div>
    );
  }, [fileState?.progress]);

  const renderDownloadButton = useCallback(() => {
    switch (fileState?.status) {
      case DOWNLOAD_STATUS.PAUSED:
        return (
            <div className="flex gap-2">
              <button onClick={handleResumeDownload}>
                <PlayCircleOutlined
                    style={{ fontSize: "20px", color: "green" }}
                />
              </button>
              <button onClick={handleCancel}>
                <CloseOutlined style={{ fontSize: "20px", color: "red" }} />
              </button>
            </div>
        );
      case DOWNLOAD_STATUS.DOWNLOADING:
        return (
            <div className="flex gap-2">
              <button onClick={handlePauseDownload}>
                <PauseOutlined style={{ fontSize: "20px", color: "red" }} />
              </button>
              <button onClick={handleCancel}>
                <CloseOutlined style={{ fontSize: "20px", color: "red" }} />
              </button>
            </div>
        );
      case DOWNLOAD_STATUS.SUCCESS:
        return (
            <button onClick={handleDownload}>
              <IoMdDownload style={{ fontSize: "20px", color: "#2b9853" }} />
            </button>
        );
      case DOWNLOAD_STATUS.ERROR:
        return (
            <div className="flex gap-2">
              <button onClick={handleCancel}>
                <CloseOutlined style={{ fontSize: "20px", color: "red" }} />
              </button>
            </div>
        );
      default:
        return (
            <button onClick={handleDownload}>
              <IoMdDownload style={{ fontSize: "20px", color: "#2b9853" }} />
            </button>
        );
    }
  }, [fileState?.status, file?.resourceId]);

  const removeFileUpload = (requestUuid) => {
    if (path === "task") {
      const uploadFilesTask = useUploadFileStore.getState().uploadFilesTask;
      const index = uploadFilesTask?.findIndex(
          (f) => f?.requestUuid === requestUuid,
      );

      if (index !== -1) {
        const updatedFilesTask = uploadFilesTask?.filter(
            (f) => f?.requestUuid !== requestUuid,
        );
        setUploadFilesTask(updatedFilesTask);

        if (
            uploadFilesTask?.find((f) => f?.requestUuid === requestUuid)
                ?.isUploading
        ) {
          cancelUpload();
          apiFactory.messageApi.cancelMessage({ requestUuid });
        }
      }
    } else if (path === "comment") {
      const uploadFilesComment =
          useUploadFileStore.getState().uploadFilesComment;
      const index = uploadFilesComment?.findIndex(
          (f) => f?.requestUuid === requestUuid,
      );

      if (index !== -1) {
        const updatedFilesComment = uploadFilesComment?.filter(
            (f) => f?.requestUuid !== requestUuid,
        );
        setUploadFilesComment(updatedFilesComment);

        if (
            uploadFilesComment?.find((f) => f?.requestUuid === requestUuid)
                ?.isUploading
        ) {
          cancelUpload();
          apiFactory.messageApi.cancelMessage({ requestUuid });
        }
      }
    } else if (path === "reply") {
      const uploadFilesReply = useUploadFileStore.getState().uploadFilesReply;
      const index = uploadFilesReply?.findIndex(
          (f) => f?.requestUuid === requestUuid,
      );

      if (index !== -1) {
        const updatedFilesReply = uploadFilesReply?.filter(
            (f) => f?.requestUuid !== requestUuid,
        );
        setUploadFilesReply(updatedFilesReply);

        if (
            uploadFilesReply?.find((f) => f?.requestUuid === requestUuid)
                ?.isUploading
        ) {
          cancelUpload();
          apiFactory.messageApi.cancelMessage({ requestUuid });
        }
      }
    } else {
      // const newFakeMessage = fakeConversationMessages?.filter(
      //   (mes) => mes?.requestUuid !== requestUuid,
      // );
      // setFakeConversationMessages([...newFakeMessage]);

      if (selectedConversation?.type === "NOTIFICATION") {
        setMessageList((prevMessageList) => {
          return prevMessageList?.map((msg) => {
            const requestUuidIndex = msg?.messages?.findIndex(
                (smallMsg) => smallMsg?.requestUuid === requestUuid,
            );
            if (requestUuidIndex !== -1) {
              msg?.messages?.splice(requestUuidIndex, 1);
            }
            return msg;
          });
        });
      } else {
        completeFile(requestUuid);
        completeMessage(selectedConversation?.conversationId, requestUuid);

        setMessageList((prev) => {
          return prev?.filter(
              (message) => message?.requestUuid !== requestUuid,
          );
        });
      }

      const uploadFiles = useUploadFileStore?.getState()?.uploadFiles;
      const index = uploadFiles?.findIndex((f) => f?.uid === requestUuid);

      // if (index !== -1) {
      //   const newUploadFilesV2 = [...(uploadFiles || [])];
      //   newUploadFilesV2?.splice(index, 1);
      //   setUploadFiles(newUploadFilesV2);
      //
      //   if (uploadFiles?.find((f) => f?.uid === requestUuid)?.isUploading) {
      //     cancelUpload();
      //     apiFactory.messageApi.cancelMessage({ requestUuid });
      //   }
      // }
    }
  };

  const subOriginalName = () => {
    const maxLength = 15;
    let newOriginalName;

    if (file?.originalName?.trim()?.length > maxLength + 7) {
      newOriginalName =
          file?.originalName?.slice(0, maxLength) +
          "..." +
          file?.originalName?.slice(-7);
    } else {
      newOriginalName = file?.originalName;
    }

    return newOriginalName?.trim() || "Unknown.file";
  };

  const fileIcon = useMemo(() => {
    return getFileIcon(file?.originalName);
  }, [file?.originalName]);

  const openFilePreviewModal = (e) => {
    e.stopPropagation();
    if (contentType === MESSAGE_STATUS.CHUNK) return;

    const extensions = file?.originalName
        ?.substring(file?.originalName?.lastIndexOf(".") + 1)
        ?.toLowerCase();

    if (!file?.pdfPreviewResourceId) {
      return;
    }

    if (
        SupportTypeExtensionOfficeFile.excelTypes.includes(extensions) ||
        SupportTypeExtensionOfficeFile.documentTypes.includes(extensions) ||
        SupportTypeExtensionOfficeFile.textTypes.includes(extensions)
    ) {
      setResourceId(file?.resourceId);
      setIsOpenOfficePreview(true);
      return;
    }

    const pathUrl = content ?? file?.pathUrl ?? "";

    if (!pathUrl) {
      openNotificationError(
          languageMap?.["preview.error.pathNotFound"] ??
          "Error opening file due to non-existent path",
      );
      return;
    }

    setUrlPreview(
        `${fileStore}/${path}/${selectedConversation?.conversationId}${pathUrl}`,
    );
    setResourceId(file?.resourceId);
    setIsOpenMediaPreview(true); // Bật Modal Media
  };

  // SỬA LỖI 1: Lấy đúng conversationId và extensions cho Modal
  const conversationId = selectedConversation?.conversationId;

  useEffect(() => {
    setFileState(downloads[file?.resourceId]);
  }, [downloads]);

  return (
      <>
        <div
            className={`file-container cursor-pointer ${
                path === "conversation" ? "max-w-[320px]" : "w-full"
            }`}
            onClick={openFilePreviewModal}
        >
          <div
              className={`max-h-[300px] flex flex-row my-1 items-center ${
                  isPinned ? "my-0 ml-[-3px]" : ""
              }`}
          >
            <div style={{ zoom: isPinned && 0.4 }}>{fileIcon}</div>
            <div
                style={{ zoom: isPinned && 0.8 }}
                className="flex flex-col w-full"
            >
              <Tooltip
                  title={file?.originalName}
                  placement="right"
                  mouseEnterDelay={0.2}
              >
                <div className={`pr-[10px] text-[12px]`}>{subOriginalName()}</div>
              </Tooltip>

              {contentType === MESSAGE_STATUS.FILE && (
                  <div
                      className={`flex gap-[10px] justify-between file-info ${
                          isPinned && "hidden"
                      } ${isInPanel ? "me-[38px]" : "me-2"} `}
                  >
                    <div className={`text-[grey] text-[12px] `}>
                  <span className={isSupportPreview ? "volume" : ""}>
                    {file?.volume && standardizeVolume(file?.volume)}
                  </span>
                      {/* Hiển thị dòng "Click to preview" nếu là file có hỗ trợ */}
                      {isSupportPreview &&
                          (file?.pdfPreviewResourceId ? (
                              <span className="preview-text">
                        {languageMap?.["preview.click"] ?? "Click to preview"}
                      </span>
                          ) : (
                              <span className="preview-text">
                        {languageMap?.["no.preview.click"] ??
                            "No preview available"}
                      </span>
                          ))}
                    </div>

                    {renderDownloadButton()}
                  </div>
              )}

              {contentType === MESSAGE_STATUS.CHUNK && (
                  <div className="text-[grey] text-[12px]">
                    {standardizeVolume((percentProgress * totalVolume) / 100)} /
                    {standardizeVolume(totalVolume)}
                  </div>
              )}
            </div>
          </div>

          {contentType === MESSAGE_STATUS.CHUNK && (
              <div className="flex justify-center items-center">
                {percentProgress === 0 ||
                percentProgress === 1 ||
                !percentProgress ? (
                    <div className="progress-container">
                      <div className="progress-bar" />
                    </div>
                ) : (
                    <Progress
                        percent={percentProgress}
                        showInfo={false}
                        strokeColor="#52c41a"
                        size="small"
                    />
                )}
                <DeleteOutlined
                    className="ms-2 text-red-500 text-sm p-1 rounded-full hover:bg-blue-200"
                    onClick={(e) => {
                      e.stopPropagation();
                      cancelUpload(conversationId, requestUuid);
                    }}
                />
              </div>
          )}

          {contentType === MESSAGE_STATUS.FILE &&
              [
                DOWNLOAD_STATUS.DOWNLOADING,
                DOWNLOAD_STATUS.PAUSED,
                DOWNLOAD_STATUS.ERROR,
              ].includes(fileState?.status) && (
                  <div className="flex items-center gap-[2px]">
                    <Progress
                        className="flex-1"
                        percent={fileState?.progress}
                        showInfo={false}
                        strokeColor={
                          fileState?.status === DOWNLOAD_STATUS.ERROR
                              ? "#ff4d4f"
                              : "#52c41a"
                        }
                        size="small"
                    />
                    {progressRate}
                  </div>
              )}
        </div>

        {/* Render Modal Xem Office */}
        {isOpenOfficePreview && (
            <PreviewOfficeModal
                isOpen={isOpenOfficePreview}
                onCancel={() => setIsOpenOfficePreview(false)}
                resourceId={resourceId}
                contextId={conversationId}
                pdfPreviewResourceId={file?.pdfPreviewResourceId}
                fileType={file?.mimeType || extensions}
                extensions={extensions}
            />
        )}
      </>
  );
};

export { PreviewFile };
