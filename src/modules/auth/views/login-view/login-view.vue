<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Spinner from "@/common/components/spinner/spinner-el.vue";
import useLayout from "@/common/hooks/use-layout";
import useUserStore from "@/modules/auth/stores/use-user-store";

useLayout("auth", { title: "Войдите в личный кабинет" });

const userStore = useUserStore();

const email = ref("");
const password = ref("");
const error = ref(null);

function clearError() {
  error.value = null;
}

const router = useRouter();

async function tryLogin() {
  const { succeed } = await userStore.login.mutate({
    email: email.value,
    password: password.value,
  });

  if (succeed) {
    await router.push({ name: "projects" });
  } else {
    error.value = "Неправильный логин или пароль";
  }
}
</script>

<template>
  <form @submit.prevent="tryLogin">
    <p :class="$style.error_message" v-if="error">{{ error }}</p>
    <label for="login">Адрес электронной почты</label>
    <input
      :class="$style.login"
      id="email"
      type="text"
      @input="clearError"
      v-model="email"
      placeholder="Введите адрес электронной почты"
    />

    <label for="login">Пароль</label>
    <input
      :class="$style.password"
      id="password"
      type="password"
      @input="clearError"
      v-model="password"
      placeholder="Введите пароль"
    />

    <button :class="$style.login_button" type="submit">
      <Spinner v-if="userStore.login.isPending.value" />
      <template v-else>Войти</template>
    </button>

    <router-link :class="$style.to_register" to="/register"> У меня нет аккаунта </router-link>
  </form>
</template>

<style module lang="scss">
@import "@/styles/variables";

label {
  display: block;
  width: 100%;
  font-size: 16px;
  line-height: 24px;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: rgb(6, 17, 35);
  margin-bottom: 4px;
  cursor: pointer;
  text-align: left;
}

.login,
.password {
  appearance: none;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  color: rgb(0, 0, 0);
  font-size: 15px;
  padding: 12px;
  border: 1px solid rgb(187, 191, 196);
  margin: 0 0 16px;
  display: block;
  width: 100%;
}

.login:hover,
.password:hover {
  border: 1px solid $primary-color;
}

.login_button {
  width: 100%;
  border: 0;
  border-radius: 6px;
  height: 40px;
  max-height: 40px;
  font-size: 16px;
  font-weight: 500;
  padding: 0 15px;
  cursor: pointer;
  background: $primary-color;
  color: rgb(255, 255, 255);
  margin-top: 24px;
  user-select: none;
}

.to_register {
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: rgb(0, 93, 255);
  margin-top: 24px;
  cursor: pointer;
}

.error_message {
  background: $danger-color;
  color: white;
  padding: 5px 10px;
  border-radius: 50px;
  font-size: 14px;
  margin: 10px;
}
</style>
