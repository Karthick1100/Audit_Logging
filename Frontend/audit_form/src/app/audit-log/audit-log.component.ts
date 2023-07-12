import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { FormServiceService } from '../form-service.service';
import { Observable, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  defaultColDef: ColDef = { sortable: true, filter: true };

  constructor(public router:Router, fs:FormServiceService,public toastr:ToastrService) {
    this.fs=fs;
    this.frmId=this.router.getCurrentNavigation()?.extras.state?.['id'];
    this.getAuditDetails();
  }

  ngOnInit(): void {
    this.colDefs=[
      {field:'changeId',flex:1},
      {field:'columnName',flex:3},
      {field:'oldValue',flex:5},
      {field:'newValue',flex:5}
    ]
  }

  getAuditDetails():void{
    this.fs.getAuditDetails(this.frmId).subscribe((value:any)=>{
      this.rowData=value;
    },(error:any)=>{console.log(error)})
  }


  getFilteredAuditDetails(val:any):void{
    const today: Date = new Date();

    const year: number = today.getFullYear();
    const month: number = today.getMonth() + 1; // Months are zero-based, so we add 1
    const day: number = today.getDate();

    // Pad single-digit months and days with a leading zero if necessary
    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;
    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;

    const formattedDate: string = `${year}-${formattedMonth}-${formattedDay}`;
    if(val.from==""){
      val.from=formattedDate; 
    }
    if(val.to==""){
      val.to=formattedDate;
    }
    this.fs.getFilteredAuditDet(this.frmId,val.from,val.to).subscribe((value:any)=>{
      this.rowData=value;
    },(error:any)=>{console.log(error)});
    this.toastr.success(`Audit log has been fetched from ${val.from} to ${val.to}`,'Filter Applied');
  }

}
