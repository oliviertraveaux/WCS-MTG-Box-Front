import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ENVIRONMENT} from "../../../../../backend-endpoints";
import {Observable} from "rxjs";
import {UserInfo} from "../../../../shared/user/models/user-info.interface";


@Injectable({
  providedIn: 'root'
})
export class VerifyTokenRepository {
  private http = inject(HttpClient);
  verifyTokenUrl: string = ENVIRONMENT.apiVerifyTokenURL;

  public verifyToken(): Observable<UserInfo> {
    const options = {
      withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<UserInfo>(this.verifyTokenUrl, options);
  }
}
