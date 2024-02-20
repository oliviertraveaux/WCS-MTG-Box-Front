import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {RegisterRepository} from "../repositories/register.repository";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private registerRepository : RegisterRepository) { }

  register(formData: any): Observable<any> {
    return this.registerRepository.register(formData);
  }

  checkAvailability(username: string, email: string): Observable<any> {
    return this.registerRepository.checkAvailability(username, email);
  }
}
