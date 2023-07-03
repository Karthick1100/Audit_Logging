import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { FormServiceService } from './form-service.service';

import Form from './models/Form';

@Component({
  selector: 'child-cell',
  template: ` <button
      type="button"
      (click)="onClick('update')"
      data-action-type="view"
      class="btn btn-primary "
      style="margin-right:4px ;"
    >
      Edit
    </button>

    <button
      type="button"
      (click)="onClick('delete')"
      data-action-type="remove"
      class="btn btn-danger"
    >
      Delete
    </button>
    <button
      type="button"
      (click)="onClick('auditLog')"
      data-action-type="view"
      class="btn btn-dark "
      style="margin-right:4px ;"
    >
      Audit Log
    </button>`,
  styles: [
    `
      .btn {
        line-height: 0.5;
      }
    `,
  ],
})
export class rowEditComponent implements ICellRendererAngularComp {
  public params: any;

  public previousData: any;

  fs: FormServiceService;

  agInit(params: any): void {
    this.params = params;
  }

  constructor(fs: FormServiceService) {
    this.fs = fs;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.methodFromParent(
      `Row: ${this.params.node.rowIndex}, Col: ${this.params.colDef.headerName}`
    );
  }

  refresh(): boolean {
    return false;
  }

  onClick(mode: String): void {
    this.params.callback(this.params.node.data, mode);
  }
}
