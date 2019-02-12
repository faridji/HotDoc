import { Component, ElementRef } from "@angular/core";
import { DeptService } from "../../../shared/services/dept.service";
import { AppError } from "../../../shared/app-error";
import { BadInput } from "../../../shared/bad-input";
import { ToastNotification } from "../../../shared/services/toast-notification.service";
import { switchMap } from "rxjs/operators";

@Component({
  selector: "dept-sign-up",
  templateUrl: "./dept-sign-up.component.html",
  styleUrls: ["./dept-sign-up.component.css"]
})
export class DeptSignUpComponent {
  constructor(
    private el: ElementRef,
    private toastNotification: ToastNotification,
    private deptService: DeptService
  ) {}

  createDept(form) {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
      "#photo"
    );
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();

    form["picture"] = (form["picture"] as string).slice(12);

    console.log(form);
    if (fileCount > 0) {
      formData.append("photo", inputEl.files.item(0));
      this.deptService
        .upload(formData)
        .pipe(
          switchMap(result => {
            return this.deptService.create(form);
          })
        )
        .subscribe(
          result => {
            this.toastNotification.success(
              "Departments is successfully created"
            );
            location.reload();
          },
          (error: AppError) => {
            if (error instanceof BadInput)
              return this.toastNotification.error("Bad Input Error");

            this.toastNotification.error("An unexpected Error occured");
          }
        );
    }
  }
}
