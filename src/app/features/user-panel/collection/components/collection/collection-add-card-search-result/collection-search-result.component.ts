import {CommonModule} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatOptionModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {UserCard} from '../../../../../../shared/collection/models/user-card.model';
import {GetRarityClassPipe} from '../../../../../../shared/collection/pipes/get-rarity-class.pipe';
import {GetRaritySymbolPipe} from '../../../../../../shared/collection/pipes/get-rarity-symbol.pipe';
import {GetApiCardImgPipe} from '../../../shared/pipes/get-api-card-img.pipe';
import {GetApiCardNamePipe} from '../../../shared/pipes/get-api-card-name.pipe';
import {CollectionAddCardSearchFormService} from '../../../shared/services/collection-add-card-search-form.service';
import {GetQualityClassPipe} from "../../../../../../shared/collection/pipes/get-quality-class.pipe";
import {MatIconModule} from "@angular/material/icon";
import {UserInfoStatesService} from "../../../../../../shared/user/services/user-info-states.service";
import {CollectionCardService} from "../../../shared/services/collection-card.service";
import {GetCardNamePipe} from "../../../shared/pipes/get-card-name.pipe";
import {GetCardImgPipe} from "../../../shared/pipes/get-card-img.pipe";
import {GetUserCardNamePipe} from "../../../shared/pipes/get-user-card-name.pipe";
import {GetUserCardImgPipe} from "../../../shared/pipes/get-user-card-img.pipe";


@Component({
  selector: 'app-collection-search-card-result',
  standalone: true,
  imports: [
    CommonModule,
    GetRaritySymbolPipe,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    GetRarityClassPipe,
    MatSnackBarModule,
    GetApiCardImgPipe,
    GetApiCardNamePipe,
    TranslateModule,
    GetQualityClassPipe,
    MatIconModule,
    GetCardNamePipe,
    GetCardImgPipe,
    GetUserCardNamePipe,
    GetUserCardImgPipe
  ],
  templateUrl: './collection-search-result.component.html',
})
export class CollectionSearchResultComponent {
  @ViewChild('selectValue') selectValue: any;
  @Input({required: true}) card!: UserCard;
  @Output() cardDeleted = new EventEmitter<number>();

  private _searchFormService = inject(CollectionAddCardSearchFormService);
  private _translate = inject(TranslateService);
  private _collectionCards = inject(CollectionCardService);
  private userInfos = inject(UserInfoStatesService);

  numberOfItems: number[] = Array.from({length: 10}, (_, index) => index + 1);
  selectedNumberOfItems: number = 0;
  language: string = this._searchFormService.languageControl.name;


  deleteCard(userCardId: number | undefined) {
    this._collectionCards.deleteCard(userCardId).subscribe(() => {
      this.cardDeleted.emit(userCardId);

      }
    )


  }

}
