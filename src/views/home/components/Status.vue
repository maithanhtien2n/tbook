<script setup>
import { ref, watch } from "vue";

const accountInformation = JSON.parse(localStorage.getItem("token"));

// Get date time curent
const today = new Date();
const date =
  today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
const time = today.getHours() + ":" + today.getMinutes();
const dateTime = time + " " + "(" + date + ")";

// Data create
const emit = defineEmits(["onClickUploadPosts"]);

const posts = ref({
  token: accountInformation.email,
  avatar: accountInformation.avatar,
  fullName: accountInformation.fullname,
  dateTime: dateTime,
  caption: "",
  image: "",
  video: "",
});

const displayModalUpPosts = ref(false);

const displayModalAddImage = ref(false);

const displayModalAddVideo = ref(false);

const message = ref(false);

// Handle funtion
const onClickCaption = () => {
  displayModalUpPosts.value = true;
};

const onClickAddImage = () => {
  displayModalAddImage.value = true;
  displayModalUpPosts.value = false;
  watch([
    displayModalAddImage,
    () => {
      if (displayModalAddImage.value == false) {
        displayModalUpPosts.value = true;
        // posts.value.image = "";
      }
    },
  ]);
};

const onClickAddVideo = () => {
  displayModalAddVideo.value = true;
  displayModalUpPosts.value = false;
  watch([
    displayModalAddVideo,
    () => {
      if (displayModalAddVideo.value == false) {
        displayModalUpPosts.value = true;
        // posts.value.video = "";
      }
    },
  ]);
};

const onClickCloseFile = () => {
  posts.value.image = "";
  posts.value.video = "";
};

const onClickSave = () => {
  displayModalAddImage.value = false;
  displayModalAddVideo.value = false;
};

const onClickUploadPosts = (data) => {
  emit("onClickUploadPosts", data);
  displayModalUpPosts.value = false;
  message.value = true;
  posts.value = [];
};
</script>

