import { Component, OnInit, ElementRef } from "@angular/core";
import { DoctorService } from "../../../shared/services/doctor.service";
import { DeptService } from "../../../shared/services/dept.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { switchMap } from "rxjs/operators";
import { PhoneValidator } from "../../../shared/validators/phone-validator";
import { EmailValidator } from "../../../shared/validators/email-validator";
import { ToastNotification } from "../../../shared/services/toast-notification.service";

@Component({
  selector: "doctor-sign-up",
  templateUrl: "./doctor-sign-up.component.html",
  styleUrls: ["./doctor-sign-up.component.css"]
})
export class DoctorSignUpComponent implements OnInit {
  departments;
  form = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(5)]),
    email: new FormControl(
      "",
      [Validators.required, Validators.email],
      EmailValidator.emailUniqueness(this.doctorService)
    ),

    password: new FormControl("", [
      Validators.required,
      Validators.minLength(10)
    ]),
    mob_number: new FormControl(
      "",
      [PhoneValidator.isValidPhone],
      PhoneValidator.mobileUniqueness(this.doctorService)
    ),

    age: new FormControl("", Validators.required),
    experience: new FormControl("", Validators.required),
    department: new FormControl("", Validators.required),
    education: new FormControl("", Validators.required),
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
  get education() {
    return this.form.get("education");
  }
  get experience() {
    return this.form.get("experience");
  }
  get department() {
    return this.form.get("department");
  }

  constructor(
    private el: ElementRef,
    private doctorService: DoctorService,
    private deptService: DeptService,
    private toastNotification: ToastNotification
  ) {}

  doctorSignUp() {
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
      this.doctorService
        .upload(formData)
        .pipe(
          switchMap(result => {
            return this.doctorService.create(this.form.value);
          })
        )
        .subscribe(() => {
          this.toastNotification.success("Record successfully created.");
        });
      setTimeout(() => {
        location.reload();
      }, 3000);
    }
  }

  ngOnInit() {
    this.deptService.getAll().subscribe(depts => (this.departments = depts));
  }
}
