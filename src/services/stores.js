import { defineStore } from "pinia";

export * as STORE_HOME from "@/views/home/services/store";
export * as STORE_MOOD from "@/views/mood/services/store";
export * as STORE_PHOTO from "@/views/photo/services/store";
export * as STORE_VIDEO from "@/views/video/services/store";
export * as STORE_SEARCH from "@/views/search/services/store";

export const StoreApp = defineStore("StoreApp", () => {
  // States

  // Getters

  // Actions
  const onActionGetListPostsSearch = async () => {};

  return {
    // Getter
    // Action
  };
});
