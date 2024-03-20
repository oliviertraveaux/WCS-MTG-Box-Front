import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CollectionDisplayPageComponent
} from "../../../collection/pages/collection-display-page/collection-display-page.component";

@Component({
    selector: 'app-profile-page',
    standalone: true,
  imports: [CommonModule, CollectionDisplayPageComponent],
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {}
