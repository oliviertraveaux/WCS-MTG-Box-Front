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
import {MatIconModule} from "@angular/material/icon";


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
    userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
  });
  emailFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
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
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private _formBuilder: FormBuilder,
    private registerService: RegisterService,
    private _snackBar: MatSnackBar
  ) {
  }


  onSubmit() {
    // First, check if all form groups are valid
    if (this.userNameFormGroup.valid &&
      this.emailFormGroup.valid &&
      this.passwordFormGroup.valid &&
      this.confirmPasswordFormGroup.valid &&
      this.postCodeFormGroup.valid &&
      this.cityFormGroup.valid) {

      // Check if the passwords match
      if (this.passwordFormGroup.value.password !== this.confirmPasswordFormGroup.value.confirmPassword) {
        this._snackBar.open("Les mots de passe ne correspondent pas", 'Fermer', {
          duration: 3000,
        });
        return;
      }

      // Extract username and email from the form groups
      const username = this.userNameFormGroup.get('userName')?.value ?? "";
      const email = this.emailFormGroup.get('email')?.value ?? '';

      // Check availability of username and email
      this.registerService.checkAvailability(username, email).subscribe({
        next: (response) => {

const responseFix = JSON.parse(response);
console.log("Response from server:", response);
            if (response === "Username already exists") {
              this._snackBar.open("Le nom d'utilisateur est déjà utilisé", 'Fermer', {duration: 3000});
            } else if (response === "Email already exists") {
              this._snackBar.open("L'adresse email est déjà utilisée", 'Fermer', {duration: 3000});


            }

          this.performRegistration();
        },
        error: (error) => {
          // Gérer l'erreur
          console.error('Error:', error);
        }
      });
    }}




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
            console.log('Registration successful', response);
            this._snackBar.open(' ✅  Inscription réussie', 'Fermer', { duration: 3000 });
          },
          error: (error) => {
            console.error('Registration failed ❌', error);
            this._snackBar.open(" ⚠️ Erreur lors de l'inscription", 'Fermer', { duration: 3000 });
          }
        });
      }
    }





