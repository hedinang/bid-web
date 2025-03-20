import { FaUserPen } from "react-icons/fa6";
import { IoIosFolder } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";

export const keyMenuItem = {
  DASHBOARD: {
    key: "DASHBOARD",
    name: "Thống kê",
  },
  SONG_LIST: {
    key: "SONG_LIST",
    name: "Danh sách nhạc",
  },
  AUTHOR_LIST: {
    key: "AUTHOR_LIST",
    name: "Danh sách tác giả",
  },
  SALE_LIST: {
    key: "SALE_LIST",
    name: "Danh sách đã bán",
  },
  CATEGORY_LIST: {
    key: "CATEGORY_LIST",
    name: "Danh mục thể loại",
  },
  PRESENT_LIST: {
    key: "PRESENT_LIST",
    name: "Danh sách quà tặng",
  },
  CUSTOMER_LIST: {
    key: "CUSTOMER_LIST",
    name: "Danh sách khách hàng",
  },
  CHAT: {
    key: "CHAT",
    name: "Inbox",
  },
  ADMIN_LIST: {
    key: "ADMIN_LIST",
    name: "Danh sách admin",
  },
  LOG_OUT: {
    key: "LOG_OUT",
    name: "Thoát",
  },
  FUNCTION: {
    key: "FUNCTION",
    name: "Tính năng",
  },
};

export const MESSAGE_STATUS = {
  CREATE_GROUP: "CREATE_GROUP",
  RENAME_GROUP: "RENAME_GROUP",
  NEW_MEMBER: "NEW_MEMBER",
  TEXT: "TEXT",
  IMAGE: "IMAGE",
  FILE: "FILE",
  CHUNK: "CHUNK",
  REMOVE_MEMBER: "REMOVE_MEMBER",
  EXIT_GROUP: "EXIT_GROUP",
  UPDATE_ROLE_ADMIN: "UPDATE_ROLE_ADMIN",
  DELETE_GROUP: "DELETE_GROUP",
  UPDATE_GROUP_AVATAR: "UPDATE_GROUP_AVATAR",
  REMOVE_MESSAGE: "REMOVE_MESSAGE",
  SHARE_MESSAGE: "SHARE_MESSAGE",
  REACTION_MESSAGE: "REACTION_MESSAGE",
  VIDEO: "VIDEO",
  AUDIO: "AUDIO",
  RENAME_PERSONAL_GROUP: "RENAME_PERSONAL_GROUP",
  CREATE_PERSONAL: "CREATE_PERSONAL",
};

export const role = {
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  CUSTOMER: "CUSTOMER",
};
export const FILE_STATUS = {
  PAUSE: "PAUSE",
  READY: "READY",
  CANCEL: "CANCEL",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

export const notificationMessage = {
  setMessage: (userName, newGroupName) => {
    const content = userName + " changed the group name to " + newGroupName;
    return content;
  },

  exitGroup: (userName) => {
    const content = userName + " has left the group";
    return content;
  },
};

export const organizationType = {
  PERSON: "PERSON",
  INSTITUTION: "INSTITUTION",
};

export const conversationType = {
  PERSONAL: "PERSONAL",
  GROUP: "GROUP",
  NOTIFICATION: "NOTIFICATION",
  CREATE_NOTIFICATION: "CREATE_NOTIFICATION",
  CONVERSATION: "CONVERSATION",
  DRAFT: "DRAFT",
};

export const filterConversationByType = {
  PERSONAL: "PERSONAL",
  GROUP: "GROUP",
  UNREAD: "UNREAD",
  NOTIFICATION: "NOTIFICATION",
  ALL: "ALL",
};

export const filterTaskByTime = [
  {
    label: "To day",
    value: "TODAY",
  },
  {
    label: "Tomorrow",
    value: "TOMORROW",
  },
  {
    label: "This week",
    value: "THIS_WEEK",
  },
  {
    label: "This month",
    value: "THIS_MONTH",
  },
];
export const filterAlarmByType = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Unread",
    value: "UNREAD",
  },
  {
    label: "read",
    value: "READ",
  },
];

export const filterProjectByType = [
  {
    label: "All",
    value: "ALL",
  },
  {
    label: "Favorites",
    value: "FAVORITES",
  },
  {
    label: "Recently",
    value: "RECENTLY",
  },
];

export const CHATTING = {
  CONVERSATION_LIMIT: 15,
  MESSAGE_LIMIT: 15,
  MEMBER_LIMIT: 15,
};
export const PROJECT = {
  PROJECT_LIMIT: 10,
};
export const MY_TASK = {
  MY_TASK_LIMIT: 25,
};
export const ALARM = {
  MY_ALARM_LIMIT: 10,
};

export const tabSettings = {
  GENERAL_SETTINGS: "GENERAL_SETTINGS",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  PRIVACY: "PRIVACY",
  THEME: "THEME",
  NOTIFICATION: "NOTIFICATION",
  MESSAGE: "MESSAGE",
  UTILITIES: "UTILITIES",
};

