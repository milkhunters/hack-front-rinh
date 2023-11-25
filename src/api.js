import projects from "@/modules/project/api/api";

export default function createApi(mode) {
  return {
    projects: projects[mode],
  };
}
