import Task from "./component/task.js";
import MainUI from "./component/mainUI.js";
function render() {
    const mainUI = new MainUI();
    const data = mainUI.getTasks();
    const task = new Task(data, mainUI);
    task.initTasks();
    mainUI.setTask(task);
}
window.addEventListener("load", render);
