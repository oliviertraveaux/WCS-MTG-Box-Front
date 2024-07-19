import { NgIf } from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SnackbarStatus } from '../../../../../../../shared/enums/snackbar-status.enum';
import { AlertService } from '../../../../../../../shared/services/alert.service';
import { LoginService } from '../../../../../shared/services/login.service';

@Component({
    selector: 'modal-email-forgotten',
    templateUrl: 'modal-email-forgotten.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
export class ModalForgottenPassword {
    private _loginService = inject(LoginService);
    private _fb = inject(FormBuilder);
    private _dialogRef = inject(MatDialogRef<ModalForgottenPassword>);

    constructor() {
        this.emailForm = this._fb.group({
            emailForgotten: ['', [Validators.required, Validators.email]],
        });
    }
    private _alertService = inject(AlertService);
    private _route: ActivatedRoute = inject(ActivatedRoute);
    private _translate = inject(TranslateService);
    emailForm: FormGroup;
    message: string = '';

    requestReset() {
        if (this.emailForm.valid) {
            this._loginService.requestPasswordReset(this.emailForm.value.emailForgotten).subscribe({
                next: () => {
                    this.showSuccessMessage();
                },
                error: (err) => {
                    this.showSuccessMessage();
                },
            });
        }
    }

    private showSuccessMessage() {
        const successMessage = this._translate.instant('Toasts.confirm-mail-password');
        this._alertService.openSnackBar(successMessage, SnackbarStatus.success);
        setTimeout(() => this._dialogRef.close(), 2000);
    }
}
