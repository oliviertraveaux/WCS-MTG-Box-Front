import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserMenuComponent } from './ui/user-menu/user-menu.component';
import {BreadcrumbComponent} from "../../shared/ui/dynamic-links/breadcrumb/breadcrumb.component";

@Component({
    selector: 'app-user-panel',
    standalone: true,
  imports: [CommonModule, RouterOutlet, UserMenuComponent, BreadcrumbComponent],
    templateUrl: './user-panel.component.html',
    styleUrls: ['./user-panel.component.scss'],
})
export class UserPanelComponent {}
