<script setup>
import { STORE_SEARCH as STORE_SEARCH_PARENT } from "@/services/stores.js";
import { computed, ref, onUpdated } from "vue";

const accountInformation = JSON.parse(localStorage.getItem("token"));
const STORE_SEARCH = STORE_SEARCH_PARENT.StoreSearch();

// Data create
const activeAll = ref(true);
const activeEveryone = ref(false);
const activePosts = ref(false);
const activeImage = ref(false);
const activeVideo = ref(false);

const posts = ref(true);
const users = ref(false);

// Handle funtion
const onClickIconLike = (id, listEmail) => {
  const likedEmail = [];
  if (listEmail.includes(accountInformation.email)) {
    const deleteEmail = listEmail.filter((e) => e !== accountInformation.email);
    deleteEmail.forEach(function (data) {
      likedEmail.push(data);
    });
    console.log("bỏ like" + likedEmail);
  } else {
    listEmail.forEach(function (data) {
      likedEmail.push(data);
    });
    likedEmail.push(accountInformation.email);
    console.log("like" + likedEmail);
  }
  STORE_SEARCH.onActionLike(id, likedEmail);
  console.log(likedEmail);
};

const onClickAll = () => {
  activeAll.value = true;
  activeEveryone.value = false;
  activePosts.value = false;
  activeImage.value = false;
  activeVideo.value = false;

  posts.value = true;
  users.value = false;
};

const onClickEveryone = () => {
  activeAll.value = false;
  activeEveryone.value = true;
  activePosts.value = false;
  activeImage.value = false;
  activeVideo.value = false;

  posts.value = false;
  users.value = true;
};

const onClickPosts = () => {
  activeAll.value = false;
  activeEveryone.value = false;
  activePosts.value = true;
  activeImage.value = false;
  activeVideo.value = false;

  posts.value = true;
  users.value = false;
};

const onClickImage = () => {
  activeAll.value = false;
  activeEveryone.value = false;
  activePosts.value = false;
  activeImage.value = true;
  activeVideo.value = false;

  posts.value = true;
  users.value = false;
};

const onClickVideo = () => {
  activeAll.value = false;
  activeEveryone.value = false;
  activePosts.value = false;
  activeImage.value = false;
  activeVideo.value = true;

  posts.value = true;
  users.value = false;
};

// --------------------------------------------------------

// CALL API
const getListPostsSearch = () => {
  STORE_SEARCH.onActionGetListPostsSearch();
};
getListPostsSearch();

const onListAccoun = () => {
  STORE_SEARCH.onActionGetListAccount();
};
onListAccoun();

const dataPostsListSearch = ref([]);
const message = ref("");

const dataListsAccountSearch = ref([]);
// GET DATA
const dataListPostsSearchComputed = computed(
  () => STORE_SEARCH.onGetterListPostsSearch.value
);

const listAccountComputed = computed(
  () => STORE_SEARCH.onGetterListAccount.value
);

onUpdated(() => {
  if (activeAll.value == true) {
    dataPostsListSearch.value = dataListPostsSearchComputed.value.filter(
      (data) => data
    );
  }
  if (activeEveryone.value == true) {
    // Phần mọi người
  }
  if (activePosts.value == true) {
    dataPostsListSearch.value = dataListPostsSearchComputed.value.filter(
      (data) => !data.image && !data.video
    );
    if (
      dataListPostsSearchComputed.value.filter(
        (data) => !data.image && !data.video
      ).length == 0
    ) {
      message.value = "Không tìm thấy kết quả nào...";
    } else {
      message.value = "";
    }
  }
  if (activeImage.value == true) {
    dataPostsListSearch.value = dataListPostsSearchComputed.value.filter(
      (data) => data.image
    );
    if (dataListPostsSearchComputed.value.filter((data) => data.image) == 0) {
      message.value = "Không tìm thấy kết quả nào...";
    } else {
      message.value = "";
    }
  }
  if (activeVideo.value == true) {
    dataPostsListSearch.value = dataListPostsSearchComputed.value.filter(
      (data) => data.video
    );
    if (dataListPostsSearchComputed.value.filter((data) => data.video) == 0) {
      message.value = "Không tìm thấy kết quả nào...";
    } else {
      message.value = "";
    }
  }
});
</script>

