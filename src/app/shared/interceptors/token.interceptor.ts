import {HttpEvent, HttpHandlerFn, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {inject} from "@angular/core";
import {TokenService} from "../services/token-service";

export function tokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {

  function saveToken() {
    inject(TokenService).saveToken()
  }
  saveToken()

  const token = inject(TokenService).getToken()
  console.log("token", token)
  const newReq = req.clone(req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token,
    },
  }))
  console.log("new req", newReq)

  return next(newReq);
}
