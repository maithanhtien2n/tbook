<script setup>
import ItemPosts from "./components/ItemPosts.vue";
import Status from "./components/Status.vue";
import { STORE_HOME as STORE_HOME_PARENT } from "@/services/stores.js";
import { computed, ref } from "vue";

const STORE_HOME = STORE_HOME_PARENT.StoreHome();

const accountInformation = JSON.parse(localStorage.getItem("token"));

// Data create

// Handle funtion

// --------------------------------------------------------

// CALL API
const getListPosts = () => {
  STORE_HOME.onActionGetListPosts();
};
getListPosts();

const onClickIconLike = (param, data) => {
  STORE_HOME.onActionLike(param, data);
};

const onClickUploadPosts = (data) => {
  STORE_HOME.onActionUploadPosts(data);
};

// GET DATA
const dataListPostsComputed = computed(
  () => STORE_HOME.onGetterListsPosts.value
);
</script>

<template>
  <div class="col-5 p-0 flex flex-column gap-5">
    <!-- Status -->
    <Status @onClickUploadPosts="onClickUploadPosts"></Status>

    <!-- Item posts -->
    <div class="flex flex-column gap-5">
      <ItemPosts
        :data="dataListPostsComputed"
        @onClickIconLike="onClickIconLike"
      ></ItemPosts>
    </div>
  </div>
</template>

<style scoped>
* {
  color: var(--text-black-color);
  font-size: 1.6rem;
}
</style>
