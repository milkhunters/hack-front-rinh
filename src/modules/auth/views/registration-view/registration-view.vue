<script setup>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useApi } from "@/common/hooks/use-api";
import useLayout from "@/common/hooks/use-layout";
import useConfirmationStore from "@/modules/auth/stores/use-confirmation-store";
import useUserStore from "@/modules/auth/stores/use-user-store";
import SignButton from "@/common/components/sign-button/sign-button.vue";

useLayout("auth", { title: "Зарегестрируйтесь" });

const user = reactive({
  username: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  passwordConfirmation: "",
});

const errors = reactive({
  username: "",
  email: null,
  firstName: null,
  lastName: null,
  password: null,
  passwordMatch: null,
});

const hasErrors = computed(() => {
  return Object.values(errors).some((error) => error !== null);
});

const hasEmpty = computed(() => {
  return Object.values(user).some((field) => field === "");
});

const canRegister = computed(() => {
  return !hasErrors.value && !hasEmpty.value;
});

function clearError(field) {
  errors[field] = null;
}

const api = useApi();

const router = useRouter();
const confirmationStore = useConfirmationStore();
const userStore = useUserStore();

function validateForm(data) {
  const validationErrors = api.auth.validateRegistrationData({
    ...data,
    passwordConfirmation: user.passwordConfirmation,
  });

  for (const { field, message } of validationErrors) {
    errors[field] = message;
  }
}

async function tryRegister() {
  const data = {
    username: user.username,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    password: user.password,
  };

  validateForm(data);

  if (!canRegister.value) return;

  await userStore.register.mutate(data, {
    onSuccess({ succeed, content }) {
      if (succeed) {
        confirmationStore.email = user.email;
        confirmationStore.password = user.password;
        router.push({ name: "confirm" });
        return;
      }

      for (const [field, message] of Object.entries(content)) {
        errors[field] = message;
      }
    },
  });
}
</script>

<template>
  <form :class="$style.form" @submit.prevent="tryRegister">
    <label for="first-name">Имя</label>
    <input
      :class="errors.firstName ? $style.error_field : $style.first_name"
      id="first-name"
      type="text"
      @input="clearError('firstName')"
      v-model="user.firstName"
      placeholder="Введите имя"
    />
    <span v-if="errors.firstName" :class="$style.error_message">{{ errors.firstName }}</span>

    <label for="last-name">Фамилия</label>
    <input
      :class="errors.lastName ? $style.error_field : $style.last_name"
      id="last-name"
      type="text"
      @input="clearError('lastName')"
      v-model="user.lastName"
      placeholder="Введите фамилию"
    />
    <span v-if="errors.lastName" :class="$style.error_message">{{ errors.lastName }}</span>

    <label for="username">Имя пользователя</label>
    <input
      :class="errors.username ? $style.error_field : $style.last_name"
      id="username"
      type="text"
      @input="clearError('username')"
      v-model="user.username"
      placeholder="Введите имя пользователя"
    />
    <span v-if="errors.username" :class="$style.error_message">{{ errors.username }}</span>

    <label for="email">Адрес электронной почты</label>
    <input
      :class="errors.email ? $style.error_field : $style.email"
      id="email"
      type="email"
      @input="clearError('email')"
      v-model="user.email"
      placeholder="Введите адрес электронной почты"
    />
    <span v-if="errors.email" :class="$style.error_message">{{ errors.email }}</span>

    <label for="password">Пароль</label>
    <input
      :class="errors.password ? $style.error_field : $style.password"
      id="password"
      type="password"
      @input="clearError('password')"
      v-model="user.password"
      placeholder="Введите пароль"
    />
    <span v-if="errors.password" :class="$style.error_message">{{ errors.password }}</span>

    <label for="password-confirm">Повторите пароль</label>
    <input
      :class="errors.passwordConfirmation ? $style.error_field : $style.password_confirm"
      id="password-confirm"
      type="password"
      @input="clearError('passwordMatch')"
      v-model="user.passwordConfirmation"
      placeholder="Повторите пароль"
    />
    <span v-if="errors.passwordMatch" :class="$style.error_message">{{
      errors.passwordMatch
    }}</span>

    <sign-button
      :is-loading="userStore.register.isPending"
      label="Зарегистрироваться"
      type="submit"
    />

    <router-link :class="$style.to_login" to="login">У меня есть аккаунт</router-link>
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

.first_name,
.last_name,
.email,
.password,
.password_confirm {
  appearance: none;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  color: rgb(0, 0, 0);
  font-size: 15px;
  padding: 12px;
  border: 1px solid rgb(187, 191, 196);
  margin: 0 0 10px;
  display: block;
  width: 100%;
}

.first_name:hover,
.last_name:hover,
.email:hover,
.password:hover,
.password_confirm:hover {
  border: 1px solid $primary-color;
}

.to_login {
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: rgb(0, 93, 255);
  margin-top: 24px;
  cursor: pointer;
}

.error_message {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  color: $danger-color;
  padding-bottom: 10px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
}

.error_field {
  appearance: none;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  color: rgb(0, 0, 0);
  font-size: 15px;
  padding: 12px;
  margin: 0 0 10px;
  display: block;
  width: 100%;
  border: 1px solid $danger-color;
}
</style>
