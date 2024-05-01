import {Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { LoginRepository } from "../../../shared/repositories/login.repository";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LoginService} from "../../../shared/services/login.service";
import {AlertService} from "../../../../../shared/services/alert.service";
import {SnackbarStatus} from "../../../../../shared/enums/snackbar-status.enum";
import {MatDialogRef} from "@angular/material/dialog";
import {ModalForgottenPassword} from "./modal-email/modal-email-forgotten/modal-email-forgotten.component";

@Component({
  selector: 'app-forgotten-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    TranslateModule,

  ],
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.scss']
})
export class ForgottenPasswordComponent implements OnInit {

  private _alertService = inject(AlertService);
  private _router: Router = inject(Router);
  private _translate = inject(TranslateService);

  form!: FormGroup;
  message: string = '';

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const token = params['token'];
      this.initializeForm(token);
    });
  }

  initializeForm(token: string) {
    this.form = this.fb.group({
      token: [token, Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  resetPassword() {
    if (this.form.valid) {
      const payload = {
        plainPassword: this.form.value.newPassword,
        plainPasswordVerification: this.form.value.confirmPassword
      };
      this.loginService.resetPassword(this.form.value.token, payload).subscribe({
        next: () => {
          const successMessage = this._translate.instant('Toasts.reset-password-success');
          this._alertService.openSnackBar(successMessage, SnackbarStatus.success);
          setTimeout(() => this._router.navigate(['/login']), 2000);

        },
        error: (err) => {
          const errorMessage = this._translate.instant('Toasts.reset-password-fail');
          this._alertService.openSnackBar(errorMessage, SnackbarStatus.error);
          this.message = `Error: ${err.message}`;
        },
      });
    }
  }



  passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { 'mismatch': true };
    }
    return null;
  }
}
