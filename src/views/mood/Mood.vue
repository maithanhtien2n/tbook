<script setup>
import { STORE_MOOD as STORE_MOOD_PARENT } from "@/services/stores.js";
import { computed, ref } from "vue";

const accountInformation = JSON.parse(localStorage.getItem("token"));

const STORE_MOOD = STORE_MOOD_PARENT.StoreMood();

// Data create

// Handle funtion
const onClickIconLike = (id, listEmail) => {
  const likedEmail = [];
  if (listEmail.includes(accountInformation.email)) {
    const deleteEmail = listEmail.filter((e) => e !== accountInformation.email);
    deleteEmail.forEach(function (data) {
      likedEmail.push(data);
    });
    console.log("đúng" + likedEmail);
  } else {
    listEmail.forEach(function (data) {
      likedEmail.push(data);
    });
    likedEmail.push(accountInformation.email);
    console.log("sai" + likedEmail);
  }
  STORE_MOOD.onActionLike(id, likedEmail);
};

// --------------------------------------------------------

// CALL API
const getListPostsMood = () => {
  STORE_MOOD.onActionGetListPostsMood();
};
getListPostsMood();

// GET DATA
const dataListPostsMoodComputed = computed(
  () => STORE_MOOD.onGetterListsPostsMood.value
);
</script>

<template>
  <div class="col-5 p-0 flex flex-column gap-5">
    <!-- Item posts -->
    <div class="flex flex-column gap-5">
      <div
        v-for="(posts, index) in dataListPostsMoodComputed"
        :key="index"
        class="bg-white box-shadow-2 boder-ru p-4"
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
            style="color: var(--text-black-color) !important; opacity: 1"
            class="w-full border-none"
            v-model="posts.caption"
            disabled
            :autoResize="true"
            rows="1"
          />

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

.icon-like {
  background: var(--text-blue-color);
  color: #fff;
  font-size: 1.1rem;
}
</style>
