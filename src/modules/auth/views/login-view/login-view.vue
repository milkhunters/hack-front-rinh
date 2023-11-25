<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import SignButton from "@/common/components/sign-button/sign-button.vue";
import useLayout from "@/common/hooks/use-layout";
import useUserStore from "@/modules/auth/stores/use-user-store";

useLayout("auth", { title: "Войдите в личный кабинет" });

const userStore = useUserStore();

const username = ref("");
const password = ref("");
const error = ref(null);

function clearError() {
  error.value = null;
}

const router = useRouter();

async function tryLogin() {
  if (error.value) {
    return;
  }

  const data = {
    username: username.value,
    password: password.value,
  };

  await userStore.login.mutate(data, {
    onSuccess({ succeed }) {
      if (succeed) {
        router.push({ name: "tasks" });
      } else {
        error.value = "Неверный логин или пароль";
      }
    },
  });
}
</script>

<template>
  <form @submit.prevent="tryLogin">
    <p :class="$style.error_message" v-if="error">{{ error }}</p>
    <label for="login">Имя пользователя</label>
    <input
      :class="$style.login"
      id="login"
      type="text"
      @input="clearError"
      v-model="username"
      placeholder="Введите имя пользователя"
    />

    <label for="password">Пароль</label>
    <input
      :class="$style.password"
      id="password"
      type="password"
      @input="clearError"
      v-model="password"
      placeholder="Введите пароль"
    />

    <sign-button :is-loading="userStore.login.isPending" label="Войти" type="submit" />

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
