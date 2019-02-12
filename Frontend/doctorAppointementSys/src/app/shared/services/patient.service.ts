import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable()
export class PatientService extends DataService{
  private httpService;
  constructor(http: Http) {
    super('http://127.0.0.1:3000/Patients',http);  
    this.httpService = http;
   }

  addMedicines(resources) {
    return this.httpService.put('http://127.0.0.1:3000/Patients' + '/addMedicines', resources) 
    .pipe(map(response => response));
  }

  emailVerification(emailId) {
    return this.httpService.get('http://127.0.0.1:3000/Patients/EmailValidation/' + emailId) 
    .pipe(map(response => response));
  }

  mobileValidation(mobileNumber) {
    return this.httpService.get('http://127.0.0.1:3000/Patients/mobileValidation/' + mobileNumber) 
    .pipe(map(response => response));
  }

}