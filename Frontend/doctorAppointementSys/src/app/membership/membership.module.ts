import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "../shared/shared.module";
import { AdminSignInComponent } from "./components/admin-sign-in/admin-sign-in.component";
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";
import { LoginMainPageComponent } from "./components/login-main-page/login-main-page.component";
import { PatientSignInComponent } from "./components/patient-sign-in/patient-sign-in.component";
import { SignupComponent } from "./components/signup/signup.component";

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: "login-options",
        component: LoginMainPageComponent
      },

      {
        path: "patientSignIn",
        component: PatientSignInComponent
      },

      {
        path: "adminSignIn",
        component: AdminSignInComponent
      },

      {
        path: "password/reset",
        component: ForgetPasswordComponent
      },

      {
        path: "sign-up",
        component: SignupComponent
      }
    ])
  ],
  declarations: [
    LoginMainPageComponent,
    PatientSignInComponent,
    AdminSignInComponent,
    SignupComponent,
    ForgetPasswordComponent
  ],
  exports: [SignupComponent]
})
export class MembershipModule {}
