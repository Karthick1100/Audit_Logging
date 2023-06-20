import { Component, OnInit } from '@angular/core';
import Form from './Form';
import { FormServiceService } from './form-service.service';
import { InitialNavigation } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  fs:FormServiceService;
  frmId:Number=0;
  filteredForms:Form[]=[];
  Forms: Form[]=[];
  editEmployee:Form={
    formId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    dob: '',
    jobTitle: '',
    lastEditedBy: ''
  };
  deleteEmployee:Form={
    formId: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    gender: '',
    dob: '',
    jobTitle: '',
    lastEditedBy: ''
  };

  constructor(fs:FormServiceService){this.fs=fs}

  ngOnInit(): void {
    this.getAllForm();
  }

  public getAllForm():void{
    this.fs.getForms().subscribe(
      (value: Form[]) => {this.Forms=value;
        this.filteredForms=this.Forms},
      (error: any) =>{console.log(error)}
    )
  }

  public onOpenModal(Form:Form,mode:String):void{
    var container=document.getElementById('main-component');
    var button=document.createElement('button');
    button.type='button';
    button.style.display='none';
    button.setAttribute('data-bs-toggle','modal');
    if(mode==='add')
    {
      button.setAttribute('data-bs-target','#addEmployeeModal');
    }
    else if(mode==='update')
    {
      this.editEmployee=Form;
      this.frmId=Form.formId;
      button.setAttribute('data-bs-target','#updateEmployeeModal');
      
    }
    else if(mode==='delete')
    {
      this.deleteEmployee=Form;
      button.setAttribute('data-bs-target','#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

  public onAddEmployee(Form:Form):void{
    var lastEditedBy=prompt("Enter your username");
    this.fs.addForm({firstName:Form.firstName!,lastName:Form.lastName!,jobTitle:Form.jobTitle!,email:Form.email!,address:Form.address!,gender:Form.gender!,phone:Form.phone!,lastEditedBy:lastEditedBy!,dob:Form.dob.toString()!,formId:100}).subscribe(
      (value:Form)=>{this.getAllForm();},
      (error:HttpErrorResponse)=>{console.log(error.message)}
    )
    alert("Your form has been added successfully!");
    document.getElementById("add-employee-form")?.click();
    
  }

  public onEditEmployee(editedData:Form):void{
    var lastEditedBy=prompt("Enter your username");
    this.fs.updateForm(editedData,lastEditedBy!,this.frmId).subscribe(
      (value:Form)=>{return value},
      (error:HttpErrorResponse)=>{console.log(error)}
    )
    alert("Your form has been updated successfully!");
    document.getElementById("edit-employee-form")?.click();
    this.getAllForm();
  }

  public onDeleteEmployee(deleteEmployeeId:Number):void{
    this.fs.deleteForm(deleteEmployeeId).subscribe((value:void)=>{this.getAllForm();},
    (error:HttpErrorResponse)=>{
      console.log(error);
    })
    
    
  }

  public getFormById(id:Number):void{
    this.fs.getForm(id).subscribe(
      (value: Form) => {return value},
      (error: HttpErrorResponse) =>{console.log(error.message)}
    )
  }


  public searchBar(searchText:any):void{
    if (!searchText) {
      this.filteredForms = this.Forms;
    }

    else{
      
      this.filteredForms = this.Forms.filter(
        form => form?.firstName.toLowerCase().includes(searchText.searchText.toLowerCase())
      );
      console.log(this.filteredForms);
      }
  }
}
  

  



