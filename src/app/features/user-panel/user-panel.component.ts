import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-user-panel',
    standalone: true,
    imports: [CommonModule, RouterOutlet],
    templateUrl: './user-panel.component.html',
    styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent {}
