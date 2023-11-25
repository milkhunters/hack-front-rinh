import { ref } from "vue";
import { defineStore } from "pinia";
import { useMutation } from "@tanstack/vue-query";
import { useApi } from "@/common/hooks/use-api";
import useStorage from "@/modules/auth/hooks/use-storage";
import { CONFIRMATION_EMAIL_KEY } from "@/modules/auth/keys";

const useConfirmationStore = defineStore("confirmation", () => {
  const api = useApi();

  const email = useStorage(CONFIRMATION_EMAIL_KEY, "");
  const password = ref("");

  const sendMail = useMutation({
    mutationFn: api.auth.sendMail,
  });

  const sendCode = useMutation({
    mutationFn: api.auth.sendCode,
  });

  function clear() {
    email.value = null;
    password.value = null;
  }

  return { email, password, sendMail, sendCode, clear };
});

export default useConfirmationStore;
