import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { API_VIDEO } from "@/services/api";

export const StoreVideo = defineStore("StoreVideo", () => {
  // States
  const listPostsVideo = ref([]);

  // Getter
  const onGetterListsPostsVideo = computed(() => listPostsVideo);

  // Actions
  const onActionGetListPostsVideo = async () => {
    return API_VIDEO.API_VIDEO.onApiGetListPostsVideo()
      .then(({ data }) => {
        const postsVideo = data.filter((posts) => posts.video);
        listPostsVideo.value = postsVideo;
        listPostsVideo.value.reverse();
        console.log("Thanh công!");
      })
      .catch((error) => {
        console.log("Lỗi! " + error);
      });
  };

  const onActionLike = async (param, data) => {
    return API_VIDEO.API_VIDEO.onApiLike(param, data)
      .then(({ data }) => {
        onActionGetListPostsVideo();
        console.log("Thanh công!");
      })
      .catch((error) => {
        console.log("Lỗi! " + error);
      });
  };

  return {
    // Getter
    onGetterListsPostsVideo,

    // Actions
    onActionGetListPostsVideo,
    onActionLike,
  };
});
