export const ROUTING_PATH = {
  LANDING: "/",
  WEB_TEST: "/webTest",
  Test: "/testPage",
  MAIN: "/main",
  MY_CONSULT_PAGE: "/myConsult",
  SEARCH: "/search",
  CONSULT: {
    REGISTER: "/consult/register",
    DETAILS: (id: string | number) => `/consult/details/${id}`,
    COMPLETE: "/consult/complete",
  },
  EXPERT: {
    PROFILE: (id: string | number) => `/expert/${id}`,
  },
  WITHDRAW_TERMS: "/withdrawTerms",

  DIALOG: {
    TERMS: {
      MAIN: "/terms",
      PERSONAL: "/terms/personal",
      SENSITIVE: "/terms/sensitive",
      SERVICE: "/terms/service",
    },
    REGIST: {
      DETAIL_CATEGORY: "/register/categoryDetail",
    },
    CONSULT: {
      REPORT: "/consult/report",
    },
    BUTTON_DIALOG: "/buttonDialog",
  },
};
