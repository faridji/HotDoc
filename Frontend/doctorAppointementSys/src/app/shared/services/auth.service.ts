import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map, catchError } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ActivatedRoute, Router } from "@angular/router";
import { throwError } from "rxjs";
import { BadInput } from "../bad-input";
import { AppError } from "../app-error";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private url = "http://127.0.0.1:3000/Authenticate";
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: Http
  ) {}

  patientSignIn(resources) {
    let returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "/";
    localStorage.setItem("returnUrl", returnUrl);

    return this.http
      .post(this.url + "/patient", resources)
      .pipe(
        map(response => {
          let result = response.json();
          if (result && result.token) {
            localStorage.setItem("token", result.token);
            return result;
          } else {
            return result;
          }
        })
      )
      .pipe(catchError(this.handleError));
  }

  adminSignIn(resources) {
    return this.http
      .post(this.url + "/admin", resources)
      .pipe(
        map(response => {
          let result = response.json();
          if (result && result.token) {
            localStorage.setItem("token", result.token);
            return true;
          } else {
            return false;
          }
        })
      )
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 400) return throwError(new BadInput(error["_body"]));

    return throwError(new AppError());
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(["home"]);
  }

  get currentUser() {
    let token = localStorage.getItem("token");
    if (!token) return null;

    const helper = new JwtHelperService();

    return helper.decodeToken(token);
  }
}
