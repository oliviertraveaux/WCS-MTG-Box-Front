import { CommonModule } from '@angular/common';
import { Component, inject, Input, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';
import {
    GetRarityClassPipe,
    GetRaritySymbolPipe,
    SnackbarService,
    SnackbarStatus,
    UserCard,
} from '@shared';
import { ApiCard } from '../../../models/card-api.model';
import { GetTranslatedCardImgPipe } from '../../../shared/pipes/get-translated-card-img-pipe';
import { GetTranslatedCardNamePipe } from '../../../shared/pipes/get-translated-card-name-pipe';
import { CollectionAddCardBasketService } from '../../../shared/services/collection-add-card-basket.service';
import { CollectionAddCardSearchFormService } from '../../../shared/services/collection-add-card-search-form.service';

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
        GetTranslatedCardImgPipe,
        GetTranslatedCardNamePipe,
        TranslateModule,
    ],
    templateUrl: './collection-add-card-search-result.component.html',
})
export class CollectionAddCardSearchResultComponent {
    @ViewChild('selectValue') selectValue: any;
    @Input({ required: true }) card!: ApiCard;

    private _cardBasketService = inject(CollectionAddCardBasketService);
    private _snackbarService = inject(SnackbarService);
    private _searchFormService = inject(CollectionAddCardSearchFormService);

    numberOfItems: number[] = Array.from({ length: 10 }, (_, index) => index + 1);
    selectedNumberOfItems: number = 0;
    language: string = this._searchFormService.languageControl.name;

    addCardsToBasket(selectedValue: number) {
        if (selectedValue !== 0) {
            const cards: UserCard[] = [];
            for (let i = 0; i < selectedValue; i++) {
                console.log('this.card', this.card);
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
        this._snackbarService.openSnackBar(
            this.selectedNumberOfItems > 1
                ? this.selectedNumberOfItems + ' cartes ajoutées à votre collection'
                : 'Carte ajoutée à votre collection',
            SnackbarStatus.success
        );
    }
}
