import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DoctorService } from "../../../shared/services/doctor.service";
import { RequestOptions, Headers } from "@angular/http";
import { AppError } from "../../../shared/app-error";
import { ToastNotification } from "../../../shared/services/toast-notification.service";

@Component({
  selector: "app-doctor-info",
  templateUrl: "./doctor-info.component.html",
  styleUrls: ["./doctor-info.component.css"]
})
export class DoctorInfoComponent implements OnInit {
  doctor;
  _id;
  constructor(
    private toastNotification: ToastNotification,
    private doctorService: DoctorService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this._id = this.route.snapshot.paramMap.get("_id");
    this.doctorService
      .get(this._id)
      .subscribe(
        doctor => (this.doctor = doctor[0]),
        (error: AppError) =>
          this.toastNotification.error("An unexpected Error occured.")
      );
  }

  makeAppointment() {
    this.router.navigate(["appointment"]);
  }
}
