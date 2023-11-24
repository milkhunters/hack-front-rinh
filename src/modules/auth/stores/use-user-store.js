import { inject, ref } from "vue";
import { defineStore } from "pinia";
import { useMutation } from "@tanstack/vue-query";
import { API_KEY } from "@/common/hooks/use-api";

const useUserStore = defineStore("user", () => {
  const api = inject(API_KEY);

  const user = ref(null);

  const login = useMutation({
    mutationFn: () => void api.auth.login,
    onSuccess(data) {
      user.value = data;
    },
  });

  const logout = useMutation({
    metationFn: () => void api.auth.logout,
    onSuccess() {
      user.value = null;
    },
  });

  const register = useMutation({
    mutationFn: () => void api.auth.register,
    onSuccess(data) {
      user.value = data;
    },
  });

  return { user, login, logout, register };
});

export default useUserStore;
