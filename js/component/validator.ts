import Priority from "./../Enum/priority.js";
import { IformData, Iform, Ivalidator } from "./../main.js";

export default class Validator {
  private data: IformData = {} as IformData;
  private titleError: HTMLParagraphElement = document.getElementById(
    "title-error",
  ) as HTMLParagraphElement;
  private dueDateError: HTMLParagraphElement = document.getElementById(
    "date-error",
  ) as HTMLParagraphElement;
  private formElements;
  private ERROR_INPUT_CLASSES: string[] = [
    "border-red-500",
    "focus:ring-red-500",
    "focus:border-red-500",
  ];
  private NORMAL_INPUT_CLASSES: string[] = [
    "border-slate-300",
    "focus:ring-indigo-500",
    "focus:border-indigo-500",
  ];

  constructor(formElements: Iform) {
    this.formElements = formElements;
  }

  setData(data: IformData): Validator {
    this.data = data;
    return this;
  }
  hideTitleError() {
    if (!this.titleError.classList.contains("hidden")) {
      this.titleError.classList.add("hidden");
      this.formElements.taskTitle.classList.remove(...this.ERROR_INPUT_CLASSES);
      this.formElements.taskTitle.classList.add(...this.NORMAL_INPUT_CLASSES);
    }
  }
  hideDateError() {
    if (!this.dueDateError.classList.contains("hidden")) {
      this.dueDateError.classList.add("hidden");
      this.formElements.taskDueDate.classList.remove(
        ...this.ERROR_INPUT_CLASSES,
      );
      this.formElements.taskDueDate.classList.add(...this.NORMAL_INPUT_CLASSES);
    }
  }
  clearForm(): void {
    this.hideTitleError();
    this.hideDateError();
    this.data = {} as IformData;
    this.formElements.taskTitle.value = "";
    this.formElements.taskPriority.value = Priority.medium;
    this.formElements.taskDueDate.value = "";
    this.formElements.taskDescription.value = "";
  }
  showErrorTitleBorder() {
    this.formElements.taskTitle.classList.remove(...this.NORMAL_INPUT_CLASSES);
    this.formElements.taskTitle.classList.add(...this.ERROR_INPUT_CLASSES);
  }
  showErrorDateBorder() {
    this.formElements.taskDueDate.classList.remove(
      ...this.NORMAL_INPUT_CLASSES,
    );
    this.formElements.taskDueDate.classList.add(...this.ERROR_INPUT_CLASSES);
  }
  validatTitle(): boolean {
    if (this.data.title.trim() === "") {
      this.titleError.classList.remove("hidden");
      this.showErrorTitleBorder();
      this.titleError.innerText = "Task title is required";
      return false;
    } else if (this.data.title.trim().length < 3) {
      this.titleError.classList.remove("hidden");
      this.showErrorTitleBorder();
      this.titleError.innerText = "Title must be at least 3 characters";
      return false;
    }
    return true;
  }
  validateDueDate(): boolean {
    const today = new Date();
    const dueDate = new Date(this.data.dueDate);
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    if (today > dueDate) {
      this.dueDateError.classList.remove("hidden");
      this.showErrorDateBorder();
      this.dueDateError.innerText = "Due date cannot be in the past";
      return false;
    }
    return true;
  }
  validate(): Ivalidator {
    const title = this.validatTitle();

    const date = this.validateDueDate();
    console.log(date);
    if (title && date) {
      return {
        isPassed: true,
        data: this.data as IformData,
      };
    }
    return {
      isPassed: false,
      data: null,
    };
  }
}
