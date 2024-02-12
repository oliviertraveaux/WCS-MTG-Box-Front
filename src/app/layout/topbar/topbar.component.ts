import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AuthService} from "../../features/auth/shared/auth.service";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  constructor(protected authService: AuthService) {
  }

  isLoggedIn(): boolean {
    // Utilisez le service AuthService pour vérifier si l'utilisateur est connecté
    return this.authService.isAuthenticated();
  }

  logout() {
    // Utilisez le service AuthService pour effectuer la déconnexion
    this.authService.logout();
  }

}
