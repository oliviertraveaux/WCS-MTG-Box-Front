import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  CollectionDisplayImageComponent
} from "../../../../../shared/collection/components/collection-display-image/collection-display-image.component";
import {
  CollectionDisplaySearchResultComponent
} from "../../components/collection-display/collection-display-search-result/collection-display-search-result.component";
import {
  CollectionDisplaySearchResultsService
} from "../../shared/services/collection-display/collection-display-search-results.service";
import {
  CollectionDisplaySearchResultsStatesService
} from "../../shared/services/collection-display/collection-display-search-results-states.service";
import {
  CollectionDisplayListComponent
} from "../../../../../shared/collection/components/collection-display-list/collection-display-list.component";
import {
  CollectionAddCardSearchFormComponent
} from "../../components/collection-add-card/collection-add-card-search-form/collection-add-card-search-form.component";
import {
  CollectionDisplaySearchFormComponent
} from "../../components/collection-display/collection-display-search-form/collection-display-search-form.component";
import {CollectionCardsStateService} from "../../../../../shared/collection/services/collection-cards-state.service";

@Component({
  selector: 'app-collection-display-page',
  standalone: true,
  imports: [CommonModule, CollectionDisplayImageComponent, CollectionDisplaySearchResultComponent, CollectionDisplayListComponent, CollectionAddCardSearchFormComponent, CollectionDisplaySearchFormComponent],
  templateUrl: './collection-display-page.component.html',
  styleUrls: ['./collection-display-page.component.scss']
})
export class CollectionDisplayPageComponent implements OnInit{

  private _searchResultsService = inject(CollectionDisplaySearchResultsService);
  cards$ = inject(CollectionDisplaySearchResultsStatesService).getCards$();
  switchDisplay = false;

  ngOnInit() {
    this._searchResultsService.init();
  }

  handleCardDeleted(userCardId: number) {
   console.log('cardId to delete',userCardId);

  }

  switchView() {
    this.switchDisplay = !this.switchDisplay;
    console.log( 'collection state', inject(CollectionCardsStateService).getCardsValue());

  }
}
