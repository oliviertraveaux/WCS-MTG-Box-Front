import {inject, Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {ENVIRONMENT} from "../../../../../env";


@Injectable()
export class ApiService {


  private readonly http = inject(HttpClient)
  private url = `${ENVIRONMENT.url}`;

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(this.url + path, {
      headers: this.getHeaders(),
      withCredentials: true,
    });
  }

  private getHeaders() {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }
}
