import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import { useMutation } from "@tanstack/vue-query";
import { useApi } from "@/common/hooks/use-api";

const useUserStore = defineStore("user", () => {
  const api = useApi();

  const user = ref(null);

  async function fetch() {
    const { succeed, content } = await api.auth.getUser();
    if (succeed) {
      user.value = content;
    }
  }

  const login = useMutation({
    mutationFn: api.auth.login,
    onSuccess({ succeed, content }) {
      if (succeed) {
        user.value = content;
      }
    },
  });

  const logout = useMutation({
    mutationFn: api.auth.logout,
    onSuccess({ succeed }) {
      if (succeed) {
        user.value = null;
      }
    },
  });

  const register = useMutation({
    mutationFn: api.auth.register,
    onSuccess({ succeed, content }) {
      if (succeed) {
        user.value = content;
      }
    },
  });

  const sendCode = useMutation({
    mutationFn: api.auth.sendCode,
  });

  return { user, fetch, login, logout, register, sendCode };
});

export default useUserStore;
