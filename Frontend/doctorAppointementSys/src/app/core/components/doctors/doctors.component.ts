import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../../../shared/services/doctor.service";
import { Router } from "@angular/router";
import { AppError } from "../../../shared/app-error";
import { ToastNotification } from "../../../shared/services/toast-notification.service";

@Component({
  selector: "app-doctors",
  templateUrl: "./doctors.component.html",
  styleUrls: ["./doctors.component.css"]
})
export class DoctorsComponent implements OnInit {
  doctors;
  loading;
  constructor(
    private router: Router,
    private toastNotification: ToastNotification,
    private doctorService: DoctorService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.doctorService.getAll().subscribe(
      doctors => {
        this.doctors = doctors;
        this.loading = false;
      },
      (error: AppError) => {
        this.toastNotification.error("An unexpected Error occured.")
        this.loading = false;
      }
    );
  }

  showDetails(doctor) {
    this.router.navigate(["doctorDetails/:id", { _id: doctor._id }]);
  }
}
