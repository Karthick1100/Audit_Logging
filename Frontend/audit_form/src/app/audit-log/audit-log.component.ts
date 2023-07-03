import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { FormServiceService } from '../form-service.service';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: ['./audit-log.component.css'],
})
export class AuditLogComponent implements OnInit {

  rowData:any[]=[];
  colDefs:ColDef[]=[];

  fs:FormServiceService;
  frmId:Number=0;

  
 

  constructor(public router:Router, fs:FormServiceService) {
    this.fs=fs;
    this.frmId=this.router.getCurrentNavigation()?.extras.state?.['id'];
    this.getAuditDetails();
  }

  

  ngOnInit(): void {
    this.colDefs=[
      {field:'changeId',width:125},
      {field:'columnName'},
      {field:'oldValue'},
      {field:'newValue'}
    ]
   

   
  }

  getAuditDetails():void{
    this.fs.getAuditDetails(this.frmId).subscribe((value:any)=>{
      this.rowData=value;
    },(error:any)=>{console.log(error)})
  }

}
