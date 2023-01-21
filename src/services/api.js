import axios from "axios";

export * as API_HOME from "@/views/home/services/api";
export * as API_MOOD from "@/views/mood/services/api";
export * as API_PHOTO from "@/views/photo/services/api";
export * as API_VIDEO from "@/views/video/services/api";
export * as API_SEARCH from "@/views/search/services/api";

export const AxiosInstance = axios.create({
  baseURL: "https://63ba407256043ab3c7983eb3.mockapi.io/",
});
