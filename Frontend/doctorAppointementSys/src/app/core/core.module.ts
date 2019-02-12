import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { PatientAuthGuard } from "../shared/services/patient-auth-guard.service";
import { SharedModule } from "../shared/shared.module";
import { AboutComponent } from "./components/about/about.component";
import { AppointmentsComponent } from "./components/appointments/appointments.component";
import { BsNavbarComponent } from "./components/bs-navbar/bs-navbar.component";
import { DepartmentsComponent } from "./components/departments/departments.component";
import { DetailsComponent } from "./components/details/details.component";
import { DoctorInfoComponent } from "./components/doctor-info/doctor-info.component";
import { DoctorsComponent } from "./components/doctors/doctors.component";
import { HomeComponent } from "./components/home/home.component";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: "", redirectTo: "home", pathMatch: "full" },
      { path: "home", component: HomeComponent },
      {
        path: "appointment",
        component: AppointmentsComponent,
        canActivate: [PatientAuthGuard]
      },

      {
        path: "patientDetails",
        component: DetailsComponent,
        canActivate: [PatientAuthGuard]
      },

      {
        path: "departments",
        component: DepartmentsComponent
      },

      {
        path: "doctors",
        component: DoctorsComponent
      },

      {
        path: "doctorDetails/:id",
        component: DoctorInfoComponent
      },

      {
        path: "about",
        component: AboutComponent
      }
    ])
  ],
  declarations: [
    BsNavbarComponent,
    AboutComponent,
    HomeComponent,
    DepartmentsComponent,
    DoctorsComponent,
    DoctorInfoComponent,
    AppointmentsComponent,
    DetailsComponent
  ],
  exports: [BsNavbarComponent]
})
export class CoreModule {}
