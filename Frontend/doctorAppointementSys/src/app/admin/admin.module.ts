import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { MembershipModule } from "../membership/membership.module";
import { SharedModule } from "../shared/shared.module";
import { DepartmentsDetailsComponent } from "./components/departments-details/departments-details.component";
import { DeptSignUpComponent } from "./components/dept-sign-up/dept-sign-up.component";
import { DoctorDetailsComponent } from "./components/doctor-details/doctor-details.component";
import { DoctorSignUpComponent } from "./components/doctor-sign-up/doctor-sign-up.component";
import { PatientDetailsComponent } from "./components/patient-details/patient-details.component";
import { RecordsComponent } from "./components/records/records.component";
import { AdminAuthGuardService } from "./services/admin-auth-guard.service";

@NgModule({
  imports: [
    MembershipModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: "adminPanel",
        component: RecordsComponent,
        canActivate: [AdminAuthGuardService]
      }
    ])
  ],
  declarations: [
    DoctorDetailsComponent,
    PatientDetailsComponent,
    DepartmentsDetailsComponent,
    DeptSignUpComponent,
    DoctorSignUpComponent,
    RecordsComponent
  ],
  providers: [AdminAuthGuardService]
})
export class AdminModule {}
