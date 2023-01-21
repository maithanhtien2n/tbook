import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { API_PHOTO } from "@/services/api";

export const StorePhoto = defineStore("StorePhoto", () => {
  // States
  const listPostsPhoto = ref([]);

  // Getter
  const onGetterListsPostsPhoto = computed(() => listPostsPhoto);

  // Actions
  const onActionGetListPostsPhoto = async () => {
    return API_PHOTO.API_PHOTO.onApiGetListPostsPhoto()
      .then(({ data }) => {
        const postsPhoto = data.filter((posts) => posts.image);
        listPostsPhoto.value = postsPhoto;
        listPostsPhoto.value.reverse();
        console.log("Thanh công!");
      })
      .catch((error) => {
        console.log("Lỗi! " + error);
      });
  };

  const onActionLike = async (param, data) => {
    return API_PHOTO.API_PHOTO.onApiLike(param, data)
      .then(({ data }) => {
        onActionGetListPostsPhoto();
        console.log("Thanh công!");
      })
      .catch((error) => {
        console.log("Lỗi! " + error);
      });
  };

  return {
    // Getter
    onGetterListsPostsPhoto,

    // Actions
    onActionGetListPostsPhoto,
    onActionLike,
  };
});
