<script setup>
import { computed, inject, reactive } from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "@/modules/auth/layouts/auth-layout.vue";
import { useApi } from "@/common/hooks/use-api";
import useLayout from "@/common/hooks/use-layout";
import useConfirmationStore from "@/modules/auth/stores/use-confirmation-store";
import useUserStore from "@/modules/auth/stores/use-user-store";

useLayout("auth", { title: "Зарегестрируйтесь" });

const user = reactive({
  email: "",
  password: "",
  passwordConfirmation: "",
  firstName: "",
  lastName: "",
});

const errors = reactive({
  email: null,
  password: null,
  passwordConfirmation: null,
  firstName: null,
  lastName: null,
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

function validateError(failed, error, message = error) {
  const errorMessages = {
    firstName: "Имя должен иметь длину от 4 до 20",
    lastName: "Фамилия должен иметь длину от 4 до 20",
    email: "Невалидный адрес электронной почты",
    password: "Пароль должен иметь длину от 8 до 26 и содержать хотя бы 1 букву и цифру",
    passwordMatch: "Пароли не совпадают",
    confirmCode: "Код должен состоят из цифр и иметь длину 6",
  };

  errors[error] = failed ? errorMessages[message] : null;
}

const api = useApi();

function validateForm() {
  const fieldValidations = [
    {
      field: user.firstName,
      key: "firstName",
      validation: api.validation.isNameValid,
    },
    {
      field: user.lastName,
      key: "lastName",
      validation: api.validation.isNameValid,
    },
    {
      field: user.email,
      key: "email",
      validation: api.validation.isEmailValid,
    },
    {
      field: user.password,
      key: "password",
      validation: api.validation.isPasswordValid,
    },
  ];

  for (const { field, key, validation } of fieldValidations) {
    validateError(!validation(field), key);
  }

  validateError(
    user.password !== user.passwordConfirmation,
    "passwordConfirmation",
    "passwordMatch",
  );
}

const router = useRouter();
const confirmationStore = useConfirmationStore();
const userStore = useUserStore();

async function tryRegister() {
  validateForm();
  if (canRegister.value) return;

  const { succeed, content } = await userStore.register.mutate({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    bio: "",
    password: user.password,
  });

  if (succeed) {
    confirmationStore.email = user.email;
    confirmationStore.password = user.password;
    await router.push({ name: "confirm" });
    return;
  }

  if (typeof content !== "string") {
    for (const [field, message] of Object.entries(content)) {
      errors[field] = message;
    }
    return;
  }

  if (content.split(" ").includes("email")) {
    errors.email = content;
  } else {
    errors.username = content;
  }
}
</script>

<template>
  <auth-layout title="Создайте свой аккаунт">
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
        @input="clearError('passwordConfirmation')"
        v-model="user.passwordConfirmation"
        placeholder="Повторите пароль"
      />
      <span v-if="errors.passwordConfirmation" :class="$style.error_message">{{
        errors.passwordConfirmation
      }}</span>

      <button :class="$style.register_button" :disabled="canRegister" type="submit">
        <Spinner v-if="userStore.register.isLoading.value" />
        <template v-else>Зарегистрироваться</template>
      </button>

      <router-link :class="$style.to_login" to="login">У меня есть аккаунт</router-link>
    </form>
  </auth-layout>
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

.register_button {
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
  margin-top: 10px;
  user-select: none;
}

.register_button:disabled {
  background: rgb(187, 191, 196);
  cursor: not-allowed;
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
