import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginData } from '../../models/auth.model';
import { LoginService } from '../../shared/services/login.service';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnackbarStatus } from '../../../../shared/enums/snackbar-status.enum';
import { AlertService } from '../../../../shared/services/alert.service';
import { ReconnectUserService } from '../../shared/services/reconnect-user.service';
import {MatDialog} from "@angular/material/dialog";
import {
  ModalForgottenPassword
} from "../forgotten-password/forgotten-password/modal-email/modal-email-forgotten/modal-email-forgotten.component";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatSnackBarModule,
        MatInputModule,
        MatButtonModule,
        TranslateModule,
        RouterLink,
    ],

    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
    private _fb: FormBuilder = inject(FormBuilder);
    private _authService: LoginService = inject(LoginService);
    private _router: Router = inject(Router);
    private _alertService = inject(AlertService);
    private _route: ActivatedRoute = inject(ActivatedRoute);
    private _translate = inject(TranslateService);
    private _reconnectUserService = inject(ReconnectUserService);
    private  dialog = inject( MatDialog)

    loginForm = this._fb.group({
        username: ['', [Validators.required]],
        password: ['', [Validators.required]],
    });

    constructor() {
        this._route.queryParams.subscribe((params) => {
            const username = params['username'];
            if (username) {
                this.loginForm.patchValue({ username });
            }
        });
    }

    onLogin() {
        if (this.loginForm.valid) {
            const formData: LoginData = this.loginForm.value as LoginData;
            this._authService.login(formData).subscribe({
                next: (token) => {
                    const logged = this._translate.instant('Toasts.login-success');
                    this._alertService.openSnackBar(logged, SnackbarStatus.success);
                    this._reconnectUserService.getUserInfoAfterLogin();
                    setTimeout(() => this._router.navigate(['/home']), 1200);
                },
                error: (error) => {
                    console.error(error);
                    const logFailed = this._translate.instant('Toasts.login-fail');
                    this._alertService.openSnackBar(logFailed, SnackbarStatus.error);
                },
            });
        }
    }

  openForgotPasswordDialog() {
    const dialogRef = this.dialog.open(ModalForgottenPassword, {
      width: '400px' // Set your desired width here
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed. Result:', result);
    });
  }

}
