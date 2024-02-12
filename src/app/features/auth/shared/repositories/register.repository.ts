import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterRepository {
  private registerUrl = '/api/v1/register';
  private checkAvailabilityUrl = '/api/v1/check-availability';

  constructor(private http: HttpClient) { }

  register(formData: any): Observable<any> {
    return this.http.post(this.registerUrl, formData);
  }

  checkAvailability(username: string, email: string): Observable<any> {
    let params = new HttpParams().set('username', username).set('email', email);
    return this.http.get(this.checkAvailabilityUrl, { params: params });
  }
}
