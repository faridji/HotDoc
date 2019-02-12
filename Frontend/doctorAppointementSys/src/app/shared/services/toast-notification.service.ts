import { Injectable } from "@angular/core";
import { ToastyService } from "ng2-toasty";

@Injectable({
  providedIn: "root"
})
export class ToastNotification {
  constructor(private toastyService: ToastyService) {}

  success(message: string) {
    this.toastyService.success({
      title: "",
      msg: message,
      theme: "bootstrap",
      showClose: true,
      timeout: 5000
    });
  }

  error(message: string) {
    this.toastyService.error({
      title: "Error:",
      msg: message,
      theme: "bootstrap",
      showClose: true,
      timeout: 5000
    });
  }
}
