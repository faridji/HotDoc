import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { map } from "rxjs/operators";
import { DataService } from "./data.service";

@Injectable({
  providedIn: "root"
})
export class DoctorService extends DataService {
  private httpService;
  constructor(http: Http) {
    super("http://127.0.0.1:3000/Doctors", http);
    this.httpService = http;
  }

  emailVerification(emailId) {
    return this.httpService
      .get("http://127.0.0.1:3000/Doctors/EmailValidation/" + emailId)
      .pipe(map(response => response));
  }

  mobileValidation(mobileNumber) {
    return this.httpService
      .get("http://127.0.0.1:3000/Doctors/mobileValidation/" + mobileNumber)
      .pipe(map(response => response));
  }
}
