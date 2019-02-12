import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../shared/services/auth.service";
import { User } from "../../../shared/models/User";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  user: User;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = this.auth.currentUser;

    if (this.user) {
      // Check if user is admin,

      if (this.user.isAdmin) {
        this.router.navigate(["adminPanel"]);
      } else {
        let returnUrl = localStorage.getItem("returnUrl");
        this.router.navigateByUrl(returnUrl);
      }
    }
  }
}
