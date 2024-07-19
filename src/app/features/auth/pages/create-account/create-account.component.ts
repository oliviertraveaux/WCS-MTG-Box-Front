import {CommonModule} from '@angular/common';
import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatStepperModule} from '@angular/material/stepper';
import {Router} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {Observable, map, of} from 'rxjs';
import {SnackbarStatus} from '../../../../shared/enums/snackbar-status.enum';
import {AlertService} from '../../../../shared/services/alert.service';
import {RegisterService} from '../../shared/services/register.service';
import {franceDepartments} from "../../shared/departments-utils";



@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule,
    MatStepperModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,

    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatIconModule,
    TranslateModule,
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateAccountComponent {
  private _alertService = inject(AlertService);
  private _formBuilder = inject(FormBuilder);
  private _registerService = inject(RegisterService);
  private _router = inject(Router);

  private _translate = inject(TranslateService);

  isLinear = false;
  isConfirmPasswordHidden = true;
isUsernameAvailable = true;
  isEmailAvailable = true;
  departments: any = franceDepartments;

  userNameFormGroup = this._formBuilder.group({
    userName: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
        asyncValidators: [
          this.checkUsernameAvailabilityValidator(
            this._registerService,
            this._alertService
          ),
        ],
        updateOn: 'blur',
      },
    ],
  });
  emailFormGroup = this._formBuilder.group({
    email: [
      '',
      {
        validators: [Validators.required, Validators.email],
        asyncValidators: [
          this.checkEmailAvailabilityValidator(this._registerService, this._alertService),
        ],
        updateOn: 'blur',
      },
    ],
  });
  passwordFormGroup = this._formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  confirmPasswordFormGroup = this._formBuilder.group({
    confirmPassword: ['', Validators.required],
  });
  departmentFormGroup = this._formBuilder.group({
    department: ['', [Validators.required]],
  });
  cityFormGroup = this._formBuilder.group({
    city: ['', Validators.required],
  });

  onSubmit() {
    if (
      this.userNameFormGroup.valid &&
      this.emailFormGroup.valid &&
      this.passwordFormGroup.valid &&
      this.confirmPasswordFormGroup.valid &&
      this.departmentFormGroup.valid &&
      this.cityFormGroup.valid &&
      this.isUsernameAvailable &&
      this.isEmailAvailable
    ) {
      if (
        this.passwordFormGroup.value.password !==
        this.confirmPasswordFormGroup.value.confirmPassword
      ) {
        const passwordMismatch = this._translate.instant('Toasts.passwords-match');
        this._alertService.openSnackBar(passwordMismatch, SnackbarStatus.error);

        return;
      }
      this.performRegistration();
    }
  }

  performRegistration() {
    const formData: { password: string; city: string; department: number; email: string; username: string } = {
      username: this.userNameFormGroup.get('userName')?.value as string,
      email: this.emailFormGroup.get('email')?.value as string,
      password: this.passwordFormGroup.get('password')?.value as string,
      department: parseInt(this.departmentFormGroup.get('department')?.value as string),
      city: this.cityFormGroup.get('city')?.value as string,
    };

    this._registerService.register(formData).subscribe({
      next: (response) => {
        const successRegistration = this._translate.instant('Toasts.register-sucess');
        this._alertService.openSnackBar(successRegistration, SnackbarStatus.success);

        setTimeout(() => {
          this._router.navigate(['/login'], {
            queryParams: {username: formData.username},
          });
        }, 1200);
      },
      error: () => {
        const errorRegistration = this._translate.instant('Toasts.register-fail');
        this._alertService.openSnackBar(errorRegistration, SnackbarStatus.error);
      },
    });
  }

  // validators

  checkUsernameAvailabilityValidator(
    registerService: RegisterService,
    snackBar: AlertService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return registerService.checkAvailability(control.value, '').pipe(
        map((response) => {
          if (!response.isAvailable) {
            const usernameNotAvailable = this._translate.instant(
              'Toasts.username-not-available'
            );
            this._alertService.openSnackBar(usernameNotAvailable, SnackbarStatus.error);

            return {usernameUnavailable: true};
          }
          return null;
        })
      );
    };
  }

  checkEmailAvailabilityValidator(
    registerService: RegisterService,
    snackBar: AlertService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return registerService.checkAvailability('', control.value).pipe(
        map((response) => {
          if (!response.isAvailable) {
            const emailUnavailable = this._translate.instant(
              'Toasts.email-not-available'
            );
            this._alertService.openSnackBar(emailUnavailable, SnackbarStatus.error);

            return {emailUnavailable: true};
          }
          return null;
        })
      );
    };
  }
}
