<script setup>
import HeaderSearch from "./components/HeaderSearch.vue";
import HeaderAuth from "./components/HeaderAuth.vue";
import { computed } from "vue";
import { STORE_HOME as STORE_HOME_PARENT } from "@/services/stores.js";

const STORE_HOME = STORE_HOME_PARENT.StoreHome();

// Handle funtion

// CALL API
const getListPostsSearch = () => {
  STORE_HOME.onActionGetListPosts();
};
getListPostsSearch();

// GET DATA
const dataListPostsSearchComputed = computed(
  () => STORE_HOME.onGetterListsPosts.value
);

setTimeout(() => console.log(dataListPostsSearchComputed.value), 1000);
</script>

<template>
  <div
    class="container flex align-items-center bg-white justify-content-between py-3 pl-8 pr-8"
  >
    <!-- Logo and search -->
    <HeaderSearch :data="dataListPostsSearchComputed"></HeaderSearch>

    <!-- Danh mục -->
    <nav class="p-0 col-4 flex gap-4 justify-content-center align-items-center">
      <RouterLink
        :to="{ name: 'Home' }"
        @click="onClickHome"
        class="hover p-0 flex align-items-center justify-content-center col-2"
        ><i class="text-4xl fas fa-home-lg-alt"></i
      ></RouterLink>
      <RouterLink
        :to="{ name: 'Mood' }"
        class="hover p-0 flex align-items-center justify-content-center text-center col-2"
        href="#"
        ><i class="text-4xl fas fa-pen-alt"></i
      ></RouterLink>
      <RouterLink
        :to="{ name: 'Photo' }"
        class="hover p-0 flex align-items-center justify-content-center text-center col-2"
        href="#"
        ><i class="text-4xl fas fa-image"></i
      ></RouterLink>
      <RouterLink
        :to="{ name: 'Video' }"
        class="hover p-0 flex align-items-center justify-content-center text-center col-2"
        href="#"
        ><i class="text-4xl fas fa-play-circle"></i
      ></RouterLink>
    </nav>

    <!-- Auth -->
    <HeaderAuth></HeaderAuth>
  </div>
</template>

<style scoped>
* {
  color: var(--text-black-color);
}
.container {
  -webkit-user-select: none !important;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999999;
}

.hover {
  cursor: pointer;
  height: 4rem;
  transition: all 0.2s ease;
}

.hover:hover {
  background: var(--bg-ddd-color);
}

/* .active {
  border-bottom: 1px solid var(--text-blue-color);
} */

.active:hover {
  background: none;
  border-radius: 0rem;
}

.active > i {
  color: var(--text-blue-color);
}
</style>
