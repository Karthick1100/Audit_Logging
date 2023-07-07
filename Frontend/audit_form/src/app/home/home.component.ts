import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';

import { rowEditComponent } from '../row-edit.component';
import { FormServiceService } from '../form-service.service';
import { ColDef } from 'ag-grid-community';
import Form from '../models/Form';
import { Router } from '@angular/router';
import * as $ from 'jquery';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public gridApi: any;
  public gridColumnApi: any;

  fs: FormServiceService;
  frmId: Number = 0;
  Forms: Form[] = [];
  rowData: any[] = [];
  colDefs: ColDef[] = [];
  defaultColDef: ColDef = { sortable: true, filter: true };

  editEmployee: Form = {
    formId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    dob: '',
    jobTitle: '',
    lastEditedBy: '',
  };

  deleteEmployee: Form = {
    formId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    dob: '',
    jobTitle: '',
    lastEditedBy: '',
  };

  
  constructor(fs: FormServiceService,public router:Router) {
    this.fs = fs;
  }

  ngOnInit(): void {
    this.getAllForm();
    this.colDefs = [
      {
        headerName: 'Row',
        field: 'No',
        valueGetter: 'node.rowIndex + 1',
        width: 30,
      },
      { field: 'firstName' },
      { field: 'lastName' },
      { field: 'email' },
      { field: 'phone' },
      { field: 'address' },
      { field: 'gender' },
      { field: 'dob' },
      { field: 'jobTitle' },
      {
        field: 'action',
        cellRenderer: rowEditComponent,
        width:300,
        cellRendererParams: {
          callback: this.onOpenModal.bind(this),
        },
        suppressNavigable: true,
        suppressCellFlash: true,
        cellStyle: { border: 'none' },
      },
    ];
    console.log($);
  }

  public getAllForm(): void {
    this.fs.getForms().subscribe(
      (value: Form[]) => {
        this.rowData = value;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  public onOpenModal(Form: Form, mode: String): void {
    var container = document.getElementById('main-component');
    var button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addEmployeeModal');
    } else if (mode === 'update') {
      this.editEmployee = Form;
      this.frmId = Form.formId;
      button.setAttribute('data-bs-target', '#updateEmployeeModal');
    } else if (mode === 'delete') {
      this.deleteEmployee = Form;
      button.setAttribute('data-bs-target', '#deleteEmployeeModal');
    } else if (mode === 'auditLog') {
      
      this.router.navigateByUrl('auditLog', { state: { id: Form.formId } })
      return;
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddEmployee(Form: Form): void {
    var lastEditedBy = prompt('Enter your username');
    this.fs
      .addForm({
        firstName: Form.firstName!,
        lastName: Form.lastName!,
        jobTitle: Form.jobTitle!,
        email: Form.email!,
        address: Form.address!,
        gender: Form.gender!,
        phone: Form.phone!,
        lastEditedBy: lastEditedBy!,
        dob: Form.dob.toString()!,
        formId: 100,
      })
      .subscribe(
        (value: Form) => {
          this.getAllForm();
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
      (<any>$('.alert')).alert();
    document.getElementById('add-employee-form')?.click();
  }

  public onEditEmployee(editedData: Form): void {
    var lastEditedBy = prompt('Enter your username');
    this.fs.updateForm(editedData, lastEditedBy!, this.frmId).subscribe(
      (value: Form) => {
        return value;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
    (<any>$('.alert')).alert();
    document.getElementById('edit-employee-form')?.click();
    this.getAllForm();
  }

  public onDeleteEmployee(deleteEmployeeId: Number): void {
    this.fs.deleteForm(deleteEmployeeId).subscribe(
      (value: void) => {
        this.getAllForm();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public getFormById(id: Number): void {
    this.fs.getForm(id).subscribe(
      (value: Form) => {
        return value;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
