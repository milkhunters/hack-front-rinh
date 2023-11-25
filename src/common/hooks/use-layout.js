import { inject, onMounted } from "vue";
import { LAYOUT_KEY } from "@/common/keys";

export default function useLayout(layoutName, data = {}) {
  const layout = inject(LAYOUT_KEY);

  onMounted(() => {
    layout.value = { layout: layoutName, data };
  });
}
