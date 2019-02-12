import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { AppError } from "../app-error";
import { NotFountError } from "../not-found-error";
import { BadInput } from "../bad-input";

export class DataService {
  constructor(private url: string, private http: Http) {}

  create(resources) {
    return this.http
      .post(this.url, resources)
      .pipe(map(response => response.json()))
      .pipe(catchError(this.handleError));
  }

  get(id) {
    return this.http
      .get(this.url + "/" + id)
      .pipe(map(response => response.json()))
      .pipe(catchError(this.handleError));
  }

  getAll() {
    return this.http
      .get(this.url)
      .pipe(map(response => response.json()))
      .pipe(catchError(this.handleError));
  }

  update(resources) {
    return this.http
      .put(this.url, resources)
      .pipe(map(response => response.json()))
      .pipe(catchError(this.handleError));
  }

  delete(id) {
    return this.http
      .delete(this.url + "/" + id)
      .pipe(map(response => response.json()))
      .pipe(catchError(this.handleError));
  }

  upload(resources) {
    return this.http
      .post(this.url + "/imageUpload", resources)
      .pipe(map(response => response))
      .pipe(catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status == 400) return throwError(new BadInput(error["_body"]));

    if (error.status == 404) return throwError(new NotFountError());

    return throwError(new AppError(error));
  }
}
