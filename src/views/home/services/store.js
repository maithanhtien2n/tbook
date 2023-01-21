import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { API_HOME } from "@/services/api";

export const StoreHome = defineStore("StoreHome", () => {
  // States
  const listAccount = ref([]);
  const listPosts = ref([]);

  // Getter
  const onGetterListAccount = computed(() => listAccount);
  const onGetterListsPosts = computed(() => listPosts);

  // Actions
  const onActionGetListAccount = async () => {
    return API_HOME.API_HOME.onApiGetListAccount()
      .then(({ data }) => {
        listAccount.value = data;
        console.log("Thanh công!");
      })
      .catch((error) => {
        console.log("Lỗi! " + error);
      });
  };

  const onActionGetListPosts = async () => {
    return API_HOME.API_HOME.onApiGetListPosts()
      .then(({ data }) => {
        listPosts.value = data;
        listPosts.value.reverse();
        console.log("Thanh công!");
      })
      .catch((error) => {
        console.log("Lỗi! " + error);
      });
  };

  const onActionLike = async (param, data) => {
    return API_HOME.API_HOME.onApiLike(param, data)
      .then(({ data }) => {
        onActionGetListPosts();
        console.log("Thanh công!");
      })
      .catch((error) => {
        console.log("Lỗi! " + error);
      });
  };

  const onActionUploadPosts = async (data) => {
    return API_HOME.API_HOME.onApiUploadPosts(data)
      .then(({ data }) => {
        onActionGetListPosts();
        console.log("Thanh công!");
      })
      .catch((error) => {
        console.log("Lỗi! " + error);
      });
  };

  return {
    // Getter
    onGetterListAccount,
    onGetterListsPosts,

    // Actions
    onActionGetListAccount,
    onActionGetListPosts,
    onActionLike,
    onActionUploadPosts,
  };
});
