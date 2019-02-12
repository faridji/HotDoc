import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../shared/services/auth.service";
import { AppError } from "../../../shared/app-error";
import { BadInput } from "../../../shared/bad-input";
import { ToastNotification } from "../../../shared/services/toast-notification.service";

@Component({
  selector: "app-patient-sign-in",
  templateUrl: "./patient-sign-in.component.html",
  styleUrls: ["./patient-sign-in.component.css"]
})
export class PatientSignInComponent {
  constructor(
    private router: Router,
    private toastNotification: ToastNotification,
    private auth: AuthService
  ) {}

  signIn(credentials) {
    this.auth.patientSignIn(credentials).subscribe(
      result => {
        if (result["success"] == true) {
          this.router.navigate(["/"]);
          location.reload();
        }
      },
      (error: AppError) => {
        if (error instanceof BadInput)
          return this.toastNotification.error(error.originalError);

        this.toastNotification.error("An unexpected Error occured.");
      }
    );
  }

  navigateToPage() {
    this.router.navigate(["password/reset"]);
  }
}