<template>
  <div class="flex col-12 p-0 justify-content-between gap-5">
    <!-- Navbar -->
    <div
      style="top: 8rem; bottom: 2rem; z-index: 10"
      class="fixed col-3 bg-white box-shadow-2 boder-ru p-5"
    >
      <p
        style="border-bottom: 1px solid #ddd"
        class="text-4xl font-bold pb-3 mb-4"
      >
        Kết quả tìm kiếm
      </p>

      <div>
        <span class="font-bold">Bộ lọc</span>
        <div class="flex flex-column mt-3 gap-2">
          <span
            @click="onClickAll"
            :class="{ activeIcon: activeAll }"
            class="p-2 cursor-pointer hover"
            ><i class="icon mr-2 bg-ddd border-circle fas fa-border-all"></i>
            Tất cả</span
          >
          <span
            @click="onClickEveryone"
            :class="{ activeIcon: activeEveryone }"
            class="p-2 cursor-pointer hover"
            ><i class="icon mr-2 bg-ddd border-circle fas fa-user"></i> Mọi
            người</span
          >
          <span
            @click="onClickPosts"
            :class="{ activeIcon: activePosts }"
            class="p-2 cursor-pointer hover"
            ><i class="icon mr-2 bg-ddd border-circle fas fa-book"></i> Bài
            viết</span
          >
          <span
            @click="onClickImage"
            :class="{ activeIcon: activeImage }"
            class="p-2 cursor-pointer hover"
            ><i class="icon mr-2 bg-ddd border-circle fas fa-image"></i>
            Ảnh</span
          >
          <span
            @click="onClickVideo"
            :class="{ activeIcon: activeVideo }"
            class="p-2 cursor-pointer hover"
            ><i class="icon mr-2 bg-ddd border-circle fas fa-play-circle"></i>
            Video</span
          >
        </div>
      </div>
    </div>

    <div class="col-3 p-0 mr-2"></div>

    <!-- Item posts -->
    <div class="col-9 p-0 flex flex-column align-items-center gap-5">
      <div v-if="posts" class="col-8 p-0 flex flex-column gap-5">
        <div
          v-for="(posts, index) in dataPostsListSearch"
          :key="index"
          class="col-12 p-0 bg-white box-shadow-2 boder-ru p-4"
        >
          <div class="flex flex-column gap-2">
            <!-- Avatar && time -->
            <div
              :class="{ 'mb-3': !posts.caption }"
              class="flex align-items-center gap-3"
            >
              <img
                class="w-4rem h-4rem border-circle box-shadow"
                :src="posts.avatar"
                alt=""
              />
              <div class="flex flex-column gap-1">
                <span class="font-bold">{{ posts.fullName }}</span>
                <span
                  class="flex align-items-center gap-2"
                  style="font-size: 1.4rem"
                >
                  <i style="font-size: 1.3rem" class="far fa-clock"></i
                  >{{ posts.dateTime }}</span
                >
              </div>
            </div>

            <!-- Status -->
            <Textarea
              v-if="posts.caption"
              style="color: var(--text-black-color) !important; opacity: 1"
              class="w-full border-none"
              :class="{ 'text-4xl': !posts.image && !posts.video }"
              v-model="posts.caption"
              disabled
              :autoResize="true"
              rows="1"
            />

            <!-- Show ảnh, video -->
            <img
              v-if="posts.image"
              class="w-full"
              style="height: 40rem; object-fit: cover"
              :src="posts.image"
              alt=""
            />

            <iframe
              v-if="posts.video"
              class="w-full"
              style="height: 40rem"
              :src="`https://www.youtube.com/embed/` + posts.video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>

            <!-- Statistics -->
            <div
              class="flex justify-content-between align-items-center mb-2 mt-2"
            >
              <div class="flex align-items-center gap-2">
                <i
                  v-if="posts.likedEmail.length > 0"
                  class="icon-like p-2 border-circle fas fa-thumbs-up"
                ></i>
                {{ posts.likedEmail[0] }}
                <span v-if="posts.likedEmail.length - 1 > 0"
                  >và {{ posts.likedEmail.length - 1 }} người khác</span
                >
              </div>

              <div class="flex gap-5">
                <span>50 bình luận</span>
                <span>12 chia sẻ</span>
              </div>
            </div>

            <!-- Interactive -->
            <div style="border-top: 1px solid #ddd" class="pt-2">
              <div
                class="flex justify-content-between align-items-center font-bold"
              >
                <span
                  @click="onClickIconLike(posts.id, posts.likedEmail)"
                  :class="{
                    active: posts.likedEmail.includes(accountInformation.email),
                  }"
                  class="hover gap-2 flex align-items-center col-4 justify-content-center cursor-pointer py-3"
                  ><i style="font-size: 2rem" class="fas fa-thumbs-up"></i>
                  Thích</span
                >
                <span
                  class="hover gap-2 flex align-items-center col-4 justify-content-center cursor-pointer py-3"
                  ><i class="fas fa-comment-alt"></i> Developing</span
                >
                <span
                  class="hover gap-2 flex align-items-center col-4 justify-content-center cursor-pointer py-3"
                  ><i class="fas fa-share"></i> Developing</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="users" class="col-8 p-0 flex flex-column gap-5">
        <div
          v-for="(acount, index) in listAccountComputed"
          :key="index"
          class="col-12 p-0 bg-white box-shadow-2 boder-ru p-4"
        >
          <!-- Avatar && email -->
          <div class="flex align-items-center gap-3">
            <img
              class="w-4rem h-4rem border-circle box-shadow"
              :src="acount.avatar"
              alt=""
            />
            <div class="flex flex-column gap-1">
              <span class="font-bold">{{ acount.fullname }}</span>
              <span
                class="flex align-items-center gap-2"
                style="font-size: 1.4rem"
              >
                <i style="font-size: 1.6rem" class="far fa-envelope"></i
                >{{ acount.email }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div v-if="message" class="text-4xl mt-8">{{ message }}</div>
      <div v-if="!dataListPostsSearchComputed[0]" class="text-4xl mt-8">
        Không tìm thấy kết quả nào...
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  color: var(--text-black-color);
  font-size: 1.5rem;
}

.active {
  color: var(--text-blue-color);
}

.active i {
  color: var(--text-blue-color);
}

.activeIcon {
  color: var(--text-blue-color);
  background: #f0f2f5;
  border-radius: 0.5rem;
}

.activeIcon i {
  color: var(--text-blue-color);
}

.icon-like {
  background: var(--text-blue-color);
  color: #fff;
  font-size: 1.1rem;
}

.icon {
  padding: 0.9rem 1rem;
}
</style>
