import Status from "../Enum/status.js";
import Validator from "./validator.js";
export default class MainUI {
    msgContainer = document.getElementById("msgContainer");
    modalOverlay = document.getElementById("modal-overlay");
    addBtn = document.getElementById("addBtn");
    closeBtn = document.getElementById("close-modal-btn");
    cancelBtn = document.getElementById("cancel-btn");
    submitBtn = document.getElementById("submit-btn");
    taskForm = document.getElementById("task-form");
    form = {
        taskTitle: document.getElementById("task-title"),
        taskPriority: document.getElementById("task-priority"),
        taskDueDate: document.getElementById("task-due-date"),
        taskDescription: document.getElementById("task-description"),
    };
    charCount = document.getElementById("char-count");
    validator = new Validator(this.form);
    updateIndex = -1;
    task = null;
    constructor() {
        this.initMainUI();
    }
    setTask(task) {
        this.task = task;
    }
    setUpdateIndex(index) {
        this.updateIndex = index;
    }
    getFormElements() {
        return this.form;
    }
    showModle = () => {
        this.modalOverlay.classList.remove("hidden");
        this.modalOverlay.classList.add("flex");
    };
    hidModle = () => {
        this.modalOverlay.classList.add("hidden");
        this.validator.clearForm();
    };
    createData() {
        const form = this.form;
        return {
            title: form.taskTitle.value,
            priority: form.taskPriority.value,
            dueDate: form.taskDueDate.value,
            description: form.taskDescription.value,
        };
    }
    saveTask = () => {
        const resulte = this.validator
            .setData(this.createData())
            .validate();
        if (!resulte.isPassed)
            return;
        const oldTasks = JSON.parse(localStorage.getItem("tasks"));
        if (oldTasks) {
            if (this.updateIndex >= 0) {
                if (!this.task)
                    return;
                if (!resulte.data)
                    return;
                resulte.data.state = this.task.getCurrentTaskStatus();
                resulte.data.createdAt = this.task.getCurrentTaskCreateAt();
                oldTasks[this.updateIndex] = resulte.data;
                localStorage.setItem("tasks", JSON.stringify(oldTasks));
                this.task.updateData(this.getTasks());
                this.task.initTasks();
                this.msgContainer.innerHTML = `<div class="notification success">Task updated successfully!</div>`;
                this.msgContainer.classList.remove("hidden");
                setTimeout(() => {
                    this.msgContainer.classList.add("hidden");
                }, 1000);
            }
            else {
                if (!resulte.data)
                    return;
                resulte.data.createdAt = new Date().getTime();
                resulte.data.state = Status.ToDo;
                localStorage.setItem("tasks", JSON.stringify([...oldTasks, resulte.data]));
                this.msgContainer.innerHTML = `<div class="notification success">Task add successfully!</div>`;
                this.msgContainer.classList.remove("hidden");
                setTimeout(() => {
                    this.msgContainer.classList.add("hidden");
                }, 1000);
                if (!this.task)
                    return;
                this.task.updateData(this.getTasks());
                this.task.initTasks();
            }
        }
        else {
            if (!resulte.data)
                return;
            resulte.data.createdAt = new Date().getTime();
            resulte.data.state = Status.ToDo;
            localStorage.setItem("tasks", JSON.stringify([resulte.data]));
            if (!this.task)
                return;
            this.task.updateData(this.getTasks());
            this.task.initTasks();
            this.msgContainer.innerHTML = `<div class="notification success">Task add successfully!</div>`;
            this.msgContainer.classList.remove("hidden");
            setTimeout(() => {
                this.msgContainer.classList.add("hidden");
            }, 1000);
        }
        this.hidModle();
    };
    getTasks() {
        try {
            const tasks = JSON.parse(localStorage.getItem("tasks"));
            if (!tasks)
                throw new Error();
            if (!tasks.length)
                throw new Error();
            return tasks;
        }
        catch (e) {
            return [];
        }
    }
    initMainUI = () => {
        this.taskForm.addEventListener("submit", (e) => {
            e.preventDefault();
        });
        this.addBtn.addEventListener("click", this.showModle);
        this.closeBtn.addEventListener("click", this.hidModle);
        this.cancelBtn.addEventListener("click", this.hidModle);
        this.submitBtn.addEventListener("click", this.saveTask);
        this.modalOverlay.addEventListener("click", (e) => {
            if (e.target) {
                const ele = e.target;
                if (ele.id !== "modal-overlay")
                    return;
                this.hidModle();
            }
        });
        this.form.taskTitle.addEventListener("input", () => {
            this.validator.hideTitleError();
        });
        this.form.taskDueDate.addEventListener("input", () => {
            this.validator.hideDateError();
        });
        this.form.taskDescription.addEventListener("input", (e) => {
            const text = e.target;
            if (text) {
                this.charCount.innerText = `${text.value.length}/500`;
            }
        });
    };
}
