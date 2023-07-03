import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import Form from './models/Form';
import formChange from './models/formChange';
import formChild from './models/formChild';

@Injectable({
  providedIn: 'root',
})
export class FormServiceService {
  apiServiceUrl = 'http://localhost:8080';

  public http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public getForms(): Observable<Form[]> {
    return this.http.get<Form[]>(`${this.apiServiceUrl}/audit/allForms`);
  }

  public getForm(id: Number): Observable<Form> {
    return this.http.get<Form>(`${this.apiServiceUrl}/audit/form?formId=${id}`);
  }

  public addForm({
    firstName,
    lastName,
    email,
    jobTitle,
    address,
    gender,
    dob,
    phone,
    lastEditedBy,
    formId = 100,
  }: Form): Observable<Form> {
    var k = this.http.post<Form>(`${this.apiServiceUrl}/audit/submit`, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      address: address,
      gender: gender,
      dob: dob,
      jobTitle: jobTitle,
      phone: phone,
      lastEditedBy: lastEditedBy,
    });
    return k;
  }

  public deleteForm(id: Number): Observable<void> {
    return this.http.delete<void>(`${this.apiServiceUrl}/audit/delete/${id}`);
  }

  public updateForm(
    frm: Form,
    lastEditedBy: String,
    formId: Number
  ): Observable<Form> {
    return this.http.put<Form>(`${this.apiServiceUrl}/audit/update`, {
      firstName: frm.firstName,
      lastName: frm.lastName,
      email: frm.email,
      address: frm.address,
      gender: frm.gender,
      dob: frm.dob,
      phone: frm.phone,
      jobTitle: frm.jobTitle,
      lastEditedBy: lastEditedBy,
      formId: formId,
    });
  }

  public getAuditDetails(formId: Number): Observable<formChild> {
    return this.http.get<formChild>(
      `${this.apiServiceUrl}/audit/auditLog/${formId}`
    );
  }
}
