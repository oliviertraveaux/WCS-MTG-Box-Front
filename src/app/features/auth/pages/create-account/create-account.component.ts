import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule, ValidationErrors,
  Validators
} from '@angular/forms';
import {MatStepperModule} from "@angular/material/stepper";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RegisterService} from "../../shared/services/register.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {Router} from "@angular/router";
import {map, Observable, of} from "rxjs";
import {RegistrationFormData} from "../../models/auth.model";
import {SnackbarService, SnackbarStatus} from "@shared";


@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule, MatStepperModule, MatInputModule, MatSelectModule, MatButtonModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule, MatIconModule
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  private _snackbarService = inject(SnackbarService);
  private _formBuilder = inject(FormBuilder);
  private _registerService = inject(RegisterService);
  private _router = inject(Router);

  isLinear = false;
  isConfirmPasswordHidden = true;
  isUsernameAvailable: boolean = true;
  isEmailAvailable: boolean = true;

  userNameFormGroup = this._formBuilder.group({
    userName: ['', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      asyncValidators: [this.checkUsernameAvailabilityValidator(this._registerService, this._snackbarService)],
      updateOn: 'blur'
    }]
  });
  emailFormGroup = this._formBuilder.group({
    email: ['', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.checkEmailAvailabilityValidator(this._registerService, this._snackbarService)],
      updateOn: 'blur'
    }]
  });
  passwordFormGroup = this._formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  confirmPasswordFormGroup = this._formBuilder.group({
    confirmPassword: ['', Validators.required],
  });
  postCodeFormGroup = this._formBuilder.group({
    postCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
  });
  cityFormGroup = this._formBuilder.group({
    city: ['', Validators.required],
  });




  onSubmit() {
    if (this.userNameFormGroup.valid && this.emailFormGroup.valid &&
      this.passwordFormGroup.valid && this.confirmPasswordFormGroup.valid &&
      this.postCodeFormGroup.valid && this.cityFormGroup.valid &&
      this.isUsernameAvailable && this.isEmailAvailable) {

      if (this.passwordFormGroup.value.password !== this.confirmPasswordFormGroup.value.confirmPassword) {
        this._snackbarService.openSnackBar(" Les mots de passe ne correspondent pas", SnackbarStatus.error);
        return;
      }
      this.performRegistration();
    }
  }


  performRegistration() {
    const formData: RegistrationFormData = {
      username: this.userNameFormGroup.get('userName')?.value as string,
      email: this.emailFormGroup.get('email')?.value as string,
      password: this.passwordFormGroup.get('password')?.value as string,
      postCode: parseInt(this.postCodeFormGroup.get('postCode')?.value as string),
      city: this.cityFormGroup.get('city')?.value as string
    };

    this._registerService.register(formData).subscribe({
      next: (response) => {
        this._snackbarService.openSnackBar(' Inscription réussie', SnackbarStatus.success);
        setTimeout(() => {
          this._router.navigate(['/login'], {queryParams: {username: formData.username}});
        }, 1200);
      },
      error: () => {
        this._snackbarService.openSnackBar(" Erreur lors de l'inscription", SnackbarStatus.error);
      }
    });
  }


  // validators


  checkUsernameAvailabilityValidator(registerService: RegisterService, snackBar: SnackbarService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return registerService.checkAvailability(control.value, '').pipe(
        map(response => {
          if (!response.isAvailable) {
            this._snackbarService.openSnackBar(" Le nom d'utilisateur est déjà utilisé", SnackbarStatus.error);
            return {usernameUnavailable: true};
          }
          return null;
        }),
      );
    };
  }


  checkEmailAvailabilityValidator(registerService: RegisterService, snackBar: SnackbarService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return registerService.checkAvailability('', control.value).pipe(
        map(response => {
          if (!response.isAvailable) {
            this._snackbarService.openSnackBar(" L'adresse email est déjà utilisée", SnackbarStatus.error);
            return {emailUnavailable: true};
          }
          return null;
        }),
      );
    };
  }


}
