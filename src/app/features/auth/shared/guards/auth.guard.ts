import {CanActivateFn, Router} from "@angular/router";
import {inject} from "@angular/core";

export const AuthGuard: CanActivateFn = (): boolean => {
  const router: Router = inject(Router);
  const token = localStorage.getItem("loggedIn");
  if (token === "true" ) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
}
