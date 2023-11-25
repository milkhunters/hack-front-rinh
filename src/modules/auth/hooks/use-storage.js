import { ref, watch } from "vue";

export default function useStorage(key, defaultValue = null, storage = localStorage) {
  function readValue() {
    const cachedValue = storage.getItem(key);
    return cachedValue ? JSON.parse(cachedValue) : defaultValue;
  }

  const storedValue = ref(readValue());

  watch(storedValue, () => {
    if (storedValue.value != null) {
      storage.setItem(key, JSON.stringify(storedValue.value));
    } else {
      storage.removeItem(key);
    }
  });

  return storedValue;
}
