import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GetUserCardImgPipe} from "../../../shared/pipes/get-user-card-img.pipe";
import {GetUserCardNamePipe} from "../../../shared/pipes/get-user-card-name.pipe";
import {UserCard} from "../../../../../../shared/collection/models/user-card.model";
import {TranslateModule} from "@ngx-translate/core";
import {MatIconModule} from "@angular/material/icon";
import {GetQualityClassPipe} from "../../../../../../shared/collection/pipes/get-quality.pipe";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-collection-display-search-result',
  standalone: true,
  imports: [CommonModule, GetUserCardImgPipe, GetUserCardNamePipe, TranslateModule, MatIconModule, GetQualityClassPipe, MatButtonModule],
  templateUrl: './collection-display-search-result.component.html',
  styleUrls: ['./collection-display-search-result.component.scss']
})
export class CollectionDisplaySearchResultComponent {

  @Input({required: true}) card!: UserCard;
  @Output() cardDeleted = new EventEmitter<number>();


  deleteCard(userCardId: number | undefined) {
    this.cardDeleted.emit(userCardId);


  }

}
