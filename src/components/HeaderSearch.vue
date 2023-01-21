<script setup>
import { ref, toRefs } from "vue";
import { useRoute } from "vue-router";

// Data create
const props = defineProps({
  data: Object,
});

const route = useRoute();
const querySearch = route.query.v;

const emit = defineEmits(["onClickSearch"]);

const { data } = toRefs(props);
setTimeout(() => console.log(data.value), 1000);

const search = ref("");
const isActiveSearch = ref(false);
const listCaptionSearch = ref([]);

// Handle funtion
const onChageSearch = () => {
  isActiveSearch.value = false;
  const checkCaptionSearch = data.value.filter((posts) =>
    posts.caption.toUpperCase().includes(search.value.toUpperCase())
  );
  listCaptionSearch.value = checkCaptionSearch;
};

const onClickSearch = () => {
  setTimeout(() => location.reload(), 30);
  isActiveSearch.value = true;
};

const onClickItemSearch = (data) => {
  isActiveSearch.value = true;
  setTimeout(() => location.reload(), 30);
  search.value = data;
};

setTimeout(
  () => (search.value = querySearch),
  (isActiveSearch.value = true),
  500
);
</script>

<template>
  <div class="p-0 col-4 flex align-items-center gap-3">
    <img
      src="https://shopt2k.000webhostapp.com/image/logot2k.png"
      class="col-3 p-0"
    />

    <div
      style="border-radius: 10rem"
      class="relative flex col-8 align-items-center justify-content-between p-0 bg-ddd px-4"
    >
      <input
        class="w-full h-4rem bg-transparent border-none outline-none"
        type="text"
        placeholder="Bạn cần tìm?"
        v-model="search"
        @input="onChageSearch"
      />
      <RouterLink v-if="search" :to="{ name: 'Search', query: { v: search } }">
        <i @click="onClickSearch" class="fas fa-search ml-3"></i
      ></RouterLink>
      <i v-else class="fas iconOff fa-search ml-3"></i>
      <!-- Gợi ý tìm kiếm -->
      <div
        v-if="search"
        :class="{ isActive: isActiveSearch }"
        class="search absolute bg-white left-0 right-0"
      >
        <p
          style="border-bottom: 1px solid #ddd"
          class="font-bold pl-3 py-3 text-2xl"
        >
          Có phải bạn muốn tìm?
        </p>
        <ScrollPanel style="width: 100%; height: auto">
          <div v-for="(searchItem, index) in listCaptionSearch" :key="index">
            <RouterLink
              :to="{ name: 'Search', query: { v: searchItem.caption } }"
            >
              <p
                @click="onClickItemSearch(searchItem.caption)"
                class="hover px-3 cursor-pointer"
              >
                <i class="fas fa-search p-2 bg-ddd border-circle mr-2"></i>
                <span>{{ searchItem.caption }}</span>
              </p>
            </RouterLink>
          </div>

          <p v-if="!listCaptionSearch[0]" class="hover px-3 cursor-pointer">
            <i class="fas fa-search p-2 bg-ddd border-circle mr-2"></i>
            <span>Không tìm thấy kết quả nào...</span>
          </p>
        </ScrollPanel>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover {
  display: -webkit-box;
  -webkit-line-clamp: 1; /* số dòng hiển thị */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 4rem;
}

.search {
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  top: 126%;
  border-radius: 1rem;
  z-index: 999;
}

.isActive {
  display: none;
}

.iconOff {
  color: rgb(180, 180, 180);
}
</style>
