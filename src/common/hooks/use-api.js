import { inject } from "vue"

export const API_KEY = Symbol("API");

export function useApi() {
  return inject(API_KEY);
}
