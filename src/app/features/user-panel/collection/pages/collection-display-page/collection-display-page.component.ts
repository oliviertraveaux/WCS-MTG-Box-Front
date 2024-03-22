import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { CollectionDisplayImageComponent } from '../../../../../shared/collection/components/collection-display-image/collection-display-image.component';
import { CollectionDisplayListComponent } from '../../../../../shared/collection/components/collection-display-list/collection-display-list.component';
import { CollectionCardsService } from '../../../../../shared/collection/services/collection-cards.service';
import { CollectionAddCardSearchFormComponent } from '../../components/collection-add-card/collection-add-card-search-form/collection-add-card-search-form.component';
import { CollectionDisplaySearchFormComponent } from '../../components/collection-display/collection-display-search-form/collection-display-search-form.component';
import { CollectionDisplaySearchResultComponent } from '../../components/collection-display/collection-display-search-result/collection-display-search-result.component';
import { CollectionDisplaySearchResultsStatesService } from '../../shared/services/collection-display/collection-display-search-results-states.service';
import { CollectionDisplaySearchResultsService } from '../../shared/services/collection-display/collection-display-search-results.service';

@Component({
    selector: 'app-collection-display-page',
    standalone: true,
    imports: [
        CommonModule,
        CollectionDisplayImageComponent,
        CollectionDisplaySearchResultComponent,
        CollectionDisplayListComponent,
        CollectionAddCardSearchFormComponent,
        CollectionDisplaySearchFormComponent,
        MatButtonModule,
        TranslateModule,
    ],
    templateUrl: './collection-display-page.component.html',
    styleUrls: ['./collection-display-page.component.scss'],
})
export class CollectionDisplayPageComponent implements OnInit {
    private _searchResultsService = inject(CollectionDisplaySearchResultsService);
    private _collectionCardsService = inject(CollectionCardsService);
    cards$ = inject(CollectionDisplaySearchResultsStatesService).getCards$();
    switchDisplay = false;

    ngOnInit() {
        this._searchResultsService.init();
    }

    handleCardDeleted(userCardId: number) {
        this._searchResultsService.deleteCard(userCardId as number).subscribe();
        console.log('cardId to delete', userCardId);
    }

    switchView() {
        this.switchDisplay = !this.switchDisplay;
    }
}
