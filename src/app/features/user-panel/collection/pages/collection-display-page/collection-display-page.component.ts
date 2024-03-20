import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserInfoStatesService} from "../../../../../shared/user/services/user-info-states.service";
import {CollectionAddCardSearchResultComponent} from "../../components/collection-add-card/collection-add-card-search-result/collection-add-card-search-result.component";
import { map, Observable, of, tap} from "rxjs";
import {CollectionSearchResultComponent} from "../../components/collection/collection-add-card-search-result/collection-search-result.component";
import {CollectionCardService} from "../../shared/services/collection-card.service";
import {MatPaginator, MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {SearchFormComponent} from "../../../../../shared/ui/search-form/search-form.component";
import {UserCard} from "../../../../../shared/collection/models/user-card.model";
import {
  CollectionAddCardSearchFormComponent
} from "../../components/collection-add-card/collection-add-card-search-form/collection-add-card-search-form.component";
import {
  CollectionDisplayListComponent
} from "../../../../../shared/collection/components/collection-display-list/collection-display-list.component";

@Component({
  selector: 'app-collection-display-page',
  standalone: true,
  imports: [CommonModule, CollectionAddCardSearchResultComponent, CollectionSearchResultComponent, MatPaginatorModule, SearchFormComponent, CollectionAddCardSearchFormComponent, CollectionDisplayListComponent],
  templateUrl: './collection-display-page.component.html',
  styleUrls: ['./collection-display-page.component.scss']
})
export class CollectionDisplayPageComponent implements OnInit{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private _userInfos = inject (UserInfoStatesService);
  private _collectionCards = inject(CollectionCardService);
  private _allCards$: Observable<any> = of([]);

  cards$: Observable<any> = of([]);
  totalLength = 0;
  pageSize = 10;



  ngOnInit(): void {
    const userId = this._userInfos.getUserInfo().id;
    this._allCards$ = this._collectionCards.getCollectionCards(userId);
    this.setPage(0, this.pageSize);
  }



  setPage(pageIndex: number, pageSize: number): void {
    this.cards$ = this._allCards$.pipe(
      tap(cards => this.totalLength = cards.length),
      map(cards => cards.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize))
    );
  }

  handlePageEvent(event: PageEvent): void {
    this.setPage(event.pageIndex, event.pageSize);

  }

  handleCardDeleted(deletedCardId: number) {
    this._allCards$ = this._allCards$.pipe(
      map((cards: UserCard[]) => cards.filter(card => card.userInfo.userCardId !== deletedCardId))
    );
    this.setPage(this.paginator.pageIndex, this.paginator.pageSize);
  }
}
