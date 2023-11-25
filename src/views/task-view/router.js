import TaskView from "./task-view.vue";

async function getTask() {}

export default {
  path: "/task",
  name: "task",
  component: TaskView,
  meta: { requiresAuth: true, load: getTask },
};
