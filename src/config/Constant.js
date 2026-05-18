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

export const brand = [
  { value: "LOUIS VUITTON", label: "LOUIS VUITTON" },
  { value: "CHANEL", label: "CHANEL" },
  { value: "HERMES", label: "HERMES" },
  { value: "GUCCI", label: "GUCCI" },
  { value: "PRADA", label: "PRADA" },
  { value: "ROLEX", label: "ROLEX" },
  { value: "OMEGA", label: "OMEGA" },
  { value: "TAG Heuer", label: "TAG Heuer" },
  { value: "Catier", label: "Catier" },
  { value: "BVLGARI", label: "BVLGARI" },
  { value: "Tiffany＆Co.", label: "Tiffany＆Co." },
  { value: "HARRY WINSTON", label: "HARRY WINSTON" },
  { value: "Van Cleef＆Arpels", label: "Van Cleef＆Arpels" },
  { value: "A. LANGE & SOHNE", label: "A. LANGE & SOHNE" },
  { value: "AUDEMARS PIGUET", label: "AUDEMARS PIGUET" },
  { value: "Baccarat", label: "Baccarat" },
  { value: "BALENCIAGA", label: "BALENCIAGA" },
  { value: "BALLY", label: "BALLY" },
  { value: "BAUME＆MERCIER", label: "BAUME＆MERCIER" },
  { value: "Bell & Ross", label: "Bell & Ross" },
  { value: "Berluti", label: "Berluti" },
  { value: "BOTTEGA VENETA", label: "BOTTEGA VENETA" },
  { value: "BOUCHERON", label: "BOUCHERON" },
  { value: "BREGUET", label: "BREGUET" },
  { value: "BREITLING", label: "BREITLING" },
  { value: "Buccellati", label: "Buccellati" },
  { value: "BURBERRY", label: "BURBERRY" },
  { value: "Carlo Parlati", label: "Carlo Parlati" },
  { value: "Carrera y Carrera", label: "Carrera y Carrera" },
  { value: "CASIO", label: "CASIO" },
  { value: "CAZZANIGA", label: "CAZZANIGA" },
  { value: "CELINE", label: "CELINE" },
  { value: "CHARRIOL", label: "CHARRIOL" },
  { value: "CHAUMET", label: "CHAUMET" },
  { value: "chloe", label: "chloe" },
  { value: "Chopard", label: "Chopard" },
  { value: "Christian Louboutin", label: "Christian Louboutin" },
  { value: "CHROME HEARTS", label: "CHROME HEARTS" },
  { value: "CITIZEN", label: "CITIZEN" },
  { value: "COACH", label: "COACH" },
  { value: "Cole Haan", label: "Cole Haan" },
  { value: "COMME des GARCONS", label: "COMME des GARCONS" },
  { value: "CORUM", label: "CORUM" },
  { value: "D＆G", label: "D＆G" },
  { value: "Damiani", label: "Damiani" },
  { value: "DE BEERS", label: "DE BEERS" },
  { value: "Dior", label: "Dior" },
  { value: "DOLCE＆GABBANA", label: "DOLCE＆GABBANA" },
  { value: "DSQUARED3", label: "DSQUARED3" },
  { value: "dunhill", label: "dunhill" },
  { value: "EDOX", label: "EDOX" },
  { value: "EMILIO PUCCI", label: "EMILIO PUCCI" },
  { value: "ETRO", label: "ETRO" },
  { value: "FEDERICO BUCCELLATI", label: "FEDERICO BUCCELLATI" },
  { value: "Felisi", label: "Felisi" },
  { value: "FENDI", label: "FENDI" },
  { value: "FRANCK MULLER", label: "FRANCK MULLER" },
  { value: "FRED", label: "FRED" },
  { value: "FREDERIQUE CONSTANT", label: "FREDERIQUE CONSTANT" },
  { value: "FURLA", label: "FURLA" },
  { value: "Gaga Milano", label: "Gaga Milano" },
  { value: "Georg Jensen", label: "Georg Jensen" },
  { value: "gimel", label: "gimel" },
  { value: "GIRARD PERREGAUX", label: "GIRARD PERREGAUX" },
  { value: "GIVENCHY", label: "GIVENCHY" },
  { value: "GOYARD", label: "GOYARD" },
  { value: "GRAFF", label: "GRAFF" },
  { value: "GRAHAM", label: "GRAHAM" },
  { value: "HUBLOT", label: "HUBLOT" },
  { value: "IWC", label: "IWC" },
  { value: "Jacob & CO", label: "Jacob & CO" },
  { value: "JAEGER LECOULTRE", label: "JAEGER LECOULTRE" },
  { value: "Jeunet", label: "Jeunet" },
  { value: "JEWEL STUDIO", label: "JEWEL STUDIO" },
  { value: "JILSANDER", label: "JILSANDER" },
  { value: "JIMMY CHOO", label: "JIMMY CHOO" },
  { value: "Justin Davis", label: "Justin Davis" },
  { value: "Kashikey", label: "Kashikey" },
  { value: "Kate Spade", label: "Kate Spade" },
  { value: "LANVIN", label: "LANVIN" },
  { value: "LOEWE", label: "LOEWE" },
  { value: "LONG CHAMP", label: "LONG CHAMP" },
  { value: "LONGINES", label: "LONGINES" },
  { value: "MACKINTOSH", label: "MACKINTOSH" },
  { value: "MARC BY MARC JACOBS", label: "MARC BY MARC JACOBS" },
  { value: "MARC JACOBS", label: "MARC JACOBS" },
  { value: "MAUBOUSSIN", label: "MAUBOUSSIN" },
  { value: "MAURICE LACROIX", label: "MAURICE LACROIX" },
  { value: "MCM", label: "MCM" },
  { value: "Meissen", label: "Meissen" },
  { value: "Michael Kors", label: "Michael Kors" },
  { value: "MIKIMOTO", label: "MIKIMOTO" },
  { value: "miu miu", label: "miu miu" },
  { value: "MONCLER", label: "MONCLER" },
  { value: "MONTBLANC", label: "MONTBLANC" },
  { value: "ORIENT", label: "ORIENT" },
  { value: "Orobianco", label: "Orobianco" },
  { value: "PANERAI", label: "PANERAI" },
  { value: "PATEK PHILIPPE", label: "PATEK PHILIPPE" },
  { value: "PIAGET", label: "PIAGET" },
  { value: "POLA", label: "POLA" },
  { value: "POMELLATO", label: "POMELLATO" },
  { value: "Ponte Vecchio", label: "Ponte Vecchio" },
  { value: "RADO", label: "RADO" },
  { value: "RayBan", label: "RayBan" },
  { value: "REGAL", label: "REGAL" },
  { value: "RICHARD MILLE", label: "RICHARD MILLE" },
  { value: "RIMOWA", label: "RIMOWA" },
  { value: "Ritmo latino", label: "Ritmo latino" },
  { value: "ROGER DUBUIS", label: "ROGER DUBUIS" },
  { value: "SAINT LAURENT", label: "SAINT LAURENT" },
  { value: "Salvatore Ferragamo", label: "Salvatore Ferragamo" },
  { value: "SEE BY CHLOE", label: "SEE BY CHLOE" },
  { value: "SEIKO", label: "SEIKO" },
  { value: "Sergio Rossi", label: "Sergio Rossi" },
  { value: "SINN", label: "SINN" },
  { value: "SOUTHERN CROSS", label: "SOUTHERN CROSS" },
  { value: "SUPREME", label: "SUPREME" },
  { value: "TASAKI", label: "TASAKI" },
  { value: "TOD’S", label: "TOD’S" },
  { value: "Tom Ford", label: "Tom Ford" },
  { value: "Tory Burch", label: "Tory Burch" },
  { value: "TUDOR", label: "TUDOR" },
  { value: "TUMI", label: "TUMI" },
  { value: "ULYSSE NARDIN", label: "ULYSSE NARDIN" },
  { value: "UNIVERSAL GENEVE", label: "UNIVERSAL GENEVE" },
  { value: "UNOAERRE", label: "UNOAERRE" },
  { value: "VACHERON CONSTANTIN", label: "VACHERON CONSTANTIN" },
  { value: "VALENTINO", label: "VALENTINO" },
  { value: "Vendome Aoyama", label: "Vendome Aoyama" },
  { value: "Verite", label: "Verite" },
  { value: "VERSACE", label: "VERSACE" },
  { value: "Waltham", label: "Waltham" },
  { value: "Yves Saint Laurent", label: "Yves Saint Laurent" },
  { value: "ZENITH", label: "ZENITH" },
  { value: "MITSUO KAJI", label: "MITSUO KAJI" },
  { value: "Historical history", label: "Historical history" },
  { value: "NOBUKO ISHIKAWA", label: "NOBUKO ISHIKAWA" },
  { value: "SHUNICHI TAMURA", label: "SHUNICHI TAMURA" },
  { value: "OTHER", label: "OTHER" },
];

export const quality = [
  { value: "N", label: "N" },
  { value: "S", label: "S" },
  { value: "A", label: "A" },
  { value: "AB", label: "AB" },
  { value: "B", label: "B" },
  { value: "BC", label: "BC" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
  { value: "F", label: "F" },
  { value: "10", label: "10" },
  { value: "9", label: "9" },
  { value: "8", label: "8" },
  { value: "7", label: "7" },
  { value: "6", label: "6" },
  { value: "5", label: "5" },
  { value: "4", label: "4" },
  { value: "3", label: "3" },
  { value: "2", label: "2" },
  { value: "1", label: "1" },
];

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
