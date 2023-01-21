import { defineStore } from "pinia";
import { computed, ref, onUpdated } from "vue";
import { API_SEARCH } from "@/services/api";
import { useRoute } from "vue-router";

export const StoreSearch = defineStore("StoreSearch", () => {
  // States
  const route = useRoute();
  const querySearch = route.query.v;

  const listPostsSearch = ref([]);
  const listAccount = ref([]);

  // Getter
  const onGetterListPostsSearch = computed(() => listPostsSearch);
  const onGetterListAccount = computed(() => listAccount);

  // Actions
  const onActionGetListPostsSearch = async () => {
    return API_SEARCH.API_SEARCH.onApiGetListPostsSearch()
      .then(({ data }) => {
        const keySearch = data.filter(
          (posts) =>
            posts.caption.toUpperCase().includes(querySearch.toUpperCase()) ||
            posts.fullName.toUpperCase().includes(querySearch.toUpperCase()) ||
            posts.token.toUpperCase().includes(querySearch.toUpperCase())
        );
        listPostsSearch.value = keySearch;
        console.log("Thanh công!");
      })
      .catch((error) => {
        console.log("Lỗi! " + error);
      });
  };

  const onActionLike = async (param, data) => {
    return API_SEARCH.API_SEARCH.onApiLike(param, data)
      .then(({ data }) => {
        onActionGetListPostsSearch();
        console.log("Thanh công!");
      })
      .catch((error) => {
        console.log("Lỗi! " + error);
      });
  };

  const onActionGetListAccount = async () => {
    return API_SEARCH.API_SEARCH.onApiGetListAccount()
      .then(({ data }) => {
        const keySearch = data.filter(
          (account) =>
            account.fullname
              .toUpperCase()
              .includes(querySearch.toUpperCase()) ||
            account.email.toUpperCase().includes(querySearch.toUpperCase())
        );
        listAccount.value = keySearch;
        console.log("Thanh công!");
      })
      .catch((error) => {
        console.log("Lỗi! " + error);
      });
  };

  return {
    // Getter
    onGetterListPostsSearch,
    onGetterListAccount,

    // Action
    onActionGetListPostsSearch,
    onActionLike,
    onActionGetListAccount,
  };
});
