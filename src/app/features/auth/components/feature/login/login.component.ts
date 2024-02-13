import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from "../../../shared/services/auth.service";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatSnackBarModule, MatInputModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {


    this.route.queryParams.subscribe(params => {
      const username = params['username'];
      if (username) {
        this.loginForm.patchValue({ username });
      }
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value as { username: string; password: string };
      this.authService.login(credentials).subscribe({
        next: (token) => {
          this._snackBar.open('Connexion réussie. Bienvenue !', 'Fermer', { duration: 1000 });
          setTimeout(() => this.router.navigate(['/profil']), 1200);
        },
        error: (error) => {
          console.error(error);
          this._snackBar.open("Échec de la connexion. Veuillez réessayer.", "Fermer", { duration: 3000 });
        }
      });
    }
  }
}
