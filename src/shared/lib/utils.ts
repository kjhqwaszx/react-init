import moment from "moment";
import Cookies from "js-cookie";
import { ENV } from '@/shared/config/env.ts'

export const TIME = {
  MS_THIRTY_MINUTE: 30 * 60 * 1000,
  MS_FIVE_MINUTE: 5 * 60 * 1000,
  MS_EIGHT_MINUTE: 8 * 60 * 1000,
  MS_TEN_MINUTE: 10 * 60 * 1000,
  MS_THIRTY_SECOND: 30 * 1000,
  MS_ONE_HOUR: 60 * 60 * 1000,
  MS_ONE_DAY: 24 * 60 * 60 * 1000,
  MS_ONE_MONTH: 30 * 24 * 60 * 60 * 1000,
};

export function getEnv() {
  return ENV.MODE;
}

export function getImageUrl(url: string, defaultImage) {
  if (getEnv() !== undefined) {
    return process.env.RESOURCE_URL + url;
  } else {
    return defaultImage;
  }
}
/**
 * localStorage clear
 */
export function clearStoredAll() {
  localStorage.clear();
}

export function setLocalStorage(key: string, value: string | boolean, ttl = TIME.MS_THIRTY_MINUTE) {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttl,
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getLocalStorage(key: string) {
  const itemStr = localStorage.getItem(key);

  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
}

export function removeLocalStorage(key: string) {
  localStorage.removeItem(key);
}

export function getCookie(name: string) {
  if (typeof document === "undefined") {
    throw new Error("getCookie() is not supported on the server. Fallback to a different value when rendering on the server.");
  }

  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts[1].split(";").shift();
  }

  return undefined;
}

export function setCookie(name: string, value: string, exdays: number = 3) {
  const date = new Date();
  date.setTime(date.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function removeCookie(name: string) {
  document.cookie = `${name}=;path=/;max-age=0`;
}

export function hasCookie(cookieName) {
  const result = Cookies.get(cookieName) == undefined ? false : true;
  return result;
}

/**
 * @description 년월일
 * @param {Date} Date
 * @return string
 */
export const formattinDate = (date: Date): string => {
  return date.getFullYear() + "년 " + (date.getMonth() + 1) + "월 " + date.getDate() + "일";
};

/**
 * date => YYYY-MM-DD
 * @param {*} date
 * @returns
 */
export function toShortStringTimeFromDate(dateString?: string | Date, delimiter = "-") {
  if (!dateString) return moment().format(`YYYY${delimiter}MM${delimiter}DD`);

  return moment(dateString).format(`YYYY${delimiter}MM${delimiter}DD`);
}

/**
 * date => YYYY-MM
 * @param {*} date
 * @returns
 */

export function toShortStringFromMonth(dateString?: string, delimiter = "-") {
  if (!dateString) return moment().format(`YYYY${delimiter}MM`);

  return moment(dateString).format(`YYYY${delimiter}MM`);
}

/**
 * date => YYYY년-MM월
 * @param {*} date
 * @returns
 */

export function toShortStringFromMonthKor(dateString?: string | Date) {
  if (!dateString) return moment(dateString).format(`YYYY년 M월`);

  return moment(dateString).format(`YYYY년 M월`);
}

/**
 * date => YYYY-MM-DD HH:mm
 * @param {*} date
 * @returns
 */
export function toStringFullTimeFromDate(dateString: string) {
  if (!dateString) return moment(dateString).format("YYYY-MM-DD HH:mm");

  return moment(dateString).format("YYYY-MM-DD HH:mm");
}

/**
 * 천 단위 콤마찍기
 * @param {*} amount, locales, options
 * @returns
 */
export function toCurrencyFormat(amonut: number, locales?: string, options?: any) {
  if (!locales) return amonut.toLocaleString(locales, options);
  return amonut.toLocaleString("ko-KR", options);
}

export function isUrlAddr(url: string) {
  const urlRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
  return urlRegex.test(url);
}

export function generateTimeOptions(intervalMinutes = 30) {
  const times = [];
  const totalMinutesInDay = 24 * 60; // 하루 총 분 수 (1440분)

  for (let minutes = 0; minutes < totalMinutesInDay; minutes += intervalMinutes) {
    const hour = Math.floor(minutes / 60); // 시간 계산
    const minute = minutes % 60; // 분 계산
    const period = hour < 12 ? "오전" : "오후";
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;

    const timeString = `${period} ${displayHour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
    const value = `${hour}:${minute.toString().padStart(2, "0")}`;

    times.push({ value, label: timeString });
  }

  return times;
}

/**
 * url => /dgt 부터 출력
 * @param {*} url
 * @returns
 */

export function getExtractDomain(url) {
  if (!url) return null;
  const match = url.match(/^https?:\/\/[^/]+(.*)/);
  return match ? match[1] || "" : "";
}

/**
 * @description 특정 오브젝트 추출
 * @param {*} list, key, value
 * @returns
 */
export const getFindByKeyValue = (list, key, value) => {
  return list.find((item) => item[key] === value);
};

export const getStatusText = (status) => {
  const item = getFindByKeyValue(ANSWER_STATUS, "key", status);
  return item.value;
};

export const setApiResponse = (data: any) => {
  return {
    success: true,
    code: "SUCCESS",
    message: "정상 처리되었습니다.",
    aid: "741b7105-7547-4fba-ac19-9c9f73b4f729",
    data: data,
  };
};
