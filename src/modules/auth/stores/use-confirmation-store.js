import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useMutation } from "@tanstack/vue-query";
import { useApi } from "@/common/hooks/use-api";
import useStorage from "@/modules/auth/hooks/use-storage";
import { CONFIRMATION_EMAIL_KEY } from "@/modules/auth/keys";

const useConfirmationStore = defineStore("confirmation", () => {
  const api = useApi();

  const email = useStorage(CONFIRMATION_EMAIL_KEY, "");

  const sendMail = useMutation({
    mutationFn: () => api.auth.sendMail(email.value),
  });

  const sendCode = useMutation({
    mutationFn: (code) => api.auth.sendCode({ email: email.value, code }),
  });

  return { email, sendMail, sendCode };
});

export default useConfirmationStore;
