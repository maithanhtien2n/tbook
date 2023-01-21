<script setup>
import { useRouter } from "vue-router";
import { STORE_HOME as STORE_HOME_PARENT } from "@/services/stores.js";
import { computed, ref } from "vue";

const router = useRouter();
const STORE_HOME = STORE_HOME_PARENT.StoreHome();

const account = ref({
  email: "",
  password: "",
});

// Call funtion run api
const onListAccoun = () => {
  STORE_HOME.onActionGetListAccount();
};
onListAccoun();

const handleLogin = () => {
  // Get list account
  const listAccountComputed = computed(
    () => STORE_HOME.onGetterListAccount.value
  );
  const auth = listAccountComputed.value.filter(
    (data) =>
      data.email == account.value.email &&
      data.password == account.value.password
  );

  // function makeid(l) {
  //   var text = "";
  //   var char_list =
  //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  //   for (var i = 0; i < l; i++) {
  //     text += char_list.charAt(Math.floor(Math.random() * char_list.length));
  //   }
  //   return text;
  // }

  if (auth[0]) {
    const token = {
      email: auth[0].email,
      avatar: auth[0].avatar,
      fullname: auth[0].fullname,
    };
    localStorage.setItem("token", JSON.stringify(token));

    router.push("/home");
  } else {
    console.log("sai");
  }
};
</script>

<template>
  <div class="wrapper h-screen flex justify-content-center align-items-center">
    <div
      class="container grid p-0 col-8 justify-content-between align-items-center pb-3"
    >
      <!-- Col left -->
      <div class="p-0 col-6">
        <span style="color: var(--text-blue-color)" class="text-8xl font-bold"
          >Tbook</span
        >
        <p class="text-4xl mt-2">
          Tbook giúp bạn lưu trữ những kỉ niệm đẹp trong cuộc sống của bạn.
        </p>
      </div>

      <!-- Col right -->
      <div class="col-right p-0 col-5 p-5 pb-7 grid gap-4 border-round-2xl">
        <span style="color: var(--text-blue-color)" class="text-6xl"
          >Please Login</span
        >
        <InputText
          v-model="account.email"
          class="input w-full"
          placeholder="Email"
        ></InputText>
        <InputText
          v-model="account.password"
          class="input w-full"
          placeholder="Password"
          type="password"
        ></InputText>
        <Button
          style="background: var(--text-blue-color)"
          class="w-full h-4rem"
          label="Login"
          @click="handleLogin"
        ></Button>
      </div>
    </div>

    <footer
      style="background: var(--text-while-color); bottom: 0; left: 0; right: 0"
      class="fixed text-center p-2 text-600"
    >
      Bản quyền thuộc về @tienthanh.com
    </footer>
  </div>
</template>

<style scoped>
.wrapper {
  background: #f0f2f5;
}

/* Col right */
.col-right {
  background: var(--text-while-color);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
}

.input {
  font-size: 1.5rem;
  padding: 1rem;
}
</style>
