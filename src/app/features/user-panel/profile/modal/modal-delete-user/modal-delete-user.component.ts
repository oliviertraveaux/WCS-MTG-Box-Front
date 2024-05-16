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
  selector: 'modal-delete-user',
  templateUrl: 'modal-delete-user.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, ReactiveFormsModule, MatInputModule, TranslateModule, NgIf],
})
export class ModalDeleteUser implements OnInit  {
  private _fb = inject(FormBuilder);
  private _dialogRef = inject(MatDialogRef<ModalDeleteUser>);
  private _alertService = inject(AlertService);
  private _translate = inject(TranslateService);
  private _userInfoStatesService = inject(UserInfoStatesService);
  private _userInfosService = inject(UserInfosService);
  userId!: number;
  passwordForm: FormGroup;

  constructor() {
    this.passwordForm = this._fb.group({
      currentPassword: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this._userInfoStatesService.getUserInfo$().subscribe((userInfo: any) => {
       this.userId = userInfo.id;
    });
  }






  deleteUser() {
    if (this.passwordForm.valid) {
      const password = this.passwordForm.get('currentPassword')?.value;
      this._userInfosService.verifyPassword(this.userId, password).subscribe((isPasswordValid: boolean) => {
        if (isPasswordValid) {
          //pour delete USER
          this.showSuccessMessage();
        } else {
          this.wrongPassword();
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
