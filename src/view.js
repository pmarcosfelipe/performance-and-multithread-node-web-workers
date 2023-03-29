export default class View {
  #csvFile = document.querySelector("#csv-file");
  #fileSize = document.querySelector("#file-size");
  #form = document.querySelector("#form");
  #debug = document.querySelector("#debug");
  #progress = document.querySelector("#progress");
  #worker = document.querySelector("#worker");

  setFileSize(size) {
    this.#fileSize.innerText = `File size: ${size}\n`;
  }

  configureOnFileChange(fn) {
    this.#csvFile.addEventListener("change", (event) => {
      fn(event.target.files[0]);
    });
  }

  configureOnFormSubmit(fn) {
    this.#form.reset();
    this.#form.addEventListener("submit", (event) => {
      event.preventDefault();

      const file = this.#csvFile.files[0];
      if (!file) {
        alert("Please select a file!");
        return;
      }

      this.updateDebugLog("");
      const form = new FormData(event.currentTarget);
      const description = form.get("description");
      fn({ description, file });
    });
  }

  updateDebugLog(text, reset = true) {
    if (reset) {
      this.#debug.innerText = text;
      return;
    }

    this.#debug.innerText += text;
  }

  updateProgress(value) {
    this.#progress.value = value;
  }

  isWorkerEnabled() {
    return this.#worker.checked;
  }
}
