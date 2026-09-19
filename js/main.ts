import Task from "./component/task.js";
import Status from "./Enum/status.js";
import MainUI from "./component/mainUI.js";

export interface Ivalidator {
  isPassed: boolean;
  data: IformData | null;
}
export interface IformData {
  title: string;
  priority: string;
  dueDate: string;
  description: string;
  state?: Status;
  createdAt?: number;
}
export interface Iform {
  taskTitle: HTMLInputElement;
  taskPriority: HTMLSelectElement;
  taskDueDate: HTMLInputElement;
  taskDescription: HTMLTextAreaElement;
}

function render() {
  const mainUI = new MainUI();
  const data: [] | IformData[] = mainUI.getTasks();
  const task = new Task(data, mainUI);
  task.initTasks();
  mainUI.setTask(task);
}

window.addEventListener("load", render);
