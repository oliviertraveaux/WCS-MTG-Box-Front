import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { NgIf } from '@angular/common';
import { SnackbarStatus } from '../../../../../shared/enums/snackbar-status.enum';
import { AlertService } from '../../../../../shared/services/alert.service';
import { UserInfo } from '../../../../../shared/user/models/user-info.interface';
import { UserInfoStatesService } from '../../../../../shared/user/services/user-info-states.service';
import { UserInfosService } from '../../shared/services/user-infos.service';

@Component({
    selector: 'modal-modify-password',
    templateUrl: 'modal-modify-password.component.html',
    standalone: true,
    imports: [
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        TranslateModule,
        NgIf,
    ],
})
export class ModalModifypasswordComponent implements OnInit {
    private readonly _fb = inject(FormBuilder);
    private readonly _dialogRef = inject(MatDialogRef<ModalModifypasswordComponent>);
    private readonly _alertService = inject(AlertService);
    private readonly _translate = inject(TranslateService);
    private readonly _userInfoStatesService = inject(UserInfoStatesService);
    private readonly _userInfosService = inject(UserInfosService);
    userId!: number;
    passwordForm: FormGroup;

    constructor() {
        this.passwordForm = this._fb.group(
            {
                currentPassword: ['', [Validators.required]],
                newPassword: ['', [Validators.required, Validators.minLength(6)]],
                confirmPassword: ['', [Validators.required]],
            },
            { validator: this.passwordMatchValidator }
        );
    }

    ngOnInit() {
        this._userInfoStatesService.getUserInfo$().subscribe((userInfo: UserInfo) => {
            this.userId = userInfo.id;
        });
    }

    passwordMatchValidator(form: FormGroup) {
        return form.controls['newPassword'].value === form.controls['confirmPassword'].value
            ? null
            : { mismatch: true };
    }

    changePassword() {
        if (this.passwordForm.valid) {
            this._userInfosService
                .verifyPassword(this.userId, this.passwordForm.value.currentPassword)
                .subscribe({
                    next: (isPasswordCorrect) => {
                        if (isPasswordCorrect) {
                            const updatedUserInfo = this.passwordForm.value;
                            this._userInfosService
                                .updatePassword(this.userId, updatedUserInfo.newPassword)
                                .subscribe({
                                    next: () => {
                                        this.showSuccessMessage();
                                    },
                                    error: (err) => {
                                        console.error('Error updating password:', err);
                                    },
                                });
                        } else {
                            this.wrongPassword();
                        }
                    },
                    error: (err) => {
                        console.error('Error updating password:', err);
                    },
                });
        }
    }

    private showSuccessMessage() {
        const successMessage = this._translate.instant('UpdateProfile.password-modified');
        this._alertService.openSnackBar(successMessage, SnackbarStatus.success);
        setTimeout(() => this._dialogRef.close(), 2000);
    }

    private wrongPassword() {
        const successMessage = this._translate.instant('UpdateProfile.password-invalid');
        this._alertService.openSnackBar(successMessage, SnackbarStatus.error);
        setTimeout(() => 2000);
    }
}
