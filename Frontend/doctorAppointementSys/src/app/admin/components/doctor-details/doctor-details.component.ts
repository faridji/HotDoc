import { Component, OnInit } from "@angular/core";
import { DoctorService } from "../../../shared/services/doctor.service";
import { RequestOptions, Headers } from "@angular/http";
import { AppError } from "../../../shared/app-error";
import { NotFountError } from "../../../shared/not-found-error";
import { ToastNotification } from "../../../shared/services/toast-notification.service";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalRef
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "doctor-details",
  templateUrl: "./doctor-details.component.html",
  styleUrls: ["./doctor-details.component.css"]
})
export class DoctorDetailsComponent implements OnInit {
  doctors: any[];
  filteredDoctors: any[];
  selected: boolean;
  selectedRow: any;
  addNewDoctor: boolean;
  update: boolean;
  loading: boolean;
  closeResult: string;

  modalReference: NgbModalRef;

  constructor(
    private toastNotification: ToastNotification,
    private doctorService: DoctorService,
    private modalService: NgbModal
  ) {
    this.selected = false;
    this.addNewDoctor = false;
    this.loading = false;
    this.selectedRow = {};
  }

  getSingle(row: any, index: number) {
    this.selectedRow = {};
    for (let i = 0; i < this.doctors.length; i++) {
      this.doctors[i].selected = false;
    }

    this.doctors[index].selected = true;
    this.selectedRow = row;
    this.selected = true;
    console.log(row);
  }

  delete() {
    this.modalReference.close();
    const id = this.selectedRow["_id"];
    this.doctorService.delete(id).subscribe(
      result => {
        this.toastNotification.success("Doctor is successfully deleted.");
        location.reload();
      },
      (error: AppError) => {
        if (error instanceof NotFountError)
          return this.toastNotification.error(
            "Doctor with the given Id does not exists."
          );
        this.toastNotification.error("An unexpected Error occured.");
      }
    );
  }

  addDoctor() {
    this.addNewDoctor = true;
  }

  updateDoctor() {
    this.update = true;
    console.log("Update Record");
  }

  filter(query: string) {
    console.log(query);
    this.filteredDoctors = query
      ? this.doctors.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : this.doctors;
  }

  //Show delete dialog box;
  open(content) {
    this.modalReference = this.modalService.open(content);
    this.modalReference.result.then(
      result => {
        this.closeResult = `Closed with: ${result}`;
      },
      reason => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit() {
    this.loading = true;
    this.doctorService.getAll().subscribe(
      doctors => {
        this.filteredDoctors = this.doctors = doctors;
        this.loading = false;
      },
      (error: AppError) => {
        this.toastNotification.error("An unexpected Error occured");
        this.loading = false;
      }
    );
  }
}
