import { Component, OnInit } from "@angular/core";
import { DeptService } from "../../../shared/services/dept.service";
import { RequestOptions, Headers } from "@angular/http";
import { AppError } from "../../../shared/app-error";
import { NotFountError } from "../../../shared/not-found-error";
import { ToastNotification } from "../../../shared/services/toast-notification.service";
import {
  NgbModalRef,
  NgbModal,
  ModalDismissReasons
} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "depart-details",
  templateUrl: "./departments-details.component.html",
  styleUrls: ["./departments-details.component.css"]
})
export class DepartmentsDetailsComponent implements OnInit {
  departments: any[];
  filteredDepartments: any[];
  selected: boolean;
  selectedRow: any;
  addNewDept: boolean;
  loading: boolean;

  closeResult: string;
  modalReference: NgbModalRef;

  constructor(
    private toastNotification: ToastNotification,
    private deptService: DeptService,
    private modalService: NgbModal
  ) {
    this.selected = false;
    this.addNewDept = false;
    this.loading = false;
    this.selectedRow = {};
  }

  getSingle(row: any, index: number) {
    this.selectedRow = {};
    for (let i = 0; i < this.departments.length; i++) {
      this.departments[i].selected = false;
    }

    this.departments[index].selected = true;
    this.selectedRow = row;
    this.selected = true;
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

    const id = this.selectedRow["_id"];
    this.deptService.delete(id).subscribe(
      result => {
        this.toastNotification.success("Department is successfully deleted");
        location.reload();
      },
      (error: AppError) => {
        if (error instanceof NotFountError)
          return this.toastNotification.error(
            "Department with the given Id does not exists."
          );

        this.toastNotification.error("An unexpected Error occured.");
      }
    );
  }

  addDept() {
    this.addNewDept = true;
  }

  filter(query: string) {
    this.filteredDepartments = query
      ? this.departments.filter(d =>
          d.name.toLowerCase().includes(query.toLowerCase())
        )
      : this.departments;
  }

  ngOnInit() {
    this.loading = true;
    this.deptService.getAll().subscribe(
      departments => {
        this.filteredDepartments = this.departments = departments;
        this.loading = false;
      },
      (error: AppError) =>
        this.toastNotification.success("An unexpected Error occured.")
    );
  }
}
