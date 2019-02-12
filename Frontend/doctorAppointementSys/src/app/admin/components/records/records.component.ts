import { Component } from "@angular/core";
import { AuthService } from "../../../shared/services/auth.service";

@Component({
  selector: "app-records",
  templateUrl: "./records.component.html",
  styleUrls: ["./records.component.css"]
})
export class RecordsComponent {
  user;
  constructor(private auth: AuthService) {
    this.user = this.auth.currentUser;
  }

  logout() {
    this.auth.logout();
  }
}
