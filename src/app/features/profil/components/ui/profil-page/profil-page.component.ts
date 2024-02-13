import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "../../../../auth/shared/services/auth.service";

@Component({
  selector: 'app-profil-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profil-page.component.html',
  styleUrls: ['./profil-page.component.scss']
})
export class ProfilPageComponent {

  constructor(private authService: AuthService) {
  }

logout() { this.authService.logout();}

}
