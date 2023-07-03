import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import 'ag-grid-enterprise';

import { rowEditComponent } from './row-edit.component';

import { RouterModule, Routes } from '@angular/router';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{ path: `auditLog`, component: AuditLogComponent},{path:``,component:HomeComponent}];

@NgModule({
  declarations: [AppComponent, rowEditComponent, AuditLogComponent, HomeComponent],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgGridModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
