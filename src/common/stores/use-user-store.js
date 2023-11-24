import { ref } from "vue";
import { defineStore } from "pinia";

const useUserStore = defineStore("user", () => {
  const user = ref(null);

  function login(data) {}

  function register(data) {}

  return { user, login, register };
});

export default useUserStore;
