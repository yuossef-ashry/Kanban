import Priority from "../Enum/priority.js";
import Status from "../Enum/status.js";
export default class Task {
    data;
    mainUI;
    todoCount = document.getElementById("todoCount");
    tasksTodo = document.getElementById("tasks-todo");
    inProgressCount = document.getElementById("inProgressCount");
    tasksInProgress = document.getElementById("tasks-in-progress");
    completedCount = document.getElementById("completedCount");
    tasksCompleted = document.getElementById("tasks-completed");
    currentTaskStatus = null;
    currentTaskCreateAt = null;
    constructor(data, mainUI) {
        this.data = data;
        this.mainUI = mainUI;
    }
    getCurrentTaskStatus() {
        return this.currentTaskStatus;
    }
    getCurrentTaskCreateAt() {
        return this.currentTaskCreateAt;
    }
    creatTaskCard(task, index) {
        let date;
        if (task.dueDate) {
            date = new Date(task.dueDate).toLocaleDateString("en", {
                month: "short",
                day: "numeric",
            });
        }
        let firstBtn = "";
        let secondBtn = "";
        if (task.state === Status.ToDo) {
            firstBtn = `
        <button data-index="${index}" data-status="InProgress" class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-amber-100 text-amber-700 hover:bg-amber-200" data-task-id="task-1786972129858-ln6gchi" data-status="in-progress" fdprocessedid="jdb9gh">
          <i class="fa-solid fa-play pointer-events-none"></i> <span class="pointer-events-none">Start</span>
        </button>
      `;
            secondBtn = `
        <button data-index="${index}" data-status="Completed" class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-emerald-100 text-emerald-700 hover:bg-emerald-200" data-task-id="task-1786972129858-ln6gchi" data-status="completed" fdprocessedid="4k0h9f">
          <i class="fa-solid fa-check pointer-events-none"></i> <span class="pointer-events-none">Complete</span>
        </button>
      `;
        }
        else if (task.state === Status.InProgress) {
            firstBtn = `
        <button data-index="${index}" data-status="ToDo" class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-700" data-task-id="task-1786972129858-ln6gchi" data-status="todo" fdprocessedid="rups5">
          <i class="fa-solid fa-arrow-rotate-left pointer-events-none"></i> <span class="pointer-events-none">To Do</span>
        </button>
      `;
            secondBtn = `
        <button data-index="${index}" data-status="Completed" class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-emerald-100 text-emerald-700 hover:bg-emerald-200" data-task-id="task-1786972129858-ln6gchi" data-status="completed" fdprocessedid="4k0h9f">
          <i class="fa-solid fa-check pointer-events-none"></i> <span class="pointer-events-none">Complete</span>
        </button>
      `;
        }
        else if (task.state === Status.Completed) {
            firstBtn = `
        <button data-index="${index}" data-status="ToDo" class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-700" data-task-id="task-1786972129858-ln6gchi" data-status="todo" fdprocessedid="rups5">
          <i class="fa-solid fa-arrow-rotate-left pointer-events-none"></i> <span class="pointer-events-none">To Do</span>
        </button>
      `;
            secondBtn = `
        <button data-index="${index}" data-status="InProgress" class="status-btn text-[11px] px-3 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-1.5 hover:scale-105 active:scale-95 bg-amber-100 text-amber-700 hover:bg-amber-200" data-task-id="task-1786972129858-ln6gchi" data-status="in-progress" fdprocessedid="jdb9gh">
          <i class="fa-solid fa-play pointer-events-none"></i> <span class="pointer-events-none">Start</span>
        </button>
      `;
        }
        let dotColor = "";
        if (task.state === Status.ToDo) {
            dotColor = "bg-slate-300";
        }
        else if (task.state === Status.InProgress) {
            dotColor = "bg-amber-400";
        }
        else if (task.state === Status.Completed) {
            dotColor = "bg-emerald-500";
        }
        let i = 1 + index + "";
        if (i.length === 1) {
            i = "00" + i;
        }
        else if (i.length === 2) {
            i = "0" + i;
        }
        let dataTheme = `text-slate-400`;
        const redDate = new Date();
        redDate.setHours(0, 0, 0, 0);
        redDate.setDate(redDate.getDate() + 2);
        const dueDate = new Date(task.dueDate);
        dueDate.setHours(0, 0, 0, 0);
        if (dueDate <= redDate) {
            dataTheme = `text-red-500`;
        }
        let priorityBG = `bg-amber-50`;
        let priorityTxt = `text-amber-600`;
        let priorityDot = `bg-amber-500`;
        if (task.priority === Priority.low) {
            priorityBG = `bg-blue-50`;
            priorityTxt = `text-blue-600`;
            priorityDot = `bg-blue-500`;
        }
        else if (task.priority === Priority.high) {
            priorityBG = `bg-red-50`;
            priorityTxt = `text-red-600`;
            priorityDot = `bg-red-600`;
        }
        let time;
        const now = new Date();
        if (task.createdAt) {
            const createdSince = now.getTime() - task.createdAt;
            const differenceOfMin = Math.floor(createdSince / 60000);
            if (differenceOfMin === 0) {
                time = `Just now`;
            }
            else {
                if (differenceOfMin >= 60) {
                    const differenceOfHour = Math.floor(differenceOfMin / 60);
                    if (differenceOfHour >= 24) {
                        const createdAt = new Date(task.createdAt);
                        let years = now.getFullYear() - createdAt.getFullYear();
                        if (years > 0) {
                            time = `${years}year ago`;
                        }
                        else {
                            let months = now.getMonth() - createdAt.getMonth();
                            if (months > 0) {
                                time = `${months}months ago`;
                            }
                            else {
                                let days = now.getDate() - createdAt.getDate();
                                time = `${days}days ago`;
                            }
                        }
                    }
                    else {
                        time = `${differenceOfHour}h ago`;
                    }
                }
                else {
                    time = `${differenceOfMin}min ago`;
                }
            }
        }
        return `
      <div class="group bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all duration-200 ring-2 ring-red-100" data-task-id="task-1786972129858-ln6gchi">
        <!-- Top Bar -->
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full ${dotColor}"></span>
            <span class="text-[10px] font-medium text-slate-400 uppercase tracking-wider">#${i}</span>
          </div>
          <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button data-index="${index}" class="edit-btn text-slate-400 hover:text-indigo-500 hover:bg-indigo-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="task-1786972129858-ln6gchi" title="Edit task" fdprocessedid="qvlg1i">
              <i class="fa-solid fa-pen text-xs pointer-events-none"></i>
            </button>
            <button data-index="${index}" class="delete-btn text-slate-400 hover:text-red-500 hover:bg-red-50 w-7 h-7 rounded-lg flex items-center justify-center transition-colors" data-task-id="task-1786972129858-ln6gchi" title="Delete task" fdprocessedid="hqy1zi">
              <i class="fa-solid fa-trash-can text-xs pointer-events-none"></i>
            </button>
          </div>
        </div>
        <!-- Title -->
        <h3 class="font-semibold text-slate-800 mb-2 leading-snug ${Status.Completed === task.state ? "line-through text-slate-400" : ""}">
          ${task.title}
        </h3>
        <!-- Description -->
          ${task.description
            ? `<p class="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">
            ${task.description}
          </p>`
            : ""}
        <!-- Tags Row -->
        <div class="flex flex-wrap items-center gap-2 mb-4">
          <!-- Priority Badge -->
          <span class="${priorityBG} ${priorityTxt} text-[10px] font-semibold px-2 py-1 rounded-full flex items-center gap-1.5 uppercase tracking-wide">
            <span class="w-1.5 h-1.5 rounded-full ${priorityDot}"></span>
            ${task.priority === Priority.high ? `${task.priority} Priority` : task.priority}
          </span>
          ${dueDate <= redDate && task.state !== Status.Completed
            ? `
              <span class="bg-red-100 text-red-600 text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                <i class="fa-solid fa-triangle-exclamation"></i>
                Overdue
              </span>
            `
            : task.state === Status.Completed
                ? `
                <span class="bg-emerald-100 text-emerald-600 text-[10px] font-semibold px-2 py-1 rounded-full uppercase tracking-wide flex items-center gap-1">
                  <i class="fa-solid fa-check"></i>
                  Done
                </span>
              `
                : ""}
        </div>
        <!-- Meta Info -->
        <div class="flex items-center gap-3 text-xs text-slate-400 pb-3 mb-3 border-b border-slate-100">
          
            ${date
            ? `
                <div class="flex items-center gap-1.5 ${dataTheme}">
                  <i class="fa-regular fa-calendar"></i>
                  <span>${date}</span>
                </div>
              `
            : ``}
          
          <div class="flex items-center gap-1.5" title="Created 8/17/2026, 4:08:49 PM">
            <i class="fa-regular fa-clock"></i>
            <span>${time}</span>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-wrap gap-2">
        ${firstBtn}
        ${secondBtn}
        </div>
      </div>
    `;
    }
    changeTaskState(index, state) {
        this.data[index].state = state;
        localStorage.setItem("tasks", JSON.stringify(this.data));
        this.initTasks();
    }
    deleteTask(index) {
        this.data.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(this.data));
        this.initTasks();
    }
    editeTask(index) {
        const taskData = this.data[index];
        const form = this.mainUI.getFormElements();
        form.taskTitle.value = taskData.title;
        form.taskPriority.value = taskData.priority;
        form.taskDueDate.value = taskData.dueDate;
        form.taskDescription.value = taskData.description;
        this.mainUI.showModle();
        this.currentTaskStatus = taskData.state;
        this.currentTaskCreateAt = taskData.createdAt;
        this.mainUI.setUpdateIndex(index);
    }
    updateData(data) {
        this.data = data;
    }
    initTasks() {
        let toDoContainer = [];
        let inProgressContainer = [];
        let completedContainer = [];
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].state === Status.ToDo) {
                toDoContainer.push(this.creatTaskCard(this.data[i], i));
            }
            else if (this.data[i].state === Status.InProgress) {
                inProgressContainer.push(this.creatTaskCard(this.data[i], i));
            }
            else if (this.data[i].state === Status.Completed) {
                completedContainer.push(this.creatTaskCard(this.data[i], i));
            }
        }
        if (toDoContainer.length) {
            this.todoCount.innerText = toDoContainer.length.toString();
            this.tasksTodo.innerHTML = toDoContainer.join("");
        }
        else {
            this.todoCount.innerText = "0";
            this.tasksTodo.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-slate-400">
              <i class="fa-regular fa-folder-open text-4xl mb-3 opacity-50"></i>
              <p class="text-sm">No tasks yet</p>
              <p class="text-xs mt-1">Click + to add one</p>
            </div>
      `;
        }
        if (inProgressContainer.length) {
            this.inProgressCount.innerText = inProgressContainer.length.toString();
            this.tasksInProgress.innerHTML = inProgressContainer.join("");
        }
        else {
            this.inProgressCount.innerText = "0";
            this.tasksInProgress.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-slate-400">
              <i class="fa-regular fa-folder-open text-4xl mb-3 opacity-50"></i>
              <p class="text-sm">No tasks yet</p>
              <p class="text-xs mt-1">Click + to add one</p>
            </div>
      `;
        }
        if (completedContainer.length) {
            this.completedCount.innerText = completedContainer.length.toString();
            this.tasksCompleted.innerHTML = completedContainer.join("");
        }
        else {
            this.completedCount.innerText = "0";
            this.tasksCompleted.innerHTML = `
            <div class="flex flex-col items-center justify-center py-12 text-slate-400">
              <i class="fa-regular fa-folder-open text-4xl mb-3 opacity-50"></i>
              <p class="text-sm">No tasks yet</p>
              <p class="text-xs mt-1">Click + to add one</p>
            </div>
      `;
        }
        const statusBtns = document.querySelectorAll("button.status-btn");
        statusBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const ele = e.target;
                if (!ele)
                    return;
                const btn = ele.closest(".status-btn");
                if (!btn)
                    return;
                const index = Number(btn.dataset.index);
                const status = btn.dataset.status;
                this.changeTaskState(index, status);
            });
        });
        const deleteBtns = document.querySelectorAll("button.delete-btn");
        deleteBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const ele = e.target;
                if (!ele)
                    return;
                const btn = ele.closest(".delete-btn");
                if (!btn)
                    return;
                const index = Number(btn.dataset.index);
                this.deleteTask(index);
            });
        });
        const editeBtns = document.querySelectorAll("button.edit-btn");
        editeBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const ele = e.target;
                if (!ele)
                    return;
                const btn = ele.closest(".edit-btn");
                if (!btn)
                    return;
                const index = Number(btn.dataset.index);
                this.editeTask(index);
            });
        });
    }
}
