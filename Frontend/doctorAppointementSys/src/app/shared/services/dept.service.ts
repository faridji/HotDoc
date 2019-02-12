import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class DeptService extends DataService{

  constructor(http: Http) { 
    super('http://127.0.0.1:3000/Departments', http)
  }
}
