import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginService } from "../../shared/services/login.service";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {LoginData} from "../../models/auth.model";
import {SnackbarService, SnackbarStatus} from "@shared";

import {TranslateModule, TranslateService} from "@ngx-translate/core";



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, MatInputModule, MatButtonModule, TranslateModule],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  private _fb: FormBuilder = inject(FormBuilder);
  private _authService: LoginService = inject(LoginService);
  private _router: Router  = inject(Router);
  private _snackbarService = inject(SnackbarService);
  private _route: ActivatedRoute = inject(ActivatedRoute);
  private _translate = inject(TranslateService);



  loginForm = this._fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });


  constructor() {
    this._route.queryParams.subscribe(params => {
      const username = params['username'];
      if (username) {
        this.loginForm.patchValue({username});
      }
    });

  }


  onLogin() {
    if (this.loginForm.valid) {
      const formData: LoginData = this.loginForm.value as LoginData;
      this._authService.login(formData).subscribe({
        next: (token) => {

          const logged = this._translate.instant('Toasts.login-success');

          this._snackbarService.openSnackBar(logged, SnackbarStatus.success);

          setTimeout(() => this._router.navigate(['/profil']), 1200);
        },
        error: (error) => {
          console.error(error);

          const logFailed = this._translate.instant('Toasts.login-fail');
          this._snackbarService.openSnackBar(logFailed, SnackbarStatus.error);

         

        }
      });
    }
  }
}
