export default class Controller {
  #view;
  #worker;

  constructor({ view, worker }) {
    this.#view = view;
    this.#worker = worker;
  }

  static init(dependencies) {
    const controller = new Controller(dependencies);
    controller.init();

    return controller;
  }

  init() {
    this.#view.configureOnFileChange(this.#configureOnFileChange.bind(this));
    this.#view.configureOnFormSubmit(this.#configureOnFormSubmit.bind(this));
  }

  #formatBytes(bytes) {
    const units = ["B", "KB", "MB", "GB", "TB"];
    let i = 0;

    for (i; bytes >= 1024 && i < 4; i++) {
      bytes /= 1024;
    }

    return `${bytes.toFixed(2)} ${units[i]}`;
  }

  #configureOnFileChange(file) {
    console.log("file", file);
    this.#view.setFileSize(this.#formatBytes(file.size));
  }

  #configureOnFormSubmit(data) {
    console.log(data);
  }
}
