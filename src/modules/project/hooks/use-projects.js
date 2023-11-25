import { useMutation, useQuery } from "@tanstack/vue-query";
import { useApi } from "@/common/hooks/use-api";
import { projectListQuery } from "../queries";

export function useProjectList(meta) {
  const api = useApi();
  const query = projectListQuery(api, meta);
  return useQuery(query);
}

export function useProjectJoinMutation() {
  const api = useApi();
  return useMutation({
    mutationFn: api.projects.join,
  });
}
