import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {LoginService} from "../../features/auth/shared/services/login.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule, RouterLink,  TranslateModule],
  templateUrl: './topbar.component.html',
})
export class TopbarComponent {

  constructor(protected authService: LoginService, private translate : TranslateService) {
  }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  logout() {

    this.authService.logout();
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('preferredLanguage', language);
  }

}
