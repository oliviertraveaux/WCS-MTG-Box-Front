import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
    AbstractControl,
    AsyncValidatorFn,
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { isNil } from 'lodash-es';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SnackbarStatus } from '../../../../../shared/enums/snackbar-status.enum';
import { AlertService } from '../../../../../shared/services/alert.service';
import { UserInfoStatesService } from '../../../../../shared/user/services/user-info-states.service';
import { franceDepartments } from '../../../../auth/shared/departments-utils';
import { LoginService } from '../../../../auth/shared/services/login.service';
import { ReconnectUserService } from '../../../../auth/shared/services/reconnect-user.service';
import { RegisterService } from '../../../../auth/shared/services/register.service';
import { ModalDeleteUserComponent } from '../../modal/modal-delete-user/modal-delete-user.component';
import { ModalModifypasswordComponent } from '../../modal/modal-modify-password/modal-modify-password.component';
import { UserForm } from '../../shared/model/user-form-group.model';
import { UserInfosService } from '../../shared/services/user-infos.service';

@Component({
    selector: 'app-profile-page',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatSnackBarModule,
        MatOptionModule,
        MatSelectModule,
        TranslateModule,
        MatCardModule,
    ],
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
    private _fb = inject(FormBuilder);
    private _userInfoStatesService = inject(UserInfoStatesService);
    private _reconnectUserService = inject(ReconnectUserService);
    private _userInfosService = inject(UserInfosService);
    private _authService = inject(LoginService);
    private _snackBar = inject(MatSnackBar);
    private _alertService = inject(AlertService);
    private _dialog = inject(MatDialog);
    private _translate = inject(TranslateService);
    private _registerService = inject(RegisterService);
    private _router = inject(Router);

    userId!: number;
    departments: any = franceDepartments;
    initialEmail!: string;

    userNameForm = this._fb.group({
        username: [
            { value: '' },
            [Validators.required, Validators.minLength(3)],
            this.checkUsernameAvailabilityValidator(),
        ],
    });

    userForm: FormGroup<UserForm> = this._fb.group({
        email: [
            {
                value: '',
                disabled: false,
            },
            [Validators.required, Validators.email],
            [this.checkEmailAvailabilityValidator()],
        ],
        department: ['', Validators.required],
        city: ['', Validators.required],
        isActive: [false],
    });

    ngOnInit(): void {
        this._userInfoStatesService.getUserInfo$().subscribe((userInfo: any) => {
            if (userInfo) {
                const departmentCode = Number(userInfo.department);
                const userDepartment = this.departments.find(
                    (department: any) => Number(department.code) === departmentCode
                );

                this.userForm.patchValue({
                    email: userInfo.email,
                    department: userDepartment ? userDepartment.code : '',
                    city: userInfo.city,
                    isActive: userInfo.isActive,
                });
                this.userNameForm.patchValue({
                    username: userInfo.username,
                });

                this.userId = userInfo.id;
                this.initialEmail = userInfo.email;
            }
        });
    }

    openModifyPasswordDialog() {
        this._dialog.open(ModalModifypasswordComponent, {
            width: '600px',
        });
    }

    openDeleteUserDialog() {
        this._dialog.open(ModalDeleteUserComponent, {
            width: '600px',
        });
    }

    changeUsername() {
        if (this.userNameForm.valid) {
            const username: any = this.userNameForm.get('username')?.value;
            if (username) {
                const alertInfo = this._translate.instant('UpdateProfile.change-username-info', {
                    username,
                });
                const alertTitle = this._translate.instant('UpdateProfile.change-username-title');

                this._alertService.openConfirmDialog(alertTitle, alertInfo).subscribe((result) => {
                    if (result) {
                        const updatedUser = {
                            ...this._userInfoStatesService.getUserInfo(),
                            username,
                        };
                        this._userInfoStatesService.setUserInfo(updatedUser);

                        this._userInfosService.updateUsername(this.userId, username).subscribe({
                            next: () => {
                                const userUpdate = this._translate.instant(
                                    'UpdateProfile.toast.username'
                                );
                                this._alertService.openSnackBar(userUpdate, SnackbarStatus.success);
                            },
                            error: (err: any) => {
                                console.error('Error updating username:', err);
                                this._alertService.openSnackBar(
                                    'Failed to update username',
                                    SnackbarStatus.error
                                );
                            },
                        });
                    }
                });
            }
        }
    }

    deleteAccount() {
        const alertInfo = this._translate.instant('UpdateProfile.change-username-info');
        const alerTitle = this._translate.instant('UpdateProfile.change-username-title');
        this._alertService.openConfirmDialog(alerTitle, alertInfo);
    }

    onSubmit() {
        if (this.userForm.valid) {
            const updatedUserInfo = this.userForm.getRawValue();
            this._userInfosService.updateUser(this.userId, updatedUserInfo).subscribe({
                next: () => {
                    const userUpdate = this._translate.instant('UpdateProfile.toast.userInfos');

                    if (
                        updatedUserInfo.isActive !==
                            this._userInfoStatesService.getUserInfo().isActive &&
                        !isNil(updatedUserInfo.isActive)
                    ) {
                        this._reconnectUserService.getUserInfo().subscribe();
                    }
                    this._alertService.openSnackBar(userUpdate, SnackbarStatus.success);
                },
                error: (err) => {
                    const userUpdate = this._translate.instant('UpdateProfile.toast.update-fail');
                    this._alertService.openSnackBar(userUpdate, SnackbarStatus.error);
                },
            });
        }
    }

    checkEmailAvailabilityValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value || control.value === this.initialEmail || !control.dirty) {
                return of(null);
            }

            return this._registerService.checkAvailability('', control.value).pipe(
                map((response: any) => {
                    if (!response.isAvailable) {
                        const emailUnavailable = this._translate.instant(
                            'Toasts.email-not-available'
                        );
                        this._alertService.openSnackBar(emailUnavailable, SnackbarStatus.error);
                        return { emailUnavailable: true };
                    }
                    return null;
                })
            );
        };
    }

    checkUsernameAvailabilityValidator(): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors | null> => {
            if (!control.value || !control.dirty) {
                return of(null);
            }

            return this._registerService.checkAvailability(control.value, '').pipe(
                map((response: any) => {
                    if (!response.isAvailable) {
                        const usernameNotAvailable = this._translate.instant(
                            'Toasts.username-not-available'
                        );
                        this._alertService.openSnackBar(usernameNotAvailable, SnackbarStatus.error);
                        return { usernameUnavailable: true };
                    }
                    return null;
                })
            );
        };
    }

    isUsernameFormModified(): boolean {
        return this.userNameForm.dirty;
    }

    isFormModified(): boolean {
        return this.userForm.dirty;
    }
}
