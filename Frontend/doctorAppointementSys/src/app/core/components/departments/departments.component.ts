import { Component, OnInit } from "@angular/core";
import { DeptService } from "../../../shared/services/dept.service";
import { AppError } from "../../../shared/app-error";
import { ToastNotification } from "../../../shared/services/toast-notification.service";

@Component({
  selector: "app-departments",
  templateUrl: "./departments.component.html",
  styleUrls: ["./departments.component.css"]
})
export class DepartmentsComponent implements OnInit {
  departments;
  loading;
  constructor(
    private toastNotification: ToastNotification,
    private deptService: DeptService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.deptService.getAll().subscribe(
      departments => {
        this.departments = departments;
        this.loading = false;
      },
      (error: AppError) => {
        this.toastNotification.error("An unexpected Error occured.");
        this.loading = false;
      }
    );
  }
}
