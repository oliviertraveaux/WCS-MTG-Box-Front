import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LoginService } from '../../../../../auth/shared/services/login.service';

@Component({
    selector: 'app-profil-page',
    standalone: true,
    imports: [CommonModule, TranslateModule],
    templateUrl: './profil-page.component.html',
    styleUrls: ['./profil-page.component.scss'],
})
export class ProfilPageComponent {
    constructor(private authService: LoginService) {}

    logout() {
        this.authService.logout();
    }
}
