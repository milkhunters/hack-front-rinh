import auth from "@/modules/auth/api/api";
import projects from "@/modules/project/api/api";

export default function createApi(mode) {
  return {
    auth: auth[mode],
    projects: projects[mode],
  };
}
