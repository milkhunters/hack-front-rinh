import { ref } from "vue";
import { defineStore } from "pinia";
import { useMutation } from "@tanstack/vue-query";
import { useApi } from "@/common/hooks/use-api";

const useUserStore = defineStore("user", () => {
  const api = useApi();

  const user = ref(null);

  const login = useMutation({
    mutationFn: () => void api.auth.login,
    onSuccess({ succeed, content }) {
      if (succeed) {
        user.value = content;
      }
    },
  });

  const logout = useMutation({
    metationFn: () => void api.auth.logout,
    onSuccess({ succeed }) {
      if (succeed) {
        user.value = null;
      }
    },
  });

  const register = useMutation({
    mutationFn: () => void api.auth.register,
    onSuccess({ succeed, content }) {
      if (succeed) {
        user.value = content;
      }
    },
  });

  return { user, login, logout, register };
});

export default useUserStore;
