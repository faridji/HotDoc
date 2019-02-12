import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ToastyModule } from "ng2-toasty";

import { AuthService } from "./services/auth.service";
import { DataService } from "./services/data.service";
import { DeptService } from "./services/dept.service";
import { DoctorService } from "./services/doctor.service";
import { PatientAuthGuard } from "./services/patient-auth-guard.service";
import { PatientService } from "./services/patient.service";
import { ToastNotification } from "./services/toast-notification.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot(),
    NgbModule.forRoot()
  ],

  declarations: [],
  providers: [
    PatientService,
    DoctorService,
    DeptService,
    AuthService,
    PatientAuthGuard,
    ToastNotification
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastyModule.forRoot().ngModule,
    NgbModule.forRoot().ngModule
  ]
})
export class SharedModule {}
