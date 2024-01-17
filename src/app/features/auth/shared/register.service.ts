import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registerUrl = '/api/v1/register';

  constructor(private http: HttpClient) { }

  register(formData: any) {
    return this.http.post(this.registerUrl, formData);
  }
}
