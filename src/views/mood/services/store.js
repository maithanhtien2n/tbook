import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { API_MOOD } from "@/services/api";

export const StoreMood = defineStore("StoreMood", () => {
  // States
  const listPostsMood = ref([]);

  // Getter
  const onGetterListsPostsMood = computed(() => listPostsMood);

  // Actions
  const onActionGetListPostsMood = async () => {
    return API_MOOD.API_MOOD.onApiGetListPostsMood()
      .then(({ data }) => {
        const postsMood = data.filter((posts) => !posts.image && !posts.video);
        listPostsMood.value = postsMood;
        listPostsMood.value.reverse();
        console.log("Thanh công!");
      })
      .catch((error) => {
        console.log("Lỗi! " + error);
      });
  };

  const onActionLike = async (param, data) => {
    return API_MOOD.API_MOOD.onApiLike(param, data)
      .then(({ data }) => {
        onActionGetListPostsMood();
        console.log("Thanh công!");
      })
      .catch((error) => {
        console.log("Lỗi! " + error);
      });
  };

  return {
    // Getter
    onGetterListsPostsMood,

    // Actions
    onActionGetListPostsMood,
    onActionLike,
  };
});
