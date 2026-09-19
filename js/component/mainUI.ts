import Status from "../Enum/status.js";
import { IformData, Iform, Ivalidator } from "../main.js";
import Task from "./task.js";
import Validator from "./validator.js";

export default class MainUI {
  private msgContainer: HTMLDivElement = document.getElementById(
    "msgContainer",
  ) as HTMLDivElement;
  private modalOverlay: HTMLDivElement = document.getElementById(
    "modal-overlay",
  ) as HTMLDivElement;
  private addBtn: HTMLButtonElement = document.getElementById(
    "addBtn",
  ) as HTMLButtonElement;
  private closeBtn: HTMLButtonElement = document.getElementById(
    "close-modal-btn",
  ) as HTMLButtonElement;
  private cancelBtn: HTMLButtonElement = document.getElementById(
    "cancel-btn",
  ) as HTMLButtonElement;
  private submitBtn: HTMLButtonElement = document.getElementById(
    "submit-btn",
  ) as HTMLButtonElement;
  private taskForm: HTMLFormElement = document.getElementById(
    "task-form",
  ) as HTMLFormElement;
  private form: Iform = {
    taskTitle: document.getElementById("task-title") as HTMLInputElement,
    taskPriority: document.getElementById("task-priority") as HTMLSelectElement,
    taskDueDate: document.getElementById("task-due-date") as HTMLInputElement,
    taskDescription: document.getElementById(
      "task-description",
    ) as HTMLTextAreaElement,
  };
  private charCount: HTMLParagraphElement = document.getElementById(
    "char-count",
  ) as HTMLParagraphElement;
  private validator: Validator = new Validator(this.form);
  private updateIndex: number = -1;
  private task: Task | null = null;

  constructor() {
    this.initMainUI();
  }

  setTask(task: Task): void {
    this.task = task;
  }
  setUpdateIndex(index: number): void {
    this.updateIndex = index;
  }
  getFormElements(): Iform {
    return this.form;
  }
  showModle = (): void => {
    this.modalOverlay.classList.remove("hidden");
    this.modalOverlay.classList.add("flex");
  };
  private hidModle = (): void => {
    this.modalOverlay.classList.add("hidden");
    this.validator.clearForm();
  };
  private createData(): IformData {
    const form = this.form;
    return {
      title: form.taskTitle.value as string,
      priority: form.taskPriority.value as string,
      dueDate: form.taskDueDate.value as string,
      description: form.taskDescription.value as string,
    };
  }
  private saveTask = (): void => {
    const resulte: Ivalidator = this.validator
      .setData(this.createData())
      .validate();
    if (!resulte.isPassed) return;
    const oldTasks: IformData[] | null = JSON.parse(
      localStorage.getItem("tasks") as string,
    );

    if (oldTasks) {
      if (this.updateIndex >= 0) {
        if (!this.task) return;
        if (!resulte.data) return;
        resulte.data.state = this.task.getCurrentTaskStatus();
        resulte.data.createdAt = this.task.getCurrentTaskCreateAt();
        oldTasks[this.updateIndex] = resulte.data as IformData;
        localStorage.setItem("tasks", JSON.stringify(oldTasks));
        this.task.updateData(this.getTasks());
        this.task.initTasks();
        this.msgContainer.innerHTML = `<div class="notification success">Task updated successfully!</div>`;
        this.msgContainer.classList.remove("hidden");
        setTimeout(() => {
          this.msgContainer.classList.add("hidden");
        }, 1000);
      } else {
        if (!resulte.data) return;
        resulte.data.createdAt = new Date().getTime();
        resulte.data.state = Status.ToDo;
        localStorage.setItem(
          "tasks",
          JSON.stringify([...oldTasks, resulte.data]),
        );
        this.msgContainer.innerHTML = `<div class="notification success">Task add successfully!</div>`;
        this.msgContainer.classList.remove("hidden");
        setTimeout(() => {
          this.msgContainer.classList.add("hidden");
        }, 1000);
        if (!this.task) return;
        this.task.updateData(this.getTasks());
        this.task.initTasks();
      }
    } else {
      if (!resulte.data) return;
      resulte.data.createdAt = new Date().getTime();
      resulte.data.state = Status.ToDo;
      localStorage.setItem("tasks", JSON.stringify([resulte.data]));
      if (!this.task) return;
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
  getTasks(): [] | IformData[] {
    try {
      const tasks: IformData[] | null = JSON.parse(
        localStorage.getItem("tasks") as string,
      );
      if (!tasks) throw new Error();
      if (!tasks.length) throw new Error();
      return tasks;
    } catch (e) {
      return [];
    }
  }
  private initMainUI = (): void => {
    this.taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    this.addBtn.addEventListener("click", this.showModle);
    this.closeBtn.addEventListener("click", this.hidModle);
    this.cancelBtn.addEventListener("click", this.hidModle);
    this.submitBtn.addEventListener("click", this.saveTask);
    this.modalOverlay.addEventListener("click", (e) => {
      if (e.target) {
        const ele: HTMLElement = e.target as HTMLElement;
        if (ele.id !== "modal-overlay") return;
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
      const text: HTMLInputElement = e.target as HTMLInputElement;
      if (text) {
        this.charCount.innerText = `${text.value.length}/500`;
      }
    });
  };
}
