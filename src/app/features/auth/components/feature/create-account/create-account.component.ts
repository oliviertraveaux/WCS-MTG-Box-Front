import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatStepperModule} from "@angular/material/stepper";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RegisterService} from "../../../shared/register.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";


@Component({
  selector: 'app-create-account',
  standalone: true,
  imports: [
    CommonModule, MatStepperModule, MatInputModule, MatSelectModule, MatButtonModule,
    FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSnackBarModule
  ],
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent {

  userNameFormGroup = this._formBuilder.group({
    userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  });
  emailFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  passwordFormGroup = this._formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
  });
  confirmPasswordFormGroup = this._formBuilder.group({
    confirmPassword: ['', Validators.required],
  });
  postCodeFormGroup = this._formBuilder.group({
    postCode: ['', Validators.required],
  });
  cityFormGroup = this._formBuilder.group({
    city: ['', Validators.required],
  });

  isLinear = false;

  constructor(
    private _formBuilder: FormBuilder,
    private registerService: RegisterService,
    private _snackBar: MatSnackBar
  ) {}

  passwordsMatch = true;

  onSubmit() {


    const formData = {

      username: this.userNameFormGroup.get('userName')?.value,
      email: this.emailFormGroup.get('email')?.value,
      password: this.passwordFormGroup.get('password')?.value,
      postCode: this.postCodeFormGroup.get('postCode')?.value,
      city: this.cityFormGroup.get('city')?.value
    };

    this.registerService.register(formData).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this._snackBar.open(' ✅  Inscription réussie', 'Fermer', {
          duration: 3000,
        });
      },
      error: (error) => {
        console.error('Registration failed ❌', error);
        this._snackBar.open(" ⚠️ Erreur lors de l'inscription ️", 'Fermer', {
          duration: 3000,
        });

      }
    });

    console.log(formData);
  }
}
