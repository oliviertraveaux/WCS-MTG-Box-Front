import {Component} from '@angular/core';
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
import {RegisterService} from "../../../shared/services/register.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {MatIconModule} from "@angular/material/icon";
import {Router} from "@angular/router";
import { map, Observable, of} from "rxjs";


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

  userNameFormGroup = this._formBuilder.group({
    userName: ['', {
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      asyncValidators: [this.checkUsernameAvailabilityValidator(this.registerService, this._snackBar)],
      updateOn: 'blur'
    }]
  });
  emailFormGroup = this._formBuilder.group({
    email: ['', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [this.checkEmailAvailabilityValidator(this.registerService, this._snackBar)],
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

  isLinear = false;

  hideConfirmPassword = true;
  isUsernameAvailable: boolean = true;
  emailIsAvailable: boolean = true;

  constructor(
    private _formBuilder: FormBuilder,
    private registerService: RegisterService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
  }


  onSubmit() {
    if (this.userNameFormGroup.valid && this.emailFormGroup.valid &&
      this.passwordFormGroup.valid && this.confirmPasswordFormGroup.valid &&
      this.postCodeFormGroup.valid && this.cityFormGroup.valid &&
      this.isUsernameAvailable && this.emailIsAvailable) {

      if (this.passwordFormGroup.value.password !== this.confirmPasswordFormGroup.value.confirmPassword) {
        this._snackBar.open("❌ Les mots de passe ne correspondent pas", 'Fermer', {duration: 3000});
        return;
      }
      this.performRegistration();
    }
  }


  performRegistration() {
    const formData = {
      username: this.userNameFormGroup.get('userName')?.value,
      email: this.emailFormGroup.get('email')?.value,
      password: this.passwordFormGroup.get('password')?.value,
      postCode: this.postCodeFormGroup.get('postCode')?.value,
      city: this.cityFormGroup.get('city')?.value
    };

    this.registerService.register(formData).subscribe({
      next: (response) => {
        this._snackBar.open('✅ Inscription réussie', 'Fermer', {duration: 3000});
        setTimeout(() => {
          this.router.navigate(['/login'], {queryParams: {username: formData.username}});
        }, 1200);
      },
      error: (error) => {
        console.error('Échec de l\'inscription', error);
        this._snackBar.open("⚠️ Erreur lors de l'inscription", 'Fermer', {duration: 3000});
      }
    });
  }


  // validators


  checkUsernameAvailabilityValidator(registerService: RegisterService, snackBar: MatSnackBar): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return registerService.checkAvailability(control.value, '').pipe(
        map(response => {
          if (!response.isAvailable) {
            snackBar.open("❌ Le nom d'utilisateur est déjà utilisé", 'Fermer', {duration: 3000});
            return { usernameUnavailable: true };
          }
          return null;
        }),
      );
    };
  }


  checkEmailAvailabilityValidator(registerService: RegisterService, snackBar: MatSnackBar): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return registerService.checkAvailability('', control.value).pipe(
        map(response => {
          if (!response.isAvailable) {
            snackBar.open("❌ L'adresse email est déjà utilisée", 'Fermer', {duration: 3000});
            return { emailUnavailable: true };
          }
          return null;
        }),
      );
    };
  }



}





