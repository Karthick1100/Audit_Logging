import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { rowEditComponent } from '../row-edit.component';
import { FormServiceService } from '../form-service.service';
import { ColDef } from 'ag-grid-community';
import Form from '../models/Form';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  pageNumber:number=0;
  sliderNumber:number=0;

  constructor(fs: FormServiceService,public router:Router,public toastr:ToastrService) {
    this.fs = fs;
  }

  ngOnInit(): void {
    this.getFormByPage(0);
    this.colDefs = [
      {
        headerName: 'Row',
        field: 'No',
        valueGetter: 'node.rowIndex + 1',
        width: 30,
      },
      { field: 'firstName',flex:4,minWidth:150},
      { field: 'lastName',flex:4,minWidth:150 },
      { field: 'email',flex:5,minWidth:200 },
      { field: 'phone',flex:5,minWidth:200 },
      { field: 'address',flex:7,minWidth:300 },
      { field: 'gender',flex:3,minWidth:100 },
      { field: 'dob',flex:4,minWidth:150 },
      { field: 'jobTitle',flex:4,minWidth:200 },
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

  public onAddEmployee(Form: Form,model:any): void {
    
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
        dob: Form.dob!.toString(),
        formId: 100,
      })
      .subscribe(
        (value: Form) => {
          this.getAllForm();
          model.reset()
        },
        (error: HttpErrorResponse) => {
          console.log(error.message);
        }
      );
      document.getElementById('add-employee-form')?.click();
      this.toastr.success('Employee has been added successfully!','Employee added');
  }

  public onEditEmployee(editedData: Form): void {
    var lastEditedBy = prompt('Enter your username');
    this.fs.updateForm(editedData, lastEditedBy!, this.frmId).subscribe(
      (value: Form) => {
        this.getAllForm();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
   
    document.getElementById('edit-employee-form')?.click();
    this.toastr.success('Employee has been edited successfully!','Employee edited');
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
    this.toastr.success('Employee has been deleted successfully!','Employee deleted');
    
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

  public getFormByPage(pageNumber:number){
    if(pageNumber<0){
      this.pageNumber=0;
      pageNumber=0;
    }
    
    this.fs.getPageForm(pageNumber).subscribe(
    (value: Form[]) => {
      
      if(value.length==0){
        this.pageNumber=this.sliderNumber;
        this.toastr.error("No page available","Failed");
        return;
      }
      else{
        this.sliderNumber=pageNumber;
        this.pageNumber=pageNumber;
      }
      this.rowData=value;
    },
    (error: HttpErrorResponse) => {
      console.log(error.message);
    })
    
  }

  onGridReady(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }
}
