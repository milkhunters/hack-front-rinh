<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import AuthLayout from "@/modules/auth/layouts/auth-layout";
import useLayout from "@/common/hooks/use-layout";
import useConfirmationStore from "@/modules/auth/stores/use-confirmation-store";
import useUserStore from "@/modules/auth/stores/use-user-store";

useLayout("auth", { title: "Подтвердите код" });

const REQUEST_TIMEOUT = 120000;
const sendTimeout = ref(null);

const confirmationStore = useConfirmationStore();

const canSendMail = computed(() => {
  return confirmationStore.email && !sendTimeout.value;
});

function sendMail() {
  if (!canSendMail.value) return;

  confirmationStore.sendMail.mutate();

  sendTimeout.value = setTimeout(() => (sendTimeout.value = null), REQUEST_TIMEOUT);
}

onMounted(sendMail);

const code = ref("");
const errors = ref(null);
const canSendCode = computed(() => !errors.value && code.value !== "");

const router = useRouter();
const userStore = useUserStore();

const sendCode = async () => {
  if (!canSendCode.value) return;

  const { succeed } = await confirmationStore.sendCode.mutate(code.value);

  if (succeed) {
    await userStore.login({
      email: confirmationStore.email,
      password: confirmationStore.password,
    });
    confirmationStore.clear();
    await router.push({ name: "home" });
  } else {
    errors.value = "Неверный код";
  }
};
</script>

<template>
  <auth-layout title="Подтвердите адрес электронной почты">
    <div :class="$style.wrapper">
      <span :class="$style.title">
        Мы отправили код на адрес:
        <input :value="confirmationEmail" />
      </span>
      <form @submit.prevent="sendCode">
        <label :class="$style.label">Код подтверждения</label>
        <input
          :class="errors ? $style.error_field : $style.code"
          type="text"
          v-model="code"
          placeholder="Введите код подтверждения"
        />
        <span v-if="errors" :class="$style.error_message"> {{ errors }}</span>

        <button :class="$style.confirm_button" :disabled="!canSendCode" type="submit">
          Подтвердить
        </button>
      </form>
      <button :class="$style.again_button" :disabled="!canSendMail" @click="sendMail">
        Отправить код еще раз
      </button>
    </div>
  </auth-layout>
</template>

<style module lang="scss">
@import "@/styles/variables";

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.title {
  width: 100%;
  text-align: center;
  margin: 15px 0;
  font-weight: 600;
}

.code {
  appearance: none;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  color: rgb(0, 0, 0);
  font-size: 15px;
  padding: 12px;
  border: 1px solid rgb(187, 191, 196);
  margin: 0 0 5px;
  display: block;
  width: 100%;
}

.confirm_button {
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
  margin: 15px 0;
  user-select: none;
}

.again_button {
  display: flex;
  justify-content: center;
  height: auto;
  font-size: 14px;
  padding: 5px 15px;
  width: 50%;
}

.confirm_button:disabled,
.again_button:disabled {
  background: rgb(187, 191, 196);
  cursor: not-allowed;
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

@media (max-width: 700px) {
  .again_button {
    font-size: 12px;
  }
}
</style>
