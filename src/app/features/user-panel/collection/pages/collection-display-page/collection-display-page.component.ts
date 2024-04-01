import {ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {map, Observable} from 'rxjs';
import { tap } from 'rxjs/operators';
import { CollectionDisplaySearchResultsService } from "../../shared/services/collection-display/collection-display-search-results.service";
import { CollectionDisplaySearchResultsStatesService } from "../../shared/services/collection-display/collection-display-search-results-states.service";
import {
  CollectionDisplaySearchFormComponent
} from "../../components/collection-display/collection-display-search-form/collection-display-search-form.component";
import {
  CollectionDisplayImageComponent
} from "../../../../../shared/collection/components/collection-display-image/collection-display-image.component";
import {
  CollectionDisplaySearchResultComponent
} from "../../components/collection-display/collection-display-search-result/collection-display-search-result.component";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {
  CollectionDisplayListComponent
} from "../../../../../shared/collection/components/collection-display-list/collection-display-list.component";
import {PaginationComponent} from "../../../../../shared/ui/pagination/pagination.component";

@Component({
  selector: 'app-collection-display-page',
  templateUrl: './collection-display-page.component.html',
  standalone: true,
  imports: [
    CollectionDisplaySearchFormComponent,
    CollectionDisplayImageComponent,
    CollectionDisplaySearchResultComponent,
    MatPaginatorModule,
    AsyncPipe,
    PaginationComponent,   CollectionDisplayListComponent,
    NgForOf,
    NgIf
  ],
  styleUrls: ['./collection-display-page.component.scss']
})
export class CollectionDisplayPageComponent implements OnInit {
  cards$: Observable<any[]>;
  displayedCards$: Observable<any[]>;
  switchDisplay = false;
  pageSize = 10;
  pageIndex = 0;

  private _searchResultsService = inject(CollectionDisplaySearchResultsService);
  private _statesService = inject(CollectionDisplaySearchResultsStatesService);

  constructor(private cdr: ChangeDetectorRef) {
    this.cards$ = this._statesService.getCards$();
    this.displayedCards$ = this.cards$;
  }

  ngOnInit() {
    this._searchResultsService.init();

  }

  handleCardDeleted(userCardId: number) {
    console.log('Card ID to delete', userCardId);
  }

  handlePageEvent(event: { startIndex: number; endIndex: number }) {
    this.displayedCards$ = this.cards$.pipe(
      map(cards => {
        console.log(`Affichage des cartes de ${event.startIndex} à ${event.endIndex} sur un total de ${cards.length} cartes.`);
        return cards.slice(event.startIndex, event.endIndex);
      })
    );
  }

  switchView() {
    this.switchDisplay = !this.switchDisplay;}




}
