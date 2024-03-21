import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CollectionAddCardSearchResultComponent
} from "../../../../features/user-panel/collection/components/collection-add-card/collection-add-card-search-result/collection-add-card-search-result.component";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {
  CollectionSearchResultComponent
} from "../../../../features/user-panel/collection/components/collection/collection-add-card-search-result/collection-search-result.component";
import {
  CollectionAddCardSearchFormComponent
} from "../../../../features/user-panel/collection/components/collection-add-card/collection-add-card-search-form/collection-add-card-search-form.component";
import {SearchFormComponent} from "../../../ui/search-form/search-form.component";
import {UserInfoStatesService} from "../../../user/services/user-info-states.service";
import {
  CollectionCardService
} from "../../../../features/user-panel/collection/shared/services/collection-card.service";
import {map, Observable, of, tap} from "rxjs";
import {UserCard} from "../../models/user-card.model";
import {CollectionDisplayListComponent} from "../collection-display-list/collection-display-list.component";


@Component({
  selector: 'app-collection-display-image',
  standalone: true,
  imports: [CommonModule, CollectionAddCardSearchResultComponent, CollectionSearchResultComponent, MatPaginatorModule, SearchFormComponent, CollectionAddCardSearchFormComponent, CollectionDisplayListComponent],
  templateUrl: './collection-display-image.component.html',
  styleUrls: ['./collection-display-image.component.scss']
})
export class CollectionDisplayImageComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private _userInfos = inject (UserInfoStatesService);
  private _collectionCards = inject(CollectionCardService);

  cards$: Observable<any> = of([]);
  totalLength = 0;
  pageSize = 10;



  ngOnInit(): void {
    const userId = this._userInfos.getUserInfo().id;
    this.cards$ = this._collectionCards.getCollectionCards(userId);
    this.setPage(0, this.pageSize);
  }





  setPage(pageIndex: number, pageSize: number): void {
    this.cards$ = this.cards$.pipe(
      tap(cards => this.totalLength = cards.length),
      map(cards => cards.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize))
    );
  }

  handlePageEvent(event: PageEvent): void {
    this.setPage(event.pageIndex, event.pageSize);

  }

  handleCardDeleted(deletedCardId: number) {
    this.cards$ = this.cards$.pipe(
      map((cards: UserCard[]) => cards.filter(card => card.userInfo.userCardId !== deletedCardId))
    );
    this.setPage(this.paginator.pageIndex, this.paginator.pageSize);
  }
}
