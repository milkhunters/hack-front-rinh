import projects from "@/views/project-view/api/api";

export default function createApi(mode) {
  return {
    projects: projects[mode],
  };
}
