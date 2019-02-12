import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../shared/services/auth.service";
import { RequestOptions, Headers } from "@angular/http";
import { PatientService } from "../../../shared/services/patient.service";
import { Router } from "@angular/router";
import { AppError } from "../../../shared/app-error";
import { ToastNotification } from "../../../shared/services/toast-notification.service";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  user;
  patient;
  loading: boolean;
  constructor(
    private toastNotification: ToastNotification,
    private patientService: PatientService,
    private router: Router,
    private auth: AuthService
  ) {}

  makeAppointment() {
    this.router.navigate(["appointment"]);
  }

  ngOnInit() {
    this.loading = true;
    this.user = this.auth.currentUser;
    this.patientService.get(this.user["_id"]).subscribe(
      info => {
        this.patient = info[0];
        this.loading = false;
      },
      (error: AppError) => {
        this.toastNotification.error("An unexpected Error occured");
        this.loading = false;
      }
    );
  }
}
