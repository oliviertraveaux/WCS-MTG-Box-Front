import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-user-menu',
    standalone: true,
    imports: [CommonModule, MatIconModule, RouterLink, TranslateModule],
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent {
    showMenu: boolean = false;
    toggleNavbar() {
        this.showMenu = !this.showMenu;
    }
}
