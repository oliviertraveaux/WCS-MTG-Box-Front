import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {

  CollectionAddCardSearchFormComponent
} from "../../../collection/components/collection-add-card/collection-add-card-search-form/collection-add-card-search-form.component";
import {
  CollectionDisplayImageComponent
} from "../../../../../shared/collection/components/collection-display-image/collection-display-image.component";

@Component({
    selector: 'app-profile-page',
    standalone: true,
  imports: [CommonModule, CollectionDisplayImageComponent, CollectionAddCardSearchFormComponent],
    templateUrl: './profile-page.component.html',
    styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent {}
