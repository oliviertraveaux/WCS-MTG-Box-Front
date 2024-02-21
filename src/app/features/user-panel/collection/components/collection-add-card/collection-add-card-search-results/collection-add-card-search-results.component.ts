import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CardSkeletonComponent, GetRaritySymbolPipe, getSearchResultTextPipe } from '@shared';
import { Observable } from 'rxjs';
import { RequestStatus } from '../../../../../../shared/enums/request-status.enum';
import { CollectionAddCardResultsStatesService } from '../../../shared/services/collection-add-card-search-results-states.service';
import { CollectionAddCardSearchResultComponent } from '../collection-add-card-search-result/collection-add-card-search-result.component';

@Component({
    selector: 'app-collection-search-results',
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
    ],
    templateUrl: './collection-add-card-search-results.component.html',
    styleUrls: ['./collection-add-card-search-results.components.scss'],
})
export class CollectionAddCardSearchResultsComponent implements OnInit {
    private _searchResultsStateService = inject(CollectionAddCardResultsStatesService);
    protected readonly RequestStatus = RequestStatus;

    cards$!: Observable<any>;
    status$: Observable<RequestStatus> = this._searchResultsStateService.getSearchRequestStatus$();
    readonly numberOfItemsInSelectList: number[] = Array.from(
        { length: 10 },
        (_, index) => index + 1
    );

    ngOnInit(): void {
        this.cards$ = this._searchResultsStateService.getCards$();
    }
}
