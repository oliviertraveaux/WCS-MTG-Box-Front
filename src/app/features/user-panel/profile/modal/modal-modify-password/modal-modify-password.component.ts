import {Component, inject, OnInit} from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AlertService } from '../../../../../shared/services/alert.service';
import { SnackbarStatus } from '../../../../../shared/enums/snackbar-status.enum';
import {UserInfosService} from "../../shared/services/user-infos.service";
import {UserInfoStatesService} from "../../../../../shared/user/services/user-info-states.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'modal-modify-password',
  templateUrl: 'modal-modify-password.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, ReactiveFormsModule, MatInputModule, TranslateModule, NgIf],
})
export class ModalModifypassword implements OnInit  {
  private _fb = inject(FormBuilder);
  private _dialogRef = inject(MatDialogRef<ModalModifypassword>);
  private _alertService = inject(AlertService);
  private _translate = inject(TranslateService);
  private _userInfoStatesService = inject(UserInfoStatesService);
  private _userInfosService = inject(UserInfosService);
  userId!: number;
  passwordForm: FormGroup;

  constructor() {
    this.passwordForm = this._fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
    this._userInfoStatesService.getUserInfo$().subscribe((userInfo: any) => {
       this.userId = userInfo.id;
    });
  }


  passwordMatchValidator(form: FormGroup) {
    return form.controls['newPassword'].value === form.controls['confirmPassword'].value
      ? null : { 'mismatch': true };
  }

  changePassword() {
    if (this.passwordForm.valid) {
     this._userInfosService.verifyPassword(this.userId, this.passwordForm.value.currentPassword).subscribe({
        next: (isPasswordCorrect) => {
          if (isPasswordCorrect) {
            const updatedUserInfo = this.passwordForm.value;
            this._userInfosService.updatePassword(this.userId, updatedUserInfo.newPassword).subscribe({
              next: () => {
                this.showSuccessMessage();
              },
              error: (err) => {
                console.error('Error updating password:', err);
              }
            });
          } else {
            this.wrongPassword();
          }
        },
        error: (err) => {
          console.error('Error updating password:', err);
        }
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
    setTimeout(() =>  2000);
  }
}
