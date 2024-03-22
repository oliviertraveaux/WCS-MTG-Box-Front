import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginData } from '../../models/auth.model';
import { LoginService } from '../../shared/services/login.service';

import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnackbarStatus } from '../../../../shared/enums/snackbar-status.enum';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { UserInfoStatesService } from '../../../../shared/user/services/user-info-states.service';
import { ReconnectUserService } from '../../shared/services/reconnect-user.service';

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
    ],

    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    private _fb: FormBuilder = inject(FormBuilder);
    private _authService: LoginService = inject(LoginService);
    private _router: Router = inject(Router);
    private _snackbarService = inject(SnackbarService);
    private _route: ActivatedRoute = inject(ActivatedRoute);
    private _translate = inject(TranslateService);
    private _reconnectUserService = inject(ReconnectUserService);

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
        console.log(inject(UserInfoStatesService).getUserInfo());
    }

    onLogin() {
        if (this.loginForm.valid) {
            const formData: LoginData = this.loginForm.value as LoginData;
            this._authService.login(formData).subscribe({
                next: (token) => {
                    const logged = this._translate.instant('Toasts.login-success');
                    this._snackbarService.openSnackBar(logged, SnackbarStatus.success);
                    this._reconnectUserService.getUserInfo();
                    setTimeout(() => this._router.navigate(['/user-panel/profile']), 1200);
                },
                error: (error) => {
                    console.error(error);
                    const logFailed = this._translate.instant('Toasts.login-fail');
                    this._snackbarService.openSnackBar(logFailed, SnackbarStatus.error);
                },
            });
        }
    }
}
