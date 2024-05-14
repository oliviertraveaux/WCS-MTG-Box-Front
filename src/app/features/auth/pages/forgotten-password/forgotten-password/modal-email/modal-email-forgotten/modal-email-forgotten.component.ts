import {Component, inject} from '@angular/core';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {LoginRepository} from "../../../../../shared/repositories/login.repository";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LoginService} from "../../../../../shared/services/login.service";
import {AlertService} from "../../../../../../../shared/services/alert.service";
import {ActivatedRoute} from "@angular/router";
import {SnackbarStatus} from "../../../../../../../shared/enums/snackbar-status.enum";


@Component({
  selector: 'modal-email-forgotten',
  templateUrl: 'modal-email-forgotten.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, ReactiveFormsModule, MatInputModule, TranslateModule],
})

export class ModalForgottenPassword {

  private _loginService = inject(LoginService);
  private _fb = inject(FormBuilder);
  private _dialogRef = inject(MatDialogRef<ModalForgottenPassword>);

  constructor(
  ) {
    this.emailForm = this._fb.group({
      emailForgotten: ['', [Validators.required, Validators.email]]
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
        }
      });

    }
  }

  private showSuccessMessage() {
    const successMessage = this._translate.instant('Toasts.confirm-mail-password');
    this._alertService.openSnackBar(successMessage, SnackbarStatus.success);
    setTimeout(() => this._dialogRef.close(), 2000);
  }



}



