import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-messages-pages',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './messages-page.component.html',
    styleUrls: ['./messages-page.component.scss'],
})
export class MessagesPageComponent {}
