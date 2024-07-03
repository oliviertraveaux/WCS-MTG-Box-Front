import {CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterLink} from '@angular/router';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {LoginService} from '../../features/auth/shared/services/login.service';
import {UserInfoStatesService} from "../../shared/user/services/user-info-states.service";
import {MatMenuModule} from "@angular/material/menu";

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    TranslateModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    FormsModule,
    MatMenuModule,
  ],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent implements OnInit {

  private _userInfoStatesService = inject(UserInfoStatesService);
  private _authService = inject(LoginService);
  private _translate = inject(TranslateService);

  name!: string;
  selectedLanguage: string | null =
    localStorage.getItem('preferredLanguage') === 'en' ? 'en' : 'fr';
  languages = [
    localStorage.getItem('preferredLanguage') === 'en'
      ? {name: 'en', icon: '🇬🇧'}
      : {name: 'fr', icon: '🇫🇷'},
    localStorage.getItem('preferredLanguage') === 'en'
      ? {name: 'fr', icon: '🇫🇷'}
      : {name: 'en', icon: '🇬🇧'},
  ];

  ngOnInit(): void {
    this._userInfoStatesService.getUserInfo$().subscribe((userInfo: any) => {
      this.name = userInfo.username;
    });

  }

  isLoggedIn(): boolean {
    return this._authService.isAuthenticated();
  }

  logout() {
    this._authService.logout();
  }

  switchLanguage(language: string) {
    this._translate.use(language);
    localStorage.setItem('preferredLanguage', language);
  }
}
