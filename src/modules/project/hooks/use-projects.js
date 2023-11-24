import { useQuery } from "@tanstack/vue-query";
import { useApi } from "@/common/hooks/use-api";
import { projectListQuery } from "../queries";

export function useProjectList(meta) {
  const api = useApi();
  const query = projectListQuery(api, meta);
  return useQuery(query);
}