export const UNREAD_COUNT_MAX = 10;

export const typeConfirms = {
  KICK_MEMBERS: "KICK_MEMBERS",
  UPDATE_ROLE_ADMIN: "UPDATE_ROLE_ADMIN",
  CANCEL_PROJECT: "CANCEL_PROJECT",
  UPDATE_PROJECT: "UPDATE_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
};

export const MENU_WORK_MANAGEMENT = [
  // {
  //   key: "NEW_PROJECT",
  //   name: "New Project +",
  // },
  {
    key: "DASHBOARD",
    name: "Dashboard",
    icon: <MdDashboard size={25} color="#4db74d" />,
  },
  // {
  //   key: "BOARD",
  //   name: "Board",
  //   icon: <MdLibraryBooks size={25} color="#0091ff" />,
  // },
  // {
  //   key: "FILE",
  //   name: "File",
  //   icon: <IoIosFolder size={25} color="#fbbc04" />,
  // },
];

export const MENU_ADMIN_SETTING = [
  {
    key: "USER",
    name: "User",
    icon: <FaUserPen size={25} color="#1677ff" />,
  },
  {
    key: "ORGANIZATION",
    name: "Organization",
    icon: <RiOrganizationChart size={25} color="#4db74d" />,
  },
  {
    key: "SCHEDULE",
    name: "File",
    icon: <IoIosFolder size={25} color="#fbbc04" />,
  },
];

export const CODE_TYPE = {
  PROJECT_TYPE: "1001",
  PROGRESS_STEP: "1002",
  ROLE: "1003",
  AUTHORITY: "1004",
  PROPERTY: "1005",
  STAGE_WORKFLOW: "1006",
  WORK_ACTIVITY: "1007",
};

export const WORK_ACTIVITY_CODE = {
  ACTIVITY: "100701",
  ALARM: "100702",
  ISSUE: "100703",
};

export const USAGE_STATUS = {
  YES: "Y",
  NO: "N",
};

export const NOTIFICATION_STATUS = {
  YES: "Y",
  NO: "N",
};

export const TASK_ACTIVITY_TYPE = {
  COMMENT: "C",
  REPLY: "R",
};

export const KEY_MENU_WORK_MANAGEMENT = {
  NEW_PROJECT: "NEW_PROJECT",
  UPDATE_PROJECT: "UPDATE_PROJECT",
  DASHBOARD: "DASHBOARD",
  TIMELINE: "TIMELINE",
  CALENDAR: "CALENDAR",
  BOARD: "BOARD",
  FILE: "FILE",
};

export const KEY_MENU_ADMIN_SETTING = {
  SCHEDULE: "SCHEDULE",
  ORGANIZATION: "ORGANIZATION",
  USER: "USER",
};

export const AUTHORITY_CONFIG = {
  PROJECT: {
    ID: "M100200",
    LABEL: "Project",
  },
  TASK: {
    ID: "M100300",
    LABEL: "Task",
  },
  PROJECT_MANAGEMENT: {
    ID: "M100100",
    LABEL: "Project Management",
  },
};

export const COMMENT_HISTORY = {
  LIMIT: 10,
};

export const COMMENT = {
  PARENT_LIMIT: 10,
  CHILD_LIMIT: 5,
};

export const tabTypes = {
  ALL: "ALL",
  SHARE: "SHARE",
  UNREAD: "UNREAD",
  GROUP: "GROUP",
  PERSONAL: "PERSONAL",
  NOTIFICATION_RECEIVE: "NOTIFICATION_RECEIVE",
  NOTIFICATION_SEND: "NOTIFICATION_SEND",
  NOTIFICATION: "NOTIFICATION",
};

export const windowNames = {
  CONVERSATION_LIST: "CONVERSATION_LIST",
  SIDEBAR_CHAT: "SIDEBAR_CHAT",
  CONVERSATION_DETAIL: "CONVERSATION_DETAIL",
  PROJECT_LIST: "PROJECT_LIST",
  PROJECT_DETAIL: "PROJECT_DETAIL",
  TIMELINE: "TIMELINE",
  CALENDAR: "CALENDAR",
  CHAT_MENU: "CHAT_MENU",
  NOTIFICATION_DETAIL: "NOTIFICATION_DETAIL",
};

export const modalTypes = {
  REMOVE_MESSAGE: "REMOVE_MESSAGE",
};

export const ATTRIBUTE_CODE = {
  DATE: "100501",
  DATE_TIME: "100502",
  TEXT: "100503",
};

export const imagesTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/bmp",
  "image/webp",
  "image/svg+xml",
  "image/x-icon",
  "image/tiff",
  "image/heic",
  "image/heif",
];

export const MAX_FILE_SIZE = 1024 * 1024 * 1024;
export const CHUNK_SIZE = 2 * 1024 * 1024;
export const exceedFiles = 24;
