import { Component, OnInit } from "@angular/core";
import { RequestOptions, Headers } from "@angular/http";
import { PatientService } from "../../../shared/services/patient.service";
import { AppError } from "../../../shared/app-error";
import { NotFountError } from "../../../shared/not-found-error";
import { BadInput } from "../../../shared/bad-input";
import { ToastNotification } from "../../../shared/services/toast-notification.service";
import {
  NgbModal,
  NgbModalRef,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "patient-details",
  templateUrl: "./patient-details.component.html",
  styleUrls: ["./patient-details.component.css"]
})
export class PatientDetailsComponent implements OnInit {
  patients: any[];
  filteredPatients: any[];

  selectedRow: any;
  selected: boolean;
  loading: boolean;
  showDescriptionBtn: boolean;
  showDescriptionPane: boolean;

  closeResult: string;
  modalReference: NgbModalRef;

  constructor(
    private toastNotification: ToastNotification,
    private patientService: PatientService,
    private modalService: NgbModal
  ) {
    this.selected = false;
    this.showDescriptionBtn = false;
    this.selectedRow = {};
    this.loading = false;
  }

  getSingle(row: any, index: number) {
    this.selectedRow = {};
    for (let i = 0; i < this.patients.length; i++) {
      this.patients[i].selected = false;
    }

    this.patients[index].selected = true;
    this.selectedRow = row;
    this.selected = true;
    if (row["Date"]) this.showDescriptionBtn = true;
  }

  addDescription() {
    this.showDescriptionPane = true;
  }

  addMedicine(form) {
    let options = {
      email: this.selectedRow["email"],
      medicines: form["medicines"]
    };
    this.patientService.addMedicines(options).subscribe(
      result => {
        this.toastNotification.success(
          "Medicines are added to Patient record."
        );

        location.reload();
      },

      error => {
        this.toastNotification.error("An unexpected Error occured");
        console.log(error);
      }
    );
  }

  //Show delete dialog box;
  openDialog(content) {
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

  delete() {
    this.modalReference.close();
    let id = this.selectedRow["_id"];

    this.patientService.delete(id).subscribe(
      result => {
        this.toastNotification.success("Patient Successfully Deleted.");
        location.reload();
      },
      (error: AppError) => {
        if (error instanceof NotFountError)
          return this.toastNotification.error(
            "Patient with the given Id does not exists"
          );
      }
    );
  }

  filter(query: string) {
    this.filteredPatients = query
      ? this.patients.filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase())
        )
      : this.patients;
  }

  ngOnInit() {
    this.loading = true;
    this.patientService.getAll().subscribe(
      patients => {
        this.filteredPatients = this.patients = patients;
        this.loading = false;
      },
      (error: AppError) => {
        this.toastNotification.error("An unexpected Error occured.");
        this.loading = false;
      }
    );
  }
}
