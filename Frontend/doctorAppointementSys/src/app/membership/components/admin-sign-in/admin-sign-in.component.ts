import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../../../shared/services/auth.service";
import { AppError } from "../../../shared/app-error";
import { ToastNotification } from "../../../shared/services/toast-notification.service";
import { BadInput } from "../../../shared/bad-input";

@Component({
  selector: "app-admin-sign-in",
  templateUrl: "./admin-sign-in.component.html",
  styleUrls: ["./admin-sign-in.component.css"]
})
export class AdminSignInComponent {
  constructor(
    private toastNotification: ToastNotification,
    private router: Router,
    private auth: AuthService
  ) {}

  signIn(credentials) {
    this.auth.adminSignIn(credentials).subscribe(
      result => this.router.navigate(["adminPanel"]),

      (error: AppError) => {
        if (error instanceof BadInput)
          return this.toastNotification.error(error.originalError);

        this.toastNotification.error("An unexpected Error occured");
      }
    );
  }

  navigateToPage() {
    this.router.navigate(["password/reset"]);
  }
}
