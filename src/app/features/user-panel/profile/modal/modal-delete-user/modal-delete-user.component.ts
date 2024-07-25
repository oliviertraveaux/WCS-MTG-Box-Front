import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { AlertService } from '../../../../../shared/services/alert.service';
import { SnackbarStatus } from '../../../../../shared/enums/snackbar-status.enum';
import { UserInfosService } from "../../shared/services/user-infos.service";
import { UserInfoStatesService } from "../../../../../shared/user/services/user-info-states.service";
import { NgIf } from "@angular/common";
import {Subscription, take} from 'rxjs';
import {LoginService} from "../../../../auth/shared/services/login.service";


@Component({
  selector: 'modal-delete-user',
  templateUrl: 'modal-delete-user.html',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, ReactiveFormsModule, MatInputModule, TranslateModule, NgIf],
})
export class ModalDeleteUser implements OnInit {

  private readonly _fb = inject(FormBuilder);
  private readonly _dialogRef = inject(MatDialogRef);
  private readonly _alertService = inject(AlertService);
  private readonly _translate = inject(TranslateService);
  private readonly _authService = inject(LoginService);
  private readonly _userInfoStatesService = inject(UserInfoStatesService);
  private readonly _userInfosService = inject(UserInfosService);

  userId!: number;
  passwordForm!: FormGroup;

  ngOnInit() {
    this.passwordForm = this._fb.group({
      currentPassword: ['', [Validators.required]],
    });

    this._userInfoStatesService.getUserInfo$()
        .pipe(take(1))
        .subscribe((userInfo: any) => {
          this.userId = userInfo.id;
        });
  }

  deleteUser() {
    if (this.passwordForm.valid) {
      const password = this.passwordForm.get('currentPassword')?.value;

      this._userInfosService.verifyPassword(this.userId, password)
          .pipe(take(1))
          .subscribe((isPasswordValid: boolean) => {
            if (isPasswordValid) {
              this._userInfosService.deleteUser(this.userId)
                  .pipe(take(1))
                  .subscribe(() => {
                    this.showSuccessMessage();
                    this._authService.logout();
                  });
            } else {
              this.wrongPassword();
            }
          });
    }
  }

  private showSuccessMessage() {
    const successMessage = this._translate.instant('UpdateProfile.deleted-account');
    this._alertService.openSnackBar(successMessage, SnackbarStatus.success);
    setTimeout(() => this._dialogRef.close(), 1000);
  }

  private wrongPassword() {
    const errorMessage = this._translate.instant('UpdateProfile.password-invalid');
    this._alertService.openSnackBar(errorMessage, SnackbarStatus.error);
    setTimeout(() => {}, 2000);
  }
}
