<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const accountInformation = JSON.parse(localStorage.getItem("token"));

const logOut = ref(false);

const onClickOpenLogout = () => {
  logOut.value = !logOut.value;
};

const onClickCloseLogout = () => {
  logOut.value = false;
};

const onClickLogout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<template>
  <!-- Auth -->
  <div class="p-0 col-4 auth relative">
    <!-- Đã login -->
    <div
      v-if="accountInformation"
      class="flex align-items-center justify-content-end gap-3"
    >
      <i class="icon-status bg-ddd far fa-plus text-4xl"></i>
      <i class="icon-status bg-ddd fab fa-facebook-messenger text-4xl"></i>
      <i class="icon-status bg-ddd fas fa-bell text-4xl"></i>
      <div class="flex align-items-center gap-3">
        <img
          @click="onClickOpenLogout"
          class="box-shadow w-4rem h-4rem border-circle cursor-pointer"
          :src="accountInformation.avatar"
          alt=""
        />
        <span @click="onClickOpenLogout" class="cursor-pointer"
          >{{ accountInformation.email }} <i class="fas fa-angle-down"></i
        ></span>
        <div
          v-if="logOut"
          class="log-out box-shadow p-4 flex gap-3 flex-column text-center"
        >
          <div class="arrow-up"></div>
          <h3>{{ accountInformation.fullname }}</h3>
          <span class="block box-shadow p-3 border-round-2xl cursor-pointer"
            >Trang cá nhân</span
          >
          <Button
            @click="onClickLogout"
            style="background: var(--text-blue-color); color: #fff"
            class="px-3 py-2 mt-3"
            type="button"
            label="Đăng xuất"
          />
        </div>
      </div>
    </div>
    <!-- Chưa login -->
    <div v-else class="flex align-items-center justify-content-end">
      <router-link :to="{ name: 'login' }">
        <Button class="p-3" type="button" label="Đăng nhâp"
      /></router-link>
    </div>
    <div @click="onClickCloseLogout" v-if="logOut" class="closeLogOut"></div>
  </div>
</template>

<style scoped>
.log-out {
  position: absolute;
  top: 117%;
  right: 0;
  background: var(--bg-ddd-color);
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  border-radius: 1rem;
}

.arrow-up {
  top: -1.3rem;
  right: 1.5rem;
  position: absolute;
  width: 0;
  height: 0;
  border-left: 9px solid transparent;
  border-right: 9px solid transparent;
  border-bottom: 15px solid var(--bg-ddd-color);
}

.closeLogOut {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

.icon-status {
  padding: 1rem 1.14rem;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.icon-status:hover {
  background: #d8dadf;
}
</style>
