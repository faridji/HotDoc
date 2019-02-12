import { Component, ElementRef } from "@angular/core";
import { PatientService } from "../../../shared/services/patient.service";
import { Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PhoneValidator } from "../../../shared/validators/phone-validator";
import { EmailValidator } from "../../../shared/validators/email-validator";
import { ToastNotification } from "../../../shared/services/toast-notification.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent {
  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(5)]),
    email: new FormControl(
      "",
      [Validators.required, Validators.email],
      EmailValidator.emailUniqueness(this.patientService)
    ),

    password: new FormControl("", [
      Validators.required,
      Validators.minLength(10)
    ]),
    mob_number: new FormControl(
      "",
      [PhoneValidator.isValidPhone],
      PhoneValidator.mobileUniqueness(this.patientService)
    ),

    age: new FormControl("", Validators.required),
    address: new FormControl("", Validators.required),
    picture: new FormControl("", Validators.required)
  });

  get name() {
    return this.form.get("name");
  }
  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }
  get mob_number() {
    return this.form.get("mob_number");
  }
  get age() {
    return this.form.get("age");
  }
  get address() {
    return this.form.get("address");
  }
  get picture() {
    return this.form.get("picture");
  }
  constructor(
    private router: Router,
    private el: ElementRef,
    private patientService: PatientService,
    private toastNotification: ToastNotification
  ) {}

  signUp() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector(
      "#photo"
    );
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();

    this.form.value["picture"] = (this.form.value["picture"] as string).slice(
      12
    );

    if (fileCount > 0) {
      formData.append("photo", inputEl.files.item(0));
      this.patientService
        .upload(formData)
        .pipe()
        .subscribe(() => {
          this.patientService.create(this.form.value);

          this.toastNotification.success("Patient is successfully created");

          return this.router.navigate(["/home"]);
        });
    }
  }
}
