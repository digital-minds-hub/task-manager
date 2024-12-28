type TaskStatus = "To-Do" | "In Progress" | "Done";

type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};
