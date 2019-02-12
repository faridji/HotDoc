import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";

import { AdminModule } from "./admin/admin.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { MembershipModule } from "./membership/membership.module";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    CoreModule,
    MembershipModule,
    HttpModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
