import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DoctorService } from "../../../shared/services/doctor.service";
import { PatientService } from "../../../shared/services/patient.service";
import { AuthService } from "../../../shared/services/auth.service";
import { DeptService } from "../../../shared/services/dept.service";
import { switchMap } from "rxjs/operators";
import { AppError } from "../../../shared/app-error";
import { ToastNotification } from "../../../shared/services/toast-notification.service";

@Component({
  selector: "app-appointments",
  templateUrl: "./appointments.component.html",
  styleUrls: ["./appointments.component.css"]
})
export class AppointmentsComponent implements OnInit {
  user;
  model;
  doctors;
  departments;

  //Date Variables for initialization of datePicker
  day: number;
  month: number;
  year: number;

  constructor(
    private router: Router,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private deptService: DeptService,
    private toastNotification: ToastNotification,
    private auth: AuthService
  ) {
    this.user = auth.currentUser;
  }

  populateDoctors() {
    console.log('')
  }
  appointDoctor(patientDetails) {
    const date = new Date(
      this.model.year,
      this.model.month - 1,
      this.model.day
    );

    const options = {
      id: this.user["_id"],
      doctor: patientDetails["doctor"],
      department: patientDetails["department"],
      date: date
    };
    this.patientService
      .update(options)
      .subscribe(
        result => this.router.navigate(["patientDetails"]),
        (error: AppError) =>
          this.toastNotification.error("An unexpected Error occured.")
      );
  }

  ngOnInit() {
    // Get Doctor and Departments information;
    this.user = this.auth.currentUser;
    this.doctorService
      .getAll()
      .pipe(
        switchMap(doctors => {
          this.doctors = doctors;
          return this.deptService.getAll();
        })
      )
      .subscribe(
        departments => (this.departments = departments),
        (error: AppError) =>
          this.toastNotification.error("An unexpected Error occured.")
      );

    //Initialize the datePicker with today date;
    const date = new Date();
    this.day = date.getDate();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
  }
}