<template>
  <Message
    v-if="message"
    class="text-3xl"
    severity="success"
    :life="4000"
    :sticky="false"
    >Bạn đã thêm bài viết thành công!</Message
  >

  <div class="bg-white box-shadow-2 boder-ru px-4">
    <div class="flex gap-3 py-4">
      <img
        class="w-4rem h-4rem border-circle box-shadow"
        :src="accountInformation.avatar"
        alt=""
      />
      <div
        @click="onClickCaption"
        style="border-radius: 10rem"
        class="flex flex-1 col-8 align-items-center justify-content-between p-0 bg-ddd px-4"
      >
        <input
          class="w-full h-4rem bg-transparent border-none outline-none"
          type="text"
          v-model="posts.caption"
          :placeholder="
            accountInformation.fullname + ' ơi, bạn đang nghĩ gì thế?'
          "
        />
      </div>
    </div>
    <div style="border-top: 1px solid #ddd" class="py-4">
      <div class="flex justify-content-between align-items-center font-bold">
        <span
          @click="onClickCaption"
          class="status hover col-4 text-center cursor-pointer py-3"
          ><i class="fas fa-book"></i> Tâm trạng</span
        >
        <span
          @click="onClickCaption"
          class="status hover col-4 text-center cursor-pointer py-3"
          ><i class="fas fa-image"></i> Ảnh</span
        >
        <span
          @click="onClickCaption"
          class="status hover col-4 text-center cursor-pointer py-3"
          ><i class="fas fa-play-circle"></i> Video</span
        >
      </div>
    </div>
  </div>

  <!-- Dialog modle up posts -->
  <Dialog
    v-model:visible="displayModalUpPosts"
    :style="{ width: '40vw', height: '70vh' }"
    :modal="true"
    :draggable="false"
  >
    <template #header>
      <div class="p-dialog-header-icons"></div>
      <h3 style="font-size: 2rem">Tạo bài viết</h3>
    </template>

    <div class="flex flex-column gap-3 pb-0">
      <!-- Avatar & time -->
      <div class="flex align-items-center gap-3">
        <img
          class="w-4rem h-4rem border-circle box-shadow"
          :src="accountInformation.avatar"
          alt=""
        />
        <div class="flex flex-column gap-1">
          <span class="font-bold">{{ accountInformation.fullname }}</span>
          <span style="font-size: 1.4rem">{{ dateTime }}</span>
        </div>
      </div>

      <!-- Bạn đang nghĩ gì thế? -->
      <Textarea
        class="textarea w-full border-none p-0"
        v-model="posts.caption"
        :autoResize="true"
        rows="2"
        :placeholder="
          accountInformation.fullname + ' ơi, bạn đang nghĩ gì thế?'
        "
      />

      <!-- Show ảnh && video -->
      <div v-if="posts.image || posts.video" class="w-full relative">
        <i
          @click="onClickCloseFile"
          class="absolute close fas fa-times border-circle"
        ></i>
        <img
          v-if="posts.image"
          style="object-fit: cover"
          class="w-full h-30rem"
          :src="posts.image"
          alt=""
        />
        <iframe
          v-else-if="posts.video"
          class="w-full h-30rem"
          :src="`https://www.youtube.com/embed/` + posts.video"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
      </div>

      <!-- Icon thêm tâm trạng, ảnh, video -->
      <div v-else class="box-shadow p-3">
        <div
          class="w-full h-17rem flex justify-content-center align-items-center bg-ddd cursor-pointer"
        >
          <div class="text-center">
            <div class="flex justify-content-center gap-3">
              <i
                @click="onClickAddImage"
                style="font-size: 2.3rem; background: #d8dadf"
                class="fas fa-image p-3 border-circle"
              ></i
              ><i
                @click="onClickAddVideo"
                style="font-size: 2.3rem; background: #d8dadf"
                class="fas fa-play-circle p-3 border-circle"
              ></i>
            </div>
            <span class="block mt-3">Thêm ảnh/video</span>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div
        class="flex justify-content-between align-items-center w-full text-center my-4 px-3 py-4 box-shadow"
      >
        <span class="font-bold">Thêm vào bài viết của bạn</span>
        <div class="flex align-items-center gap-3">
          <Chip label="Apple" icon="pi pi-apple" />
          <Chip label="Facebook" icon="pi pi-facebook" />
          <Chip label="Google" icon="pi pi-google" />
        </div>
      </div>
      <Button
        v-if="posts.caption || posts.image || posts.video"
        style="
          background: var(--text-blue-color);
          color: var(--text-while-color);
        "
        class="w-full py-3 font-bold"
        label="Đăng"
        @click="onClickUploadPosts(posts)"
      />
      <Button
        v-else
        style="
          background: var(--text-blue-color);
          color: var(--text-while-color);
        "
        disabled="disabled"
        class="w-full py-3 font-bold"
        label="Đăng"
      />
    </template>
  </Dialog>

  <!-- Dialog add image && video -->
  <!-- Dialog add image -->
  <Dialog
    v-model:visible="displayModalAddImage"
    :style="{ width: '40vw' }"
    :modal="true"
    :draggable="false"
  >
    <template #header>
      <div class="p-dialog-header-icons"></div>
      <h3 style="font-size: 2rem">Thêm link ảnh</h3>
    </template>

    <InputText
      v-model="posts.image"
      class="w-full h-5rem mb-6 mt-3 p-3"
      type="text"
      placeholder="Nhập link ảnh vào đây..."
    />

    <template #footer>
      <Button
        style="
          background: var(--text-blue-color);
          color: var(--text-while-color);
        "
        class="w-full py-3 font-bold"
        label="Lưu"
        @click="onClickSave"
        autofocus
      />
    </template>
  </Dialog>

  <!-- Dialog add video -->
  <Dialog
    v-model:visible="displayModalAddVideo"
    :style="{ width: '40vw' }"
    :modal="true"
    :draggable="false"
  >
    <template #header>
      <div class="p-dialog-header-icons"></div>
      <h3 style="font-size: 2rem">Thêm link video</h3>
    </template>

    <InputText
      v-model="posts.video"
      class="w-full h-5rem mb-6 mt-3 p-3"
      type="text"
      placeholder="Nhập link video vào đây..."
    />

    <template #footer>
      <Button
        style="
          background: var(--text-blue-color);
          color: var(--text-while-color);
        "
        class="w-full py-3 font-bold"
        label="Lưu"
        @click="onClickSave"
        autofocus
      />
    </template>
  </Dialog>
</template>

<style scoped>
* {
  color: var(--text-black-color);
  font-size: 1.6rem;
}
.status {
  font-size: 1.6rem;
}

.textarea:enabled:focus {
  box-shadow: none;
}

.close {
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  padding: 0.6rem 1rem;
  background: rgb(189, 188, 188);
}

.close:hover {
  background: #ddd !important;
  transition: all 0.3s ease;
}
</style>
