export const ENV_TYPE = {
  LOCAL: "LOCAL",
  DEVELOP: "D",
  STAGING: "S",
  PRODUCT: "P",
};

export const USER_AGENT = {
  IOS: "ios",
  ANDROID: "android",
};

export const NATIVE_KEY = {
  FINISH_SERVICE: "finishService",
  LINK_KYOBO_URL: "linkKyoboUrl",
  SESSION_EXPIRED: "sessionExpired",
};

export const PAGINATION = {
  PAGE: 0,
  PAGE_SIZE: 15,
  INIT_DATA: undefined,
  NO_DATA: [],
};

export const TABS = [
  {
    id: 1,
    label: "보험",
    value: "insurance",
    taggingId: "insurance",
  },
  {
    id: 2,
    label: "은퇴설계",
    value: "retirement",
    taggingId: "retirement",
  },
];
