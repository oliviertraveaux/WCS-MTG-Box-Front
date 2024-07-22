import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { map, Observable, of } from 'rxjs';
import { CardSkeletonComponent } from '../../../../../../shared/collection/components/card-skelton/card-skeleton.component';
import { PaginationComponent } from '../../../../../../shared/collection/components/pagination/pagination.component';
import { GetRaritySymbolPipe } from '../../../../../../shared/collection/pipes/get-rarity-symbol.pipe';
import { getSearchResultTextPipe } from '../../../../../../shared/collection/pipes/get-search-result-text.pipe';
import { RequestStatus } from '../../../../../../shared/enums/request-status.enum';
import { ApiCard } from '../../../models/card-api.model';
import { CollectionAddCardResultsStatesService } from '../../../shared/services/collection-add-card/collection-add-card-search-results-states.service';
import { CollectionAddCardSearchResultComponent } from '../collection-add-card-search-result/collection-add-card-search-result.component';
import {TranslateModule} from "@ngx-translate/core";

@Component({
    selector: 'app-collection-add-card-search-results',
    standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    GetRaritySymbolPipe,
    MatIconModule,
    CollectionAddCardSearchResultComponent,
    getSearchResultTextPipe,
    CardSkeletonComponent,
    PaginationComponent,
    TranslateModule,
  ],
    templateUrl: './collection-add-card-search-results.component.html',
    styleUrls: ['./collection-add-card-search-results.components.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CollectionAddCardSearchResultsComponent implements OnInit {
    private _searchResultsStateService = inject(CollectionAddCardResultsStatesService);

    protected readonly RequestStatus = RequestStatus;
    readonly numberOfItemsInSelectList: number[] = Array.from(
        { length: 10 },
        (_, index) => index + 1
    );
    pageSize: number = 10;
    pageIndex: number = 0;
    cards$!: Observable<any>;
    displayedImageCards$: Observable<ApiCard[]> = of([]);
    status$: Observable<RequestStatus> = this._searchResultsStateService.getSearchRequestStatus$();

    ngOnInit(): void {
        this.cards$ = this._searchResultsStateService.getCards$();
        this.updateDisplayedCards();
    }

    displayImageHandlePage({ startIndex, endIndex }: { startIndex: number; endIndex: number }) {
        this.pageIndex = startIndex / endIndex;
        this.pageSize = endIndex - startIndex;

        this.displayedImageCards$ = this.cards$.pipe(
            map((cards) => {
                return cards.slice(startIndex, endIndex);
            })
        );
    }

    updateDisplayedCards() {
        this.displayedImageCards$ = this.cards$.pipe(
            map((cards) => {
                const startIndex = this.pageIndex * this.pageSize;
                const endIndex = startIndex + this.pageSize;
                return cards.slice(startIndex, endIndex);
            })
        );
    }
}
