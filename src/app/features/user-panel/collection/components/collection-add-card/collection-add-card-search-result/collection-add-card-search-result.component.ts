import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { UserCard } from '../../../../../../shared/collection/models/user-card.model';
import { GetRarityClassPipe } from '../../../../../../shared/collection/pipes/get-rarity-class.pipe';
import { GetRaritySymbolPipe } from '../../../../../../shared/collection/pipes/get-rarity-symbol.pipe';
import { SnackbarStatus } from '../../../../../../shared/enums/snackbar-status.enum';
import { AlertService } from '../../../../../../shared/services/alert.service';
import { SearchFormAddCardCollectionService } from '../../../../../../shared/services/search-form/search-form-add-card-collection.service';
import { ApiCard } from '../../../models/card-api.model';
import { GetApiCardImgPipe } from '../../../shared/pipes/get-api-card-img.pipe';
import { GetApiCardNamePipe } from '../../../shared/pipes/get-api-card-name.pipe';
import { CollectionAddCardBasketService } from '../../../shared/services/collection-add-card/collection-add-card-basket.service';
import { GetTruncateTextPipe } from '../../../../../../shared/collection/pipes/get-truncate-text.pipe';

@Component({
    selector: 'app-collection-add-card-search-card-result',
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
        GetTruncateTextPipe,
    ],
    templateUrl: './collection-add-card-search-result.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionAddCardSearchResultComponent {
    @ViewChild('selectValue') selectValue: any;
    @Input({ required: true }) card!: ApiCard;

    private _cardBasketService = inject(CollectionAddCardBasketService);
    private _alertService = inject(AlertService);
    private _searchFormService = inject(SearchFormAddCardCollectionService);
    private _translate = inject(TranslateService);

    numberOfItems: number[] = Array.from({ length: 10 }, (_, index) => index + 1);
    selectedNumberOfItems: number = 0;
    language: string = this._searchFormService.languageControl.name;

    addCardsToBasket(selectedValue: number) {
        if (selectedValue !== 0) {
            const cards: UserCard[] = [];
            for (let i = 0; i < selectedValue; i++) {
                const card: UserCard = this._cardBasketService.fromSearchResultToCardBasket(
                    this.card
                );
                cards.push(card);
            }
            this._cardBasketService.addCardsToCardBasket(cards);
            this.openSnackBarAddCard();
        }
    }

    openSnackBarAddCard() {
        this._alertService.openSnackBar(
            this.selectedNumberOfItems > 1
                ? this.selectedNumberOfItems +
                      this._translate.instant('Collection.addCard.toast.card-added-plural')
                : this._translate.instant('Collection.addCard.toast.card-added-singular'),
            SnackbarStatus.success
        );
    }
}
