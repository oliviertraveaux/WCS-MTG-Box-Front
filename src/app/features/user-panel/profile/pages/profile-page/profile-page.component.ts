import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  CollectionDisplayPageComponent
} from "../../../collection/pages/collection-display-page/collection-display-page.component";
import {
  CollectionAddCardSearchFormComponent
} from "../../../collection/components/collection-add-card/collection-add-card-search-form/collection-add-card-search-form.component";

@Component({
    selector: 'app-profile-page',
    standalone: true,
  imports: [CommonModule, CollectionDisplayPageComponent, CollectionAddCardSearchFormComponent],
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {}
